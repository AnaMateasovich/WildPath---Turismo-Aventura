import { configureStore } from "@reduxjs/toolkit";
import  formReducer  from "../features/FullFormCreate/formSlice";
import  categoriesReducer  from "../features/categories/categoriesSlice";
import  placesReducer  from "../features/places/placesSlice";
import enterprisesReducer from "../features/enterprise/enterpriseSlice"
import packagesReducer from "../features/packages/packagesSlice"

export default configureStore({
    reducer: {
        fullForm: formReducer,
        categories: categoriesReducer,
        places: placesReducer,
        enterprises: enterprisesReducer,
        packages: packagesReducer,
    },
    
})