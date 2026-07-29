import { useEffect, useState } from "react";
import api from "../services/api";
import FoodCard from "../components/FoodCard";
import banner from "../assets/banner.jpg";
import "../styles/Home.css";
import { useLocation } from "react-router-dom";

function Home() {

  const [foods, setFoods]= useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
  if (location.hash === "#menu") {
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }
}, [location]);

  const loadFoods = async () => {

    try {

      const response = await api.get("/food/all");

      setFoods(response.data.foods);

    } catch (error) {

      console.log(error);

    }

  };

return (
<>
{/* ================= HERO SECTION ================= */}

<section
className="hero-section"
style={{
backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url(${banner})`
}}
>

<div className="hero-overlay"></div>

<div className="container h-100">

<div className="row align-items-center h-100">

{/* LEFT CONTENT */}

<div className="col-lg-6 hero-left">

<span className="hero-tag">
NEW FOOD EXPERIENCE
</span>

<h1 className="hero-title">

Premium
<br />

Food Delivery

</h1>

<p className="hero-description">

Enjoy restaurant-quality meals delivered to your doorstep.
Fresh ingredients, premium taste, lightning-fast delivery,
and exclusive offers every day.

</p>

<div className="hero-buttons">

    <button
    className="btn hero-btn-primary"
    onClick={() => {
        document.getElementById("menu")?.scrollIntoView({
            behavior: "smooth"
        });
    }}
>
    Order Now
</button>

    <button
    className="btn hero-btn-secondary"
    onClick={() => {
        document.getElementById("menu")?.scrollIntoView({
            behavior: "smooth"
        });
    }}
>
    Explore Menu
</button>

</div>

<div className="hero-stats">

<div>

<h3>5000+</h3>

<p>Orders</p>

</div>

<div>

<h3>120+</h3>

<p>Restaurants</p>

</div>

<div>

<h3>4.9★</h3>

<p>Ratings</p>

</div>

</div>

</div>

{/* RIGHT CONTENT */}

<div className="col-lg-6 text-center position-relative">

<div className="food-circle">

<img

src={banner}

alt="Food"

className="hero-food-image"

/>

</div>

</div>

</div>

</div>

<h1 className="background-text">

QUICKBITE

</h1>

</section>

{/* ================= SEARCH ================= */}

<div className="container">

<div className="search-card shadow-lg">

<div className="row g-3">

<div className="col-lg-8">

<input

type="text"

className="form-control search-input"

placeholder="Search burgers, pizza, biryani..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="col-lg-4">

<select

className="form-select search-input"

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option value="">All Categories</option>

<option value="Burger">Burger</option>

<option value="Pizza">Pizza</option>

<option value="Biryani">Biryani</option>

<option value="Chinese">Chinese</option>

<option value="Rice">Rice</option>

<option value="Dessert">Dessert</option>

<option value="Drinks">Drinks</option>

</select>

</div>

</div>

</div>

</div>

{/* ================= POPULAR FOOD ================= */}

<section id="menu" className="popular-food">

<div className="container">

<div className="text-center mb-5">

<h5 className="section-small">

POPULAR MENU

</h5>

<h2 className="section-title">

Choose Your Favourite Food

</h2>

<p>

Freshly prepared meals from top restaurants.

</p>

</div>

<div className="row g-4">

{foods

.filter(food=>food.name.toLowerCase().includes(search.toLowerCase()))

.filter(food=>category==="" || food.category===category)

.map(food=>(

<FoodCard

key={food.id}

food={food}

/>

))}

</div>

</div>

</section>

</>
);

}

export default Home;