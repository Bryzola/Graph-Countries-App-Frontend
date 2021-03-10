import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { LocationCity, Map, AttachMoney, People, Landscape, Http } from '@material-ui/icons';


export default function CountryPage(props) {

  return (
    <div>
      <form onSubmit={props.submitCountryData}>
        <input type="hidden" id="countryCode" name="CountryCode" value={props.country.numericCode} />
        <input type="hidden" id="countryFlag" name="Flag" value={props.country.flag.svgFile} />
        <input type="hidden" id="countryName" name="Name" value={props.country.name} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper className={"details-block"}>
              <h2 style={{ margin: 0 }}>{props.country.name}</h2>
              <img className={"details-flag"} alt={props.country.name} src={props.country.flag.svgFile} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={"details-block"}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={"details-list"}
                  >
                      <ListItem button>
                          <ListItemIcon>
                          <LocationCity />
                          </ListItemIcon>
                          <TextField type="text" id="capital" name="Capital" label="Capital" defaultValue={props.country.capital ? props.country.capital : "Unknown"} />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon>
                          <Map />
                          </ListItemIcon>
                          <TextField type="text" id="region" name="Region" label="Region" defaultValue={props.country.subregion != null ? props.country.subregion.name : "Unknown"} />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon>
                          <AttachMoney />
                          </ListItemIcon>
                          <TextField type="text" id="currency" name="Currency" label="Currency" defaultValue={props.country.currencies != null ? props.country.currencies[0].name : "Unknown"} />
                      </ListItem>
                  </List>
                  <Button type="submit" variant="contained" color="primary">Update</Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={"details-list"}
                  >
                      <ListItem button>
                          <ListItemIcon>
                          <People />
                          </ListItemIcon>
                          <TextField type="number" id="population" name="Population" label="Population" defaultValue={props.country.population != null ? props.country.population : "Unknown"} />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon>
                          <Landscape />
                          </ListItemIcon>
                          <TextField type="number" id="area" name="Area" label="Area" defaultValue={props.country.area != null ? props.country.area : "Unknown"} />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon>
                          <Http />
                          </ListItemIcon>
                          <TextField type="text" id="topLevelDomain" name="TopLevelDomain" label="Top Level Domain" defaultValue={props.country.topLevelDomains != null ? props.country.topLevelDomains[0].name : "Unknown"} />
                      </ListItem>
                  </List>
                  <Button onClick={props.resetCountryData} variant="contained" color="secondary">Reset</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
