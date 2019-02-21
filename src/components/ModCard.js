import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    
    card: {
        width:'18%',
        minWidth: 200,
        minHeight:200,
        display:'inline-block',
        margin:'15px'
  },
  media: {
    height: 140,
  },

  action:{
    marginLeft:'25%',
  },
};

const ModCard=(props)=> {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.mod.image}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {props.mod.name}
          </Typography>
          <Typography component="p" align='center'>
            {props.mod.nick_name}<br/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button onClick={(e)=>props.modClickHandler(e, props.mod)} size="small" color="primary">
                Schedule
          
        </Button>
      </CardActions>
    </Card>
  );
}

ModCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModCard);