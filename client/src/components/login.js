import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChange(field, value) {
        this.setState({[field]: value});
    }

    async onClick() {
        try {
            const {data} = await axios.post('/auth/login', this.state)
            this.props.history.push("/vacations");
            console.log(data)
        } catch (err) {
            this.props.history.push("/login");
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <TextField id="username" label="username" onChange={({target: {value}}) => this.onChange('username', value)} />
                <TextField id="password" type="password" label="password" onChange={({target: {value}}) => this.onChange('password', value)} />
                <Button onClick={() => this.onClick()} variant="contained" color="primary">Login</Button>
            </div>
        )
    }
}