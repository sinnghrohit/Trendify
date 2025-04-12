import React from "react";
import "../index.css";

const LoginPage = () => {
  return (
    <div className="container">
      <h2>Login to Trendify</h2>
      <a href="http://localhost:5000/api/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
};

export default LoginPage;
