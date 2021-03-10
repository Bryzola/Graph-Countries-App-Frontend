import { combineReducers } from "redux";
import CountriesListReducer from "./CountriesListReducer";
import CountriesPaginationReducer from "./CountriesPaginationReducer";
import CountryDetailsReducer from "./CountryDetailsReducer";

const RootReducer = combineReducers({
    CountriesList: CountriesListReducer,
    CountryDetails: CountryDetailsReducer,
    CountriesPagination: CountriesPaginationReducer
});

export default RootReducer;