import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import ManageFoods from "./pages/ManageFoods";
import ManageOrders from "./pages/ManageOrders";
import AddFood from "./pages/AddFood";
import Checkout from "./pages/Checkout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Wishlist from "./pages/Wishlist";
import MyAddresses from "./pages/MyAddresses";

function AppContent() {

  const location = useLocation();

  // Hide Navbar on Login & Register
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // Show Footer only on Home page
  const showFooter = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/foods" element={<ManageFoods />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/add-food" element={<AddFood />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
            path="/addresses"
            element={<MyAddresses />}
        />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;