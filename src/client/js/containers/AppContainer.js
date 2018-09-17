import React, { Component } from "react";
import MatchesContainer from "../containers/MatchesContainer";
import axios from "axios";
require("../../css/main.scss");

class AppContainer extends Component {
    constructor() {
        super();

        this.state = {
            summonerName : '',
            accountId : 0,
            matches: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,

        });
    }

    handleSubmit(event) {

        
        axios.get("http://localhost:8080/summoners/by-name/" + this.state.summonerName)
            .then((response) => {

                console.log(response.data);

                if (response.data.accountId != null && response.data.matches != null) {
                    this.setState(prevState => {
                        return {
                            accountId: response.data.accountId,
                            matches: response.data.matches,
                            updateMatches: true
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row mb-2">
                    <div className="col-12">
                        <h2>League of Legends - Stats App</h2>
                        <form id="user-search" onSubmit={ this.handleSubmit } className="form-inline">
                            <div className="form-group mr-2">
                                <input type="text" className="form-control" id="summonerName" name="summonerName" onChange={ this.handleInputChange } placeholder="Summoner's Name" />
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>

                <MatchesContainer matches={ this.state.matches } accountId={ this.state.accountId } />

            </div>
            
        );
    }
}

export default AppContainer;