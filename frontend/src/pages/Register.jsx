import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <form onSubmit={handleSubmit}>

                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                />

                <button className="btn btn-primary w-100">
                  Register
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;