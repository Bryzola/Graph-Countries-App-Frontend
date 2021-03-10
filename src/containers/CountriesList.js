import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Error from '@material-ui/icons/Error';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import { GetCountriesList, SetPage } from "../actions/countryActions";
import CountryCard from '../components/CountryCard';

const PageClick = (dispatch, page) => {
    dispatch(SetPage(page))
}

const CountriesList = () => {
    const dispatch = useDispatch();
    const countriesList = useSelector(state => state.CountriesList);
    const countriesPagination = useSelector(state => state.CountriesPagination);

    React.useEffect(() => {
        const FetchData = () => {
            dispatch(GetCountriesList())
        }
        
        FetchData();

    }, [dispatch]);


    const ShowData = () => {
        if(countriesList.loading) {
            return <CircularProgress />
        }

        if(!_.isEmpty(countriesList.filteredData) && !_.isEmpty(countriesPagination)) {
            const indexOfLastCountry = countriesPagination.currentPage * countriesPagination.countriesPerPage;
            const indexOfFirstCountry = indexOfLastCountry - countriesPagination.countriesPerPage;
            const currentCountries = countriesList.filteredData.slice(indexOfFirstCountry, indexOfLastCountry);

            return (
                <Grid container spacing={3}>
                    {currentCountries.map((country, index) => {
                        return CountryCard(country, index) 
                    })}
                </Grid>
            )
        } else if(_.isEmpty(countriesList.filteredData)) {
            return <Chip 
            icon={<Error />}
            label="No countries found!"
            color="secondary" />
        }

        if(countriesList.errMessage !== "") {
            return <Chip 
            icon={<Error />}
            label={countriesList.errMessage}
            color="secondary" />
        }

        return <Chip 
        icon={<Error />}
        label="An unknown error has occurred!"
        color="secondary" />
    }

    const ShowPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(countriesList.filteredData.length / countriesPagination.countriesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.length > 1 ? pageNumbers.map(number => {
            return (
                    <Button key={number} id={number} onClick={() => PageClick(dispatch, number)}>{number}</Button>
            );
        }) : null;

        return (
            <ButtonGroup size="small" aria-label="small outlined button group" variant="contained" color="primary" className={"pagination-buttons"} >
                {renderPageNumbers}
            </ButtonGroup>
        );
    }

    return(
        <div>
            <ShowData />
            <ShowPagination />
        </div>
    )
};

export default CountriesList;