import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const FIELDS = ['id'];


export default class GameComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game:{},
            comments:[]
        }
    }


    render() {
        const {game,comments} = this.state;
        const fields = _.omit(game, FIELDS);
        return (
        <div>
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableRow>
                    {_.keys(fields).map((x, idx) => 
                        <TableCell align="right" key={idx}>{x} </TableCell>)}
                </TableRow>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(game).map((row) => (
            <TableCell>helllo</TableCell>)
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>
    );
}
    


async componentDidMount() {
    try {
        const id = this.props.location.pathname
        Promise.all([axios.get(`/games${id}`),axios.get(`/comments${id}`)]).then(function(gameData,commentsData) {
        const game = gameData.data;
        const comments = commentsData.data
        this.setState({ game, comments });
        })

    }
    catch(err) {
        console.log(err)
    }
 
}
}