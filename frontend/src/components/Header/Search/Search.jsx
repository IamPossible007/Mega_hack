import React, { useState ,useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
    // let jk;
    const [jk,setjk] = useState('')
    useEffect(() => {
      const storedJWT = localStorage.getItem('user');
      if (user) {
          const jwtToken = JSON.parse(storedJWT)?.token;
          console.log(jwtToken);
  
  
               axios.get(`http://192.168.188.224:4002/api/owner/${jwtToken}`).then((response) => {
                     setjk(response)
                      console.log('Owner:', jk); // Log the owner data
                  })
      }
      if (!storedJWT) {
          window.location.href = '/login';
      }
  }, [user]);
  
        useEffect(() => {
          const loggedInUser = localStorage.getItem('user');
          if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
          }
        }, []);

  const fetchData = (value) => {
    fetch(`http://192.168.188.224:4002/book-details`)
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter((item) => {
          return (
            value && item.name.toLowerCase().startsWith(value.toLowerCase())
          );
        });
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    fetchData(value);
    setInput(value);
  };

  const navigate = useNavigate();

  // Function to handle adding items to cart
  const handleAddToCart = async (productId) => {
    try {
      console.log(jk.data);
      console.log(productId)
      // Make a POST request to add the item to the cart
      const response = await axios.post(
        "http://192.168.188.224:4002/cart/add",
        {
          userId: jk.data,
          productId: productId,
  
        }
      );
      console.log("Item added to cart:", response.data);
      // Optionally, you can show a success message or update the cart state
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for Books"
          value={input}
          onChange={handleSearch}
        />
        <MdClose className="close-btn" onClick={() => setSearchModal(false)} />
      </div>
      <div className="search-result-content">
        {!results.length && (
          <div className="start-msg">
            Start typing to see books you are looking for.
          </div>
        )}
        <div className="search-results">
          {results.map((item) => (
            <div className="search-result-item" key={item._id}>
              <div
                className="prod-details"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  setSearchModal(false);
                }}
              >
                <span className="name">{item.name}</span>
                <span className="desc">{item.description}</span>
                <span className="category">Category: {item.category}</span><br/>
                <span className="price">Price: ${item.price}</span><br />
                <span className="stock">Stock: {item.stock}</span>
              </div>
              {/* Add button to add item to cart */}
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
