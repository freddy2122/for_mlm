// Provider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_PATH } from './vars';
import { getAuthToken } from './auth-provider';
import axios from 'axios';
const CartContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export function Provider({ children }) {
  const storedProducts = JSON.parse(localStorage.getItem('LingxForMLM'));
  const userDataForMLM = JSON.parse(localStorage.getItem('userDataForMLM'));

  const [cartItems, setCartItems] = useState([]);
  const [features, setFeatures] = useState(storedProducts ? storedProducts : []);
  const [categoriesData, setCategoriesData] = useState([]);
  const [userData, setUserData] = useState(userDataForMLM ? userDataForMLM : []);


  useEffect(() => {
    const fetchUserProfile = async () => {

      const authToken = getAuthToken();

      if (!authToken) {
        return;
      }

      try {
        const response = await axios.get(`${API_PATH}/user`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.data;
          // console.log(data)
          setUserData(data.user);
          localStorage.setItem('userDataForMLM', JSON.stringify(data.user));
        } else {
          console.error('Failed to fetch user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);




  useEffect(() => {
    async function fetchData() {
      try {
        const featuresResponse = await fetch(`${API_PATH}/products`);
        const features = await featuresResponse.json();
        setFeatures(features.products);
        localStorage.setItem('LingxForMLM', JSON.stringify(features.products));

        const categoriesResponse = await fetch(`${API_PATH}/category`);
        const categoriesData = await categoriesResponse.json();

        setCategoriesData(categoriesData.category);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('ForMLMCartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: product.quantity }];
      setCartItems(updatedCartItems);
      localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
    }
  };


  const addToCartSingle = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
    }
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCartItems);
    localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (product) => {
    const updatedCartItems = cartItems.map(
      item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (product) => {
    const updatedCartItems = cartItems.map(
      item => item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('ForMLMCartItems', JSON.stringify(updatedCartItems));
  };

  const calculateProductTotal = (product) => {
    return product.price * product.quantity;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + calculateProductTotal(item), 0);
  };

  const contextValue = {
    userData,
    cartItems,
    addToCart,
    addToCartSingle,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateProductTotal,
    calculateTotalPrice,
    features,
    categoriesData,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
