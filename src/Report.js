import React from 'react';
import Markdown from 'react-markdown';


class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            kmom: props.match.params.kmom
        };
    }

    loadData() {
        let that = this;
        fetch("http://localhost:8333/reports/" + this.state.kmom)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                that.setState({
                    content: result.data.content
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.kmom !== prevProps.match.params.kmom) {
            this.setState({
                kmom: this.props.match.params.kmom
            }, this.loadData);
        }
    }

    render() {
        return (
            <div className="main">
                <h1>{this.state.kmom}</h1>
                <hr />
                <Markdown source={this.state.content} />
            </div>
        );
    }
}

export default Report;
