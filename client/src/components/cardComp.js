import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {asyncActionFetchCations} from '../actions/vacationAction';
import {unfollowAction} from '../actions/unfollow';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


function VacCard(props) {
 const classes = useStyles();
    const {vacation,follow,deleteVac,fetchCations,unfollow,edit,userID}=props;
   const {picture,description,price,dates,id,followed} = vacation
   const uf = (a,b)=>{
       unfollow(a,b);
       fetchCations()
   }
  return (
    <Card className={classes.root} key={id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={picture}
          title="Contemplative Reptile"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2" >
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {dates}
          </Typography>
        </CardContent>
      </CardActionArea>
{!props.isAdmin ? <CardActions>
      {followed
        ? <FavoriteIcon onClick={()=>uf(userID,id)}/>
        : <FavoriteBorderIcon onClick={()=>follow(id)}/>
      }
      </CardActions>
:<CardActions>
        <HighlightOffIcon onClick={()=>deleteVac(id)}/>
        <EditIcon onClick={()=>edit(id)}/> 
      </CardActions>
}
    </Card>
  );
}

const mapStateToProps = (state) => {

    return {
        isAdmin:state.vacations.isAdmin,
        userID:state.vacations.userID
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        fetchCations:()=> {
            return dispatch(asyncActionFetchCations());
        },
        unfollow:(userID,id)=>{
        return dispatch(unfollowAction(userID,id))
    }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VacCard);

