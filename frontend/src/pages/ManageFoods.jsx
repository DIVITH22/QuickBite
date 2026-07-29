import { useEffect, useState } from "react";
import api from "../services/api";

function ManageFoods() {

    const [foods, setFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {
        try {
            const response = await api.get("/food/all");
            setFoods(response.data.foods);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFood = async (id) => {

        if (!window.confirm("Delete this food item?")) return;

        try {

            await api.delete(`/food/delete/${id}`);

            alert("Food Deleted Successfully");

            loadFoods();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const editFood = (food) => {
    setEditingFood({ ...food });
};

const updateFood = async () => {

    try {

        await api.put(`/food/update/${editingFood.id}`, editingFood);

        alert("Food Updated Successfully");

        setEditingFood(null);

        loadFoods();

    } catch (error) {

        alert(error.response?.data?.message || "Update Failed");

    }

};

const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imagePath = "/" + file.name;

    setEditingFood({
        ...editingFood,
        image: imagePath
    });

    setImagePreview(URL.createObjectURL(file));

};

    return (
         <div className="page-content">
        <div className="container mt-4">

            <h2>🍔 Manage Foods</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {foods.map(food => (

                        <tr key={food.id}>

                            <td>{food.id}</td>
                            <td>{food.name}</td>
                            <td>{food.category}</td>
                            <td>₹ {food.price}</td>

                            <td>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => editFood(food)}
    >
        Edit
    </button>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteFood(food.id)}
    >
        Delete
    </button>

</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {editingFood && (

    <div className="card mt-4">

        <div className="card-header">
            <h4>Edit Food</h4>
        </div>

        <div className="card-body">

            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={editingFood.name}
                    onChange={(e) =>
                        setEditingFood({
                            ...editingFood,
                            name: e.target.value
                        })
                    }
                />
            </div>

            <div className="mb-3">
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={editingFood.description}
                    onChange={(e) =>
                        setEditingFood({
                            ...editingFood,
                            description: e.target.value
                        })
                    }
                />
            </div>

            <div className="mb-3">
    <label>Category</label>

    <select
        className="form-select"
        value={editingFood.category}
        onChange={(e) =>
            setEditingFood({
                ...editingFood,
                category: e.target.value
            })
        }
    >
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
                    value={editingFood.price}
                    onChange={(e) =>
                        setEditingFood({
                            ...editingFood,
                            price: e.target.value
                        })
                    }
                />
            </div>

            <div className="mb-3">

            <label>Image URL</label>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="/burger.jpg or https://example.com/image.jpg"
                value={editingFood.image}
                onChange={(e) => {
                    setEditingFood({
                        ...editingFood,
                        image: e.target.value
                    });

                    setImagePreview(e.target.value);
                }}
            />

            <label>OR Upload Image</label>

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {(imagePreview || editingFood.image) && (

                <div className="mt-3">

                    <img
                        src={imagePreview || editingFood.image}
                        alt="Preview"
                        width="150"
                        className="rounded shadow"
                    />

                </div>

            )}

        </div>

            <div className="mb-3">
                <label>Available</label>

                <select
                    className="form-select"
                    value={editingFood.available}
                    onChange={(e) =>
                        setEditingFood({
                            ...editingFood,
                            available: e.target.value
                        })
                    }
                >
                    <option value="1">Available</option>
                    <option value="0">Not Available</option>
                </select>

            </div>

            <button
                className="btn btn-success me-2"
                onClick={updateFood}
            >
                Update
            </button>

            <button
                className="btn btn-secondary"
                onClick={() => setEditingFood(null)}
            >
                Cancel
            </button>

        </div>

    </div>

)}

        </div>
        </div>
    );
}

export default ManageFoods;