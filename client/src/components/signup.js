import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2:''
        }
    }

    onChange(field, value) {
        this.setState({[field]: value});
    }

    async onClick() {
        try {
            const {data} = await axios.post('/auth/signup', this.state)
            this.props.history.push("/login");
            console.log(data)
        } catch (err) {
            this.props.history.push("/signup");
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <TextField id="username" label="username" onChange={({target: {value}}) => this.onChange('username', value)} />
                <TextField id="password" type="password" label="password" onChange={({target: {value}}) => this.onChange('password', value)} />
                <TextField id="password2" type="password" label=" repet password" onChange={({target: {value}}) => this.onChange('password2', value)} />
                <Button onClick={() => this.onClick()} variant="contained" color="primary">Sigh Up</Button>
                <br/>
                <Button onClick={() => this.props.history.push("/login")} variant="outlined" color="primary">Log In</Button> 
            </div>
        )
    }
}