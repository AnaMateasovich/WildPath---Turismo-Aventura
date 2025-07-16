import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/FullFormCreate/formSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import placesReducer from "../features/places/placesSlice";
import enterprisesReducer from "../features/enterprise/enterpriseSlice";
import packagesReducer from "../features/packages/packagesSlice";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/users/UsersSlice.js";
import includesReducer from "../features/packageIncludes/packageIncludesSlice.js"
import favoritesReducer from "../features/favorites/favoritesSlice.js"
import reviewsReducer from "../features/review/reviewSlice.js"
import bookingsReducer from "../features/booking/bookingSlice.js"

export default configureStore({
  reducer: {
    fullForm: formReducer,
    categories: categoriesReducer,
    places: placesReducer,
    enterprises: enterprisesReducer,
    packages: packagesReducer,
    auth: authReducer,
    users: userReducer,
    includes: includesReducer,
    favorites: favoritesReducer,
    reviews: reviewsReducer,
    bookings: bookingsReducer
  },
});
