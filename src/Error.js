import React from 'react';
import { withRouter } from "react-router-dom";

class Error extends React.Component {
    render() {
        return (
            <div className="main">
                <p>Page not found.</p>
            </div>
        );
    }
}

export default withRouter(Error);
