
import React, { useState ,useEffect} from "react";
import axios from 'axios'
import { MdClose } from "react-icons/md";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    var bookData;
    

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
       
    
          axios.get(`http://192.168.188.224:4002/book-details`)
            .then((response) => {
              // Handle successful response
    
             bookData = JSON.stringify(response.data);
             console.log(bookData) // Assuming the server responds with JSON data
            })
            .catch((error) => {
              // Handle error
              console.error('Error:', error);
            });
    
      }, []);

    // if (!query.length) {
    //     data = null;
    // }

    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for Book's"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            {/* <div className="search-result-content">
                {!data?.data?.length && (
                    <div className="start-msg">
                        Start typing to see book's you are looking for.
                    </div>
                )}
                <div className="search-results">
                    {data?.data?.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate("/product/" + item.id);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                                <img
                                    src={
                                        process.env
                                            .REACT_APP_STRIPE_APP_DEV_URL +
                                        item.attributes.image.data[0].attributes
                                            .url
                                    }
                                />
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.attributes.title}
                                </span>
                                <span className="desc">
                                    {item.attributes.description}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div> */}
        </div>
    );
};

export default Search;
