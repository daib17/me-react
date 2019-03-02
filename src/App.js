import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar.js';

import Me from './Me.js';
import Report from './Report.js';
import ReportForm from './ReportForm.js';
import Login from './Login.js';
import Logout from './Logout.js';
import Error from './Error.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ""
        }
        this.onTokenChanged = this.onTokenChanged.bind(this);
    }

    onTokenChanged(value) {
        this.setState({
            token: value
        });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavBar token={this.state.token} />
                        <Route exact path="/" render={props => <Me />} />
                        <Route path="/report/:kmom" component={Report} />
                        <Route path="/addreport" render={props => <ReportForm token={this.state.token} />} />
                        <Route path="/login" render={props => <Login onTokenChanged={this.onTokenChanged} token={this.state.token} />} />
                        <Route path="/logout" render={props => <Logout onTokenChanged={this.onTokenChanged} />} />
                        <Route exact path="/error" render={props => <Error />} />
                    </div>
                </Router>
            </div >
        );
    }
}

export default App;
