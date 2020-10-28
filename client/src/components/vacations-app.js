import React,{Fragment} from 'react';
import VacationsView from './vacations';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {userAction} from '../actions/userAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';


class VacApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            isAdmin:0

        }
    }

async componentDidMount() {
    try {
      await fetch(`/vacations/user`).then(response => response.json()).then(data => {
        console.log(data);
        const {username,isAdmin,id} = data
        this.props.userUpdate({isAdmin,id})
        this.setState({username})
        this.setState({isAdmin})

        });
}
    
    catch(err) {
        this.props.history.push("/login")
    }
}

    render() {
        return (
            <Fragment>
    <CssBaseline />
    <Container fixed style={{ backgroundColor: '#b0bec5'}}>
        {this.state.isAdmin && <EqualizerIcon onClick={()=>{this.props.history.push("/stats")}}style={{ float: 'left'}}fontSize="large"/>}
     <Grid item xs={12}>
            <Typography variant="h4">Hi {this.state.username}</Typography>
        </Grid>
      <div>
            <VacationsView/>
    </div>
      </Container>
</Fragment>


        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userUpdate: value => {
            return dispatch(userAction(value));
        }
    }
}

export default connect(null, mapDispatchToProps)(VacApp);