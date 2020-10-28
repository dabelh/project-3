import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VacCard from './cardComp';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import {asyncActionFetchCations} from '../actions/vacationAction';


class VacationsView extends React.Component {
        constructor(props) {
        super(props);
        this.state = {

        }
    }
    
  render(){ 
     
  return (
        <React.Fragment>
        <Grid container spacing={3}>
      {this.renderVacationCard()}
      </Grid>
    </React.Fragment>
  
  );
  }
    edit=async(id)=>{
        alert('אי אפשר לערוך באמת שניסיתי')
    }
  
    deleteVac=async(id)=>{
     await axios.get(`/vacations/delete/${id}`).then((response) => {
        console.log(response.data);
    })
        this.props.fetchCations()
    }
  
    follow=async (id)=>{
       await axios.get(`/vacations/follow/${this.props.userID}/${id}`).then((response) => {
        console.log(response.data);
    })
        this.props.fetchCations()
    }
 
renderVacationCard(){

    const {vacationsData} = this.props;
    return (
    vacationsData.map((x, idx) => 
        <Grid item xs={4} key={idx}>
            <VacCard vacation={x} follow={this.follow} deleteVac={this.deleteVac} edit={this.edit}/>
        </Grid>
     )
    )
}
    
    
async componentDidMount() {
    try {
      await this.props.fetchCations();

    }
    catch(err) {
        this.props.history.push("/login")
    }
    }
}

const mapStateToProps = (state) => {
    return {
        vacationsData:state.vacations.vacations, 
        userID:state.vacations.userID
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        fetchCations:()=> {
            return dispatch(asyncActionFetchCations());
        }
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(VacationsView);
export default Connected;
