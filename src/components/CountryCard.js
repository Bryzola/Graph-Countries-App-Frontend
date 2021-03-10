import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocationCity from '@material-ui/icons/LocationCity';
import Map from '@material-ui/icons/Map';
import GTranslate from '@material-ui/icons/GTranslate';
import Edit from '@material-ui/icons/Edit';


export default function CountryCard(country, index) {

    return (
            <Grid item xs={3} key={index}>
                <Card className={"card"}>
                    <CardActionArea>
                    <CardMedia
                        className={"card-image"}
                        image={country.flag.svgFile}
                        title={country.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {country.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="span">
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <LocationCity />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Capital" secondary={country.capital ? country.capital : "Unknown"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <Map />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Region" secondary={country.subregion != null ? country.subregion.name : "Unknown"} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <GTranslate />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Languages" secondary={country.officialLanguages ? 
                                        country.officialLanguages.map(language => language.name).toString().replace(/,/g, ', ')
                                        : "Unkown"} />
                                </ListItem>
                            </List>
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color="primary" href={`/country/${country.numericCode}`}>
                            Details
                        </Button>
                        
                        {country.customData && (
                        <Chip style={{marginLeft: "85px"}}
                            icon={<Edit />}
                            label="Custom Details!"
                            color="secondary"
                        />
                        )}
                    </CardActions>
                </Card>
            </Grid>
    );
}
