import React from 'react';
import { connect } from 'react-redux';
import {getVacationStats} from '../actions/getVacations';
import Chart from './chart-comp'


class VacStats extends React.Component{
    
render(){
    return (
   <div>
      <h1>
      חופשות כמעט עובד
      </h1>
    <Chart/>
    </div>
  );}
    

    
async componentDidMount() {
    try {
      await this.props.getVacations();

    }
    catch(err) {
        this.props.history.push("/vacations")
    }
    }
}


const mapDispatchToProps = (dispatch) => {
    
    return {
        getVacations:()=> {
            return dispatch(getVacationStats());
        }
    }
}

export default connect(null, mapDispatchToProps)(VacStats);
