import React from 'react';
import { Button, Input } from 'reactstrap';



class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            output: "",
            outputType: ""
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
        if (this.state.title && this.state.content) {
            let that = this;
            fetch("https://me-api.daib17.me/reports", {
                method: 'POST',
                headers: new Headers({
                    'x-access-token': this.props.token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state)
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                if (result.status === 201) {
                    that.setState({
                        title: "",
                        content: "",
                        output: "Report added successfully.",
                        outputType: "success"
                    });
                } else {
                    that.setState({
                        output: "Failed adding report to database.",
                        outputType: "error"
                    });
                }
            });
        } else {
            this.setState({
                output: "Please enter title and report.",
                outputType: "error"
            });
        }
    }

    render() {
        if (!this.props.token) {
            return (
                <div className="main">
                    <p>Please log in to be able to add new reports.</p>
                </div>
            );
        } else {
            return (
                <div className="main">
                    <h1>New report</h1>
                    <br />
                    <form onSubmit={this.handleSubmit} >
                        <Input
                            className="w-50"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleChange} />
                        <br />
                        <Input
                            className="textarea"
                            type="textarea"
                            name="content"
                            placeholder="Report (Markdown)"
                            value={this.state.content}
                            onChange={this.handleChange} />
                        <br />
                        <Button color="primary">Done</Button>
                    </form>
                    <br />
                    <p className={this.state.outputType}>{this.state.output}</p>
                </div>
            );
        }
    }
}

export default ReportForm;
