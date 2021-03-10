const DefaultState = {
    currentPage: 1,
    countriesPerPage: 8
};

const CountriesPaginationReducer = (state = DefaultState, action) => {
    switch(action.type) {
        case "SET_PAGE":
            return {
                ...state,
                currentPage: action.page
            };
        
        default:
            return state
    }
};

export default CountriesPaginationReducer;
