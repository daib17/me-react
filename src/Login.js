import React from 'react';
import { withRouter } from "react-router-dom";
import { Button, Input } from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.user && this.state.pass) {
            let that = this;
            fetch("http://localhost:8333/login/" + this.state.user + "/" + this.state.pass, {
                method: "post"
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (result.data.status === 201) {
                        that.props.onTokenChanged(result.data.token);
                        that.props.history.push("/login");
                    } else {
                        that.setState({
                            error: "User or password not valid."
                        });
                    }
                });
        } else {
            this.setState({
                error: "Enter username and password"
            });
        }
    }

    render() {
        if (this.props.token) {
            return (
                <div className="main">
                    <h1>Login</h1>
                    <p>User has logged in successfully.</p>
                </div>
            );
        } else {
            return (
                <div className="main">
                    <h1>Sign in</h1>
                    <br />
                    <form onSubmit={this.handleSubmit} className="w-50">
                        <Input
                            type="text"
                            name="user"
                            placeholder="Username"
                            value={this.state.user}
                            onChange={this.handleChange} />
                        <br />
                        <Input
                            type="password"
                            name="pass"
                            placeholder="Password"
                            value={this.state.pass}
                            onChange={this.handleChange} />
                        <br />
                        <Button color="primary">Log in</Button>
                    </form>
                    <p>{this.state.error}</p>
                </div>
            );
        }

    }
}

export default withRouter(Login);
