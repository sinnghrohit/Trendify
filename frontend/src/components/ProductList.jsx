import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Products</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
            <img src={product.image} alt={product.name} style={{ width: "200px", height: "auto" }} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
