import { useState } from "react";
import api from "../services/api";

function AddFood() {

const [food, setFood] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    available: 1,
    image: ""
});

const [imageType, setImageType] = useState("url");

    const handleChange = (e) => {
        setFood({
            ...food,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (
        !food.name ||
        !food.description ||
        !food.category ||
        !food.price
    ) {
        alert("Please fill all required fields.");
        return;
    }

    try {

        await api.post("/food/add", food);

        alert("✅ Food Added Successfully");

        setFood({
            name: "",
            description: "",
            category: "",
            price: "",
            available: 1,
            image: ""
        });

    } catch (error) {

        alert(error.response?.data?.message || "Failed to Add Food");

    }

};

    return (
        <div className="page-content">
        <div className="container mt-4">

            <h2>➕ Add Food</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={food.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Category</label>

                    <select
                        className="form-select"
                        name="category"
                        value={food.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Biryani">Biryani</option>
                        <option value="Rice">Rice</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select>

                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={food.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
    <label className="form-label">Image Source</label>

    <select
        className="form-select mb-3"
        value={imageType}
        onChange={(e) => setImageType(e.target.value)}
    >
        <option value="url">Image URL</option>
        <option value="upload">Upload Image</option>
    </select>

    {imageType === "url" ? (
        <input
            type="text"
            className="form-control"
            name="image"
            value={food.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
        />
    ) : (
        <input
            type="file"
            className="form-control"
            accept="image/*"
        />
    )}
</div>

                <div className="mb-3">
                    <label>Available</label>

                    <select
                        className="form-select"
                        name="available"
                        value={food.available}
                        onChange={handleChange}
                    >
                        <option value="1">Available</option>
                        <option value="0">Not Available</option>
                    </select>

                </div>

                <button className="btn btn-success">
                    Add Food
                </button>

            </form>

        </div>
        </div>

    );

}

export default AddFood;