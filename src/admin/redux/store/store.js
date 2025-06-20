import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/FullFormCreate/formSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import placesReducer from "../features/places/placesSlice";
import enterprisesReducer from "../features/enterprise/enterpriseSlice";
import packagesReducer from "../features/packages/packagesSlice";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/users/UsersSlice.js";
import includesReducer from "../features/packageIncludes/packageIncludesSlice.js"

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
  },
});
