import React from 'react';
import { Button, Input } from 'reactstrap';



class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.token) {
            this.props.history.push("/error");
        }
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
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE1NTE0NTU0MzksImV4cCI6MTU1MTQ5ODYzOX0.DHy0JS09kqdC-AfuQw03VsEggzPEPyMTFFYSum1Nw_0';
            let that = this;
            fetch("http://localhost:8333/reports", {
                method: 'POST',
                headers: new Headers({
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state)
            }).then(function (response) {
                console.log(response);
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
                console.log(result);

            });
        } else {
            this.setState({
                output: "Title and/or report is missing.",
                outputType: "error"
            });
        }
    }

    render() {
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

export default ReportForm;
