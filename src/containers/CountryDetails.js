import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Error from '@material-ui/icons/Error';

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { GetCountry, ResetCountry, UpdateCountry } from "../actions/countryActions";
import CountryPage from '../components/CountryPage';

const CountryDetails = (props) => {
    const countryCode = props.match.params.countryCode;
    const dispatch = useDispatch();
    const countryDetails = useSelector(state => state.CountryDetails);

    React.useEffect(() => {
        dispatch(GetCountry(countryCode));
    }, [dispatch, countryCode]);

    const ShowData = () => {
        if(!_.isEmpty(countryDetails.data)) {
            return (
                <CountryPage 
                country={countryDetails.data} 
                submitCountryData={updateCountryData}
                resetCountryData={eraseCountryData} />
            )
        }

        if(countryDetails.loading) {
            return <CircularProgress />
        }

        if(countryDetails.errMessage !== "") {
            return <Chip 
            icon={<Error />}
            label={countryDetails.errMessage}
            color="secondary" />
        }

        return <Chip 
        icon={<Error />}
        label="Unable to fetch data!"
        color="secondary" />
    }

    const updateCountryData = (event) => {
        event.preventDefault();
        var JSONData = {};
 
        const form = event.target;
        const formData = new FormData(form);

        formData.forEach((value, key) => JSONData[key] = value);

        JSONData.Area = Number(JSONData.Area);
        JSONData.Population = Number(JSONData.Population);

        dispatch(UpdateCountry(JSONData));
      }

    const eraseCountryData = () => {
        dispatch(ResetCountry(countryCode));
    }

    return(
        <div>
            {ShowData()}
        </div>
    )
};

export default CountryDetails;