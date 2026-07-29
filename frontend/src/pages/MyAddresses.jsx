import { useEffect, useState } from "react";
import api from "../services/api";

const MyAddresses = () => {

    const [addresses, setAddresses] = useState([]);

    const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home"
});

const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState(null);

<button
    className="btn btn-success"
    onClick={() => setShowModal(true)}
>
    + Add Address
</button>

    const loadAddresses = async () => {

        try {

            const response = await api.get("/address");
            setAddresses(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this address?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/address/${id}`);

        loadAddresses();

    } catch (error) {
        console.log(error);
    }

};


const handleEdit = (address) => {

    setEditingId(address.id);

    setFormData({
        fullName: address.full_name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        addressType: address.address_type
    });

    setShowModal(true);

};
const handleSaveAddress = async () => {

    try {

        if (editingId) {

    await api.put(`/address/${editingId}`, formData);

} else {

    await api.post("/address", formData);

}

        setShowModal(false);
        setEditingId(null);

        setFormData({
            fullName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressType: "Home"
        });

        loadAddresses();

    } catch (error) {
        console.log(error);
    }

};

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>My Addresses</h2>

                <button
                    className="btn btn-success"
                >
                    + Add Address
                </button>

            </div>

            {
                addresses.length === 0 ? (

                    <div className="alert alert-warning">
                        No address found.
                    </div>

                ) : (

                    addresses.map((item) => (

                        <div
                            key={item.id}
                            className="card mb-3 shadow-sm"
                        >

                            <div className="card-body">

                                <h5>
                                    {item.address_type}
                                </h5>

                                <p className="mb-1">
                                    <strong>{item.full_name}</strong>
                                </p>

                                <p className="mb-1">
                                    {item.phone}
                                </p>

                                <p className="mb-1">
                                    {item.address}
                                </p>

                                <p>
                                    {item.city},
                                    {" "}
                                    {item.state}
                                    {" - "}
                                    {item.pincode}
                                </p>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )
            }
            {
showModal && (

<div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,.5)" }}
>

<div className="modal-dialog">

<div className="modal-content">

<div className="modal-header">

<h5>
    {editingId ? "Edit Address" : "Add Address"}
</h5>

<button
className="btn-close"
onClick={() => setShowModal(false)}
></button>

</div>

<div className="modal-body">

<div className="mb-3">
    <label>Full Name</label>
    <input
        type="text"
        className="form-control"
        value={formData.fullName}
        onChange={(e) =>
            setFormData({
                ...formData,
                fullName: e.target.value
            })
        }
    />
</div>

<div className="mb-3">
    <label>Phone</label>
    <input
        type="text"
        className="form-control"
        value={formData.phone}
        onChange={(e) =>
            setFormData({
                ...formData,
                phone: e.target.value
            })
        }
    />
</div>

<div className="mb-3">
    <label>Address</label>
    <textarea
        className="form-control"
        rows="3"
        value={formData.address}
        onChange={(e) =>
            setFormData({
                ...formData,
                address: e.target.value
            })
        }
    ></textarea>
</div>

<div className="row">

    <div className="col-md-6 mb-3">
        <label>City</label>
        <input
            type="text"
            className="form-control"
            value={formData.city}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    city: e.target.value
                })
            }
        />
    </div>

    <div className="col-md-6 mb-3">
        <label>State</label>
        <input
            type="text"
            className="form-control"
            value={formData.state}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    state: e.target.value
                })
            }
        />
    </div>

</div>

<div className="row">

    <div className="col-md-6 mb-3">
        <label>Pincode</label>
        <input
            type="text"
            className="form-control"
            value={formData.pincode}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    pincode: e.target.value
                })
            }
        />
    </div>

    <div className="col-md-6 mb-3">
        <label>Address Type</label>

        <select
            className="form-select"
            value={formData.addressType}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    addressType: e.target.value
                })
            }
        >
            <option>Home</option>
            <option>Office</option>
            <option>Other</option>
        </select>

    </div>

</div>

<button
    className="btn btn-success w-100"
    onClick={handleSaveAddress}
>
    Save Address
</button>

</div>

</div>

</div>

</div>

)
}
        </div>
    );

};

export default MyAddresses;