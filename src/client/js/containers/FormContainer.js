import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../components/Input";

class FormContainer extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return (
            <form id="article-form">
                <Input label="test label" text="some text" id="some_id" value="123" />
            </form>
        );
    }
}

export default FormContainer;