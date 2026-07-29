function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #111827, #1e293b)",
      }}
    >
      <div className="container py-5">

        <div className="row gy-4">

          {/* Logo */}

          <div className="col-lg-4">

            <h2 className="fw-bold text-warning">
              🍔 QuickBite
            </h2>

            <p className="text-light mt-3">
              Taste the best food from your favourite restaurants.
              Fast delivery, fresh ingredients and amazing offers every day.
            </p>

            <button className="btn btn-warning rounded-pill mt-2">
              🍕 Order Now
            </button>

          </div>

          {/* Navigation */}

          <div className="col-lg-2">

            <h5 className="mb-3">Explore</h5>

            <ul className="list-unstyled footer-links">
              <li>🏠 Home</li>
              <li>🍔 Menu</li>
              <li>🛒 Cart</li>
              <li>📦 Orders</li>
            </ul>

          </div>

          {/* Categories */}

          <div className="col-lg-3">

            <h5 className="mb-3">Categories</h5>

            <ul className="list-unstyled footer-links">
              <li>🍕 Pizza</li>
              <li>🍔 Burger</li>
              <li>🍗 Biryani</li>
              <li>🥤 Drinks</li>
              <li>🍰 Dessert</li>
            </ul>

          </div>

          {/* Contact */}

          <div className="col-lg-3">

            <h5 className="mb-3">Contact</h5>

            <p>📧 support@quickbite.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Coimbatore, Tamil Nadu</p>

            <div className="mt-3">

              <span className="badge bg-warning text-dark me-2">
                Fast Delivery
              </span>

              <span className="badge bg-success">
                24/7 Support
              </span>

            </div>

          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex justify-content-between flex-wrap">

          <p className="mb-0">
            © 2026 QuickBite. All Rights Reserved.
          </p>

          <p className="mb-0">
            ❤️ Made in India
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;