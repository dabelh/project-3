import React from "react";
import {connect} from 'react-redux';
import c3 from "c3";


function Chart(props){
    console.log(props.statistics.map(obj=>[obj.vacation_id,obj.followers]))
    const {statistics}=props;
  React.useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        columns:statistics.map(obj=>[obj.vacation_id,obj.followers]),
        type: "bar",
      },
    });
  }, []);
  
  return <div id="chart" />;
};
const mapStateToProps = (state) => {
    return {
        statistics:state.vacations.statistics, 
    }
}

export default connect(mapStateToProps, null)(Chart);