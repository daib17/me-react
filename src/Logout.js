import React from 'react';
import {withRouter} from "react-router-dom";

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.props.onTokenChanged('');
        console.log("Logout constructor");
    }

    render() {
        return (
            <div className="main">
            <h1>Logout</h1>
            <hr />
            <p>User logged out.</p>
        </div>
        );
    }
}

export default withRouter(Logout);
