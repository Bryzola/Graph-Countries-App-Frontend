import axios from 'axios';
import _ from "lodash";

export const GetCountriesList = () => async dispatch => {
    try {
        dispatch({
            type: "COUNTRY_LIST_LOADING"
        });
        
        var res = null;
        
        const axiosRequestBackend = {
            method: 'GET',
            url: `http://localhost:5000/api/country-data`
        }

        const axiosRequest = {
            method: 'POST',
            url: 'https://countries-274616.ew.r.appspot.com',
            headers: { 'Content-Type': 'application/json' },
            data: {
                query: `query {
                            Country {
                                numericCode
                                name
                                capital
                                subregion {
                                name
                                }
                                officialLanguages {
                                name
                                }
                                flag {
                                svgFile
                                }
                            }
                        }`
            }
        }

        await axios(axiosRequest).then(response => {
            res = response.data.data.Country;
        });

        await axios(axiosRequestBackend).then(backendResponse => {
            if(!_.isEmpty(backendResponse.data)) {
                backendResponse.data.forEach(backendData => {
                    res.forEach(apiData => {
                        if(apiData.numericCode === backendData.countryCode) {
                            apiData.capital = backendData.capital;
                            apiData.subregion.name = backendData.region;
                            apiData.customData = true;
                        }
                    });
                });
            }
        }).catch(err => {
            alert("No connection to the backend!");
            console.log("Backend API error: " + err);
        });;

        dispatch({
            type: "COUNTRY_LIST_SUCCESS",
            payload: res
        });
    } catch (e) {
        dispatch({
            type: "COUNTRY_LIST_FAIL",
            payload: e
        });
    }
};

export const GetCountry = (countryCode) => async dispatch => {
    try {
        dispatch({
            type: "COUNTRY_DETAILS_LOADING"
        });

        var res = null;

        const axiosRequestBackend = {
            method: 'GET',
            url: `http://localhost:5000/api/country-data/${countryCode}`,
            headers: { 'Content-Type': 'application/json' }
        }

        await axios(axiosRequestBackend).then(response => {
            if(response.status !== 204) {
                res = { 
                    numericCode: response.data.countryCode,
                    name: response.data.name,
                    area: response.data.area,
                    population: response.data.population,
                    capital: response.data.capital,
                    subregion: { 
                        name: response.data.region
                    },
                    currencies: [ 
                        {
                            name: response.data.currency
                        }
                    ],
                    flag: { 
                        svgFile: response.data.flag
                    },
                    topLevelDomains: [
                        {
                            name: response.data.topLevelDomain
                        }
                    ]
                };
            }
        }).catch(err => {
            alert("No connection to the backend!");
            console.log("Backend API error: " + err);
        });

        if(_.isEmpty(res)) {
            const axiosRequest = {
                method: 'POST',
                url: 'https://countries-274616.ew.r.appspot.com',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    query: `query {
                                Country(numericCode: "${countryCode}") {
                                    numericCode
                                    name
                                    area
                                    population
                                    capital
                                    subregion {
                                    name
                                    }
                                    currencies {
                                    name
                                    }
                                    flag {
                                    svgFile
                                    }
                                    topLevelDomains {
                                    name
                                    }
                                }
                            }`
                }
            }

            await axios(axiosRequest).then(response => {
                res = response.data.data.Country[0];
            }).catch(err => {
                console.log("Graph Countries API error: " + err);
            });;
        }

        dispatch({
            type: "COUNTRY_DETAILS_SUCCESS",
            payload: res,
            countryCode: countryCode
        });
    } catch (e) {
        dispatch({
            type: "COUNTRY_ACTION_FAIL",
            payload: e
        });
    }
};

export const UpdateCountry = (countryData) => async dispatch => {
    try {
        dispatch({
            type: "COUNTRY_DETAILS_LOADING"
        });

        const axiosRequestBackend = {
            method: 'POST',
            url: `http://localhost:5000/api/country-data`,
            headers: { 'Content-Type': 'application/json' },
            data: countryData
        }

        var res = await axios(axiosRequestBackend);

        dispatch({
            type: "COUNTRY_UPDATE_SUCCESS",
            payload: res
        });
    } catch (e) {
        dispatch({
            type: "COUNTRY_ACTION_FAIL",
            payload: e
        });
    }
};

export const ResetCountry = (countryCode) => async dispatch => {
    try {
        dispatch({
            type: "COUNTRY_DETAILS_LOADING"
        });

        const axiosRequestBackend = {
            method: 'DELETE',
            url: `http://localhost:5000/api/country-data/${countryCode}`
        }

        var res = await axios(axiosRequestBackend);

        dispatch({
            type: "COUNTRY_RESET_SUCCESS",
            payload: res.status
        });
    } catch (e) {
        dispatch({
            type: "COUNTRY_ACTION_FAIL",
            payload: e
        });
    }
};

export const SearchCountries = (searchValue) => dispatch => {
    try {
        dispatch({
            type: "COUNTRY_LIST_LOADING"
        });
        
        dispatch({
            type: "COUNTRY_SEARCH",
            searchValue: searchValue
        });

    } catch (e) {
        dispatch({
            type: "COUNTRY_LIST_FAIL",
            payload: e
        });
    }
};

export const SetPage = (page) => dispatch => {
    try {
        dispatch({
            type: "SET_PAGE",
            page: page
        });

    } catch (e) {
        dispatch({
            type: "COUNTRY_LIST_FAIL",
            payload: e
        });
    }
};
