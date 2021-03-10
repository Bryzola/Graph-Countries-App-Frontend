const DefaultState = {
    loading: false,
    data: [],
    filteredData: [],
    errMessage: ""
};

const CountriesListReducer = (state = DefaultState, action) => {
    switch(action.type) {
        case "COUNTRY_LIST_LOADING":
            return {
                ...state,
                loading: true
            };
        
        case "COUNTRY_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                errMessage: "",
                data: action.payload,
                filteredData: action.payload
            };

        case "COUNTRY_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errMessage: "An error has occurred! - " + action.payload,
                data: []
            };

        case "COUNTRY_SEARCH":
            return {
                ...state,
                loading: false,
                errMessage: "",
                filteredData: state.data.filter(country => {
                    if(action.searchValue !== "") {
                        let languagesList = [];

                        if(country.officialLanguages !== null) {
                            languagesList = country.officialLanguages.map(language => {
                                return language.name.toString().toUpperCase().includes(action.searchValue.toUpperCase())
                            });
                        }

                        return (
                            country.name.toUpperCase().includes(action.searchValue.toUpperCase()) ||
                            country.capital.toUpperCase().includes(action.searchValue.toUpperCase()) ||
                            country.subregion?.name.toUpperCase().includes(action.searchValue.toUpperCase()) ||
                            languagesList.indexOf(true) > -1
                        );
                    } else {
                        return country;
                    }
                })
            }
        
        default:
            return state
    }
};

export default CountriesListReducer;
