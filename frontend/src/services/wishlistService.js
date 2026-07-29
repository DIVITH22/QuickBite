import api from "./api";

export const getWishlist = () => api.get("/wishlist");

export const addToWishlist = (foodId) =>
    api.post("/wishlist", { foodId });

export const removeFromWishlist = (foodId) =>
    api.delete(`/wishlist/${foodId}`);