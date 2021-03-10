const DefaultState = {
    loading: false,
    data: {},
    errMessage: ""
};

const CountryDetailsReducer = (state = DefaultState, action) => {
    switch(action.type) {
        case "COUNTRY_DETAILS_LOADING":
            return {
                ...state,
                loading: true
            };
        
        case "COUNTRY_DETAILS_SUCCESS":
            return {
                ...state,
                loading: false,
                errMessage: "",
                data: action.payload
            };

        case "COUNTRY_UPDATE_SUCCESS":
            alert("Details successfully updated!");
            return {
                ...state,
                loading: false,
                errMessage: ""
            };

        case "COUNTRY_RESET_SUCCESS":
            alert("Details successfully reset!");
            window.location.reload();
            return {
                ...state,
                loading: false,
                errMessage: ""
            };

        case "COUNTRY_ACTION_FAIL":
            var failMessage = "An error has occurred: " + action.payload
            alert(failMessage);
            return {
                ...state,
                loading: false,
                errMessage: failMessage
            };
        
        default:
            return state
    }
};

export default CountryDetailsReducer;
