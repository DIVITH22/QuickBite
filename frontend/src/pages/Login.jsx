import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";
import loginImage from "../assets/Login.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div className="login-overlay">

        <div className="container-fluid">

          <div className="row min-vh-100 align-items-center">

            {/* LEFT SIDE */}

            <div className="col-lg-6 d-none d-lg-flex hero-section">

              <div className="hero-content">

                <span className="hero-badge">
                  🍔 #1 Food Delivery Platform
                </span>

                <h1>
                  Delicious Food
                  <br />
                  Delivered
                  <span> Fast.</span>
                </h1>

                <p>
                  Order from your favourite restaurants and enjoy fresh,
                  delicious meals delivered right to your doorstep in minutes.
                </p>

                <div className="hero-features">

                  <div>
                    🚀 Fast Delivery
                  </div>

                  <div>
                    🍕 1000+ Restaurants
                  </div>

                  <div>
                    ⭐ Trusted by Thousands
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-6 d-flex justify-content-center">

              <div className="login-card">

                <div className="text-center mb-4">

                  <h1 className="brand-title">
                    🍔 QuickBite
                  </h1>

                  <h3>
                    Welcome Back 👋
                  </h3>

                  <p>
                    Login to continue your food journey.
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

  <label className="form-label">
    Email Address
  </label>

  <input
    type="email"
    name="email"
    className="form-control premium-input"
    placeholder="Enter your email"
    value={formData.email}
    onChange={handleChange}
    required
  />

</div>

<div className="mb-3">

  <label className="form-label">
    Password
  </label>

  <div className="input-group">

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      className="form-control premium-input"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <button
      type="button"
      className="btn password-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🙈" : "👁"}
    </button>

  </div>

</div>

<div className="d-flex justify-content-between align-items-center mb-4">

  <label className="remember-me">

    <input
      type="checkbox"
      className="me-2"
    />

    Remember Me

  </label>

  <a href="#" className="forgot-link">

    Forgot Password ?

  </a>

</div>

<button
  type="submit"
  className="btn login-btn w-100"
>

  Login

</button>

<div className="divider">

  <span>OR</span>

</div>

<button
  type="button"
  className="btn google-btn w-100"
>

  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    width="22"
    className="me-2"
  />

  Continue with Google

</button>

<div className="text-center mt-4">

  <p>

    Don't have an account?

    <Link
      to="/register"
      className="register-link ms-2"
    >

      Register

    </Link>

  </p>

</div>

</form>

</div>

</div>

</div>

</div>

</div>

</div>

);
}

export default Login;