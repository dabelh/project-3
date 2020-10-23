import React,{Fragment} from 'react';
import VacationsView from './vacations';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


export default class VacApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            isAdmin:null
        }
    }

async componentDidMount() {
    try {
      await fetch(`/vacations/user`).then(response => response.json()).then(data => {
        const {username,isAdmin} = data
        this.setState({username})
          if(isAdmin==1){
              this.setState({isAdmin:true})
          }
          else{
              this.setState({isAdmin:false})
          }
         console.log(this.state);

        });
}

    
    catch(err) {
        console.log('bassaa')
    }
}

    render() {
        return (
            <Fragment>
    <CssBaseline />
    <Container fixed style={{ backgroundColor: '#b0bec5'}}>
     <Grid item xs={12}>
            <Typography variant="h4">{this.state.username}</Typography>
        </Grid>
      <div>
            <VacationsView/>
    </div>
      </Container>
</Fragment>


        )
    }
}