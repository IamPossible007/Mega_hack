import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import './addBook.css'; // Corrected import

function Addbook() {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [user, setUser] = useState(null);
    const [rating,setRating] = useState('')
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

    const handleSubmit = async (e) => {
      console.log("this is",jk.data)
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('name', name);
            formData.append('price', parseFloat(price)); // Parse price as float
            formData.append('stock', parseInt(stock)); // Parse stock as integer
            formData.append('category', category);
            formData.append('rating', rating);
            formData.append('owner',jk.data)
            formData.append('productImage', e.target.productImage.files[0]); // Get the file from the input

            const response = await axios.post('http://192.168.188.224:4002/upload-book', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Product Added")
            console.log('Product created:', response.data);
            // Optionally, you can redirect the user or display a success message
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'description':
                setDescription(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'stock':
                setStock(value);
                break;
            case 'category':
                setCategory(value);
                break;
                case 'rating':
                  setRating(value);
                  break;
            default:
                break;
        }
    };

    return (
        <div>
            <form className='shopform' onSubmit={handleSubmit}>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" type="text" placeholder='Description' name="description" value={description} onChange={handleChange} required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" placeholder='Name' type="text" name="name" value={name} onChange={handleChange} required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" type="file" name="productImage" required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" placeholder="Price"type="number" name="price" value={price} onChange={handleChange} required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" placeholder="Stock"type="number" name="stock" value={stock} onChange={handleChange} required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" placeholder="Category"type="text" name="category" value={category} onChange={handleChange} required />
                </div>
                <div className='textfield'>
                    <label className="labelfield"></label>
                    <input className="inputfield" placeholder="Book-Score"type="text" name="rating" value={rating} onChange={handleChange} required />
                </div>
                <button className="button2" type="submit">Submit</button> {/* Changed classname to className */}
            </form>
        </div>
    );
}

export default Addbook;
