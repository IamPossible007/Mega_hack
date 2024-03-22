import React, { useState } from 'react';
import axios from 'axios';
import './addBook.css';

function Addbook(){
    
    const [formData, setFormData] = useState({
        
        description: '',
        name: '',
        productImage: '',
        price: '',
        stock: '',
        category: '',
        owner: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                // Assuming you have an endpoint to handle form submission
                const response = await axios.post('/api/products', formData);
                console.log('Product created:', response.data);
                // Optionally, you can redirect the user or display a success message
            } catch (error) {
                console.error('Error creating product:', error);
                // Handle error, e.g., display an error message to the user
            }
        };
        
        
        return (
          <div>
            <form className='shopform' onSubmit={handleSubmit}>
              <div className='textfield'>
                <label classname="labelfield">Description:</label>
                <input classname="inputfield" type="text" name="description" value={formData.description} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Name:</label>
                <input classname="inputfield" type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Product Image:</label>
                <input classname="inputfield" type="text" name="productImage" value={formData.productImage} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Price:</label>
                <input classname="inputfield" type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Stock:</label>
                <input classname="inputfield" type="number" name="stock" value={formData.stock} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Category:</label>
                <input classname="inputfield" type="text" name="category" value={formData.category} onChange={handleChange} required />
              </div>
             <div className='textfield'>
                <label classname="labelfield">Owner:</label>
                <input classname="inputfield" type="text" name="owner" value={formData.owner} onChange={handleChange} required />
              </div>
              {/* <button classname="button2" type="submit">Submit</button> */}
            </form>
            </div>
          );

     
        
    
}

export default Addbook;