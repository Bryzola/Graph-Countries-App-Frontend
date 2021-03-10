import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import CountriesList from './containers/CountriesList';
import Country from './containers/CountryDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route path={"/"} exact component={CountriesList} />
          <Route path={"/country/:countryCode"} exact component={Country} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
