import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {handleError, handleSuccess} from '../util'
import {ToastContainer} from 'react-toastify'


function Home() {
  const[loggedInUser,setLoggedInUser]=useState('');
  const[products,setProducts]=useState([]);
  const navigate=useNavigate();
  useEffect(() => {
  setLoggedInUser(localStorage.getItem('loggedInUser'));
  fetchProducts();
  }, []);
  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  const fetchProducts = async () => {
  try {
    console.log("Fetching products...");
    const url = "http://localhost:8080/products";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    });
    const result = await response.json();
    console.log(result);
    setProducts(result);
  } catch (err) {
    handleError(err);
  }
};

  return (
    <div>
      <h1>Welcome! {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products.map((item,index)=>(
            <ul key={index}>
              <span>{item.name}:{item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
