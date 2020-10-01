import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import VacCard from './cardComp';
import Grid from '@material-ui/core/Grid';
import {asyncActionFetchCations} from '../actions/vacationAction'

class vacationsView extends React.Component {

    
  render(){ 
  return (
        <React.Fragment>
      <CssBaseline />
    <Container fixed>
      <div >
        <Grid container spacing={3}>
       <Grid item xs={12}>
          <Paper>NAME</Paper>
        </Grid>
      {this.renderVacationCard()}
      </Grid>
    </div>
      </Container>
    </React.Fragment>
  
  );
  }
 
renderVacationCard(){
    const {vacationsData} = this.props;
    return (
    vacationsData.map((x, idx) => 
        <Grid item xs key={idx}>
            <VacCard vacation={x}/>
        </Grid>
     )
    )
}
    
    
async componentDidMount() {
    try {
      await this.props.fetchCations();

    }
    catch(err) {
        this.props.history.push("/login")}
    }
}

const mapStateToProps = (state) => {
    return {
        vacationsData: state.vacations.vacations,   
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        fetchCations:()=> {
            return dispatch(asyncActionFetchCations());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(vacationsView);

