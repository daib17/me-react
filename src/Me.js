import React, { Component } from 'react';

class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: ""
        };
    }

    componentDidMount() {
        let that = this;
        fetch("https://me-api.daib17.me/")
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                that.setState({
                    desc: result.data.description
                });
            });
    }

    render() {
        return (
            <div className="main">
                <h1>Me</h1>
                <hr />
                <p>{this.state.desc}</p>
            </div>
        );
    }
}

export default Me;
