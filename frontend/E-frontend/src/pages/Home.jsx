import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Display only the first 4 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
      <div className="home-container">
        <div className="hero-banner">
        <h1>Welcome to OnlineBazaar</h1>
        <p>
          Your one-stop shop for all your needs! Explore our wide range of
          products and find exactly what you're looking for.
        </p>
        </div>
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {/* <Link to="/shop" className="btn">
          Start Shopping
        </Link> */}
      </div>
    </>
  );
};

export default Home;
