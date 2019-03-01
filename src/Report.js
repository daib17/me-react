import React from 'react';
import Markdown from 'react-markdown';


class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kmom: props.match.params.kmom,
            content: "",
            output: ""
        };
    }

    loadData() {
        let that = this;
        fetch("https://me-api.daib17.me/reports/" + this.state.kmom)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                that.setState({
                    content: result.data.content
                });
            })
            .catch(function() {
                that.setState({
                    output: "Report not found."
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.kmom !== prevProps.match.params.kmom) {
            this.setState({
                kmom: this.props.match.params.kmom,
                content: "",
                output: ""
            }, this.loadData);
        }
    }

    render() {
        return (
            <div className="main">
                <h1>{this.state.kmom}</h1>
                <hr />
                <Markdown source={this.state.content} />
                <br />
                <p>{this.state.output}</p>
            </div>
        );
    }
}

export default Report;
