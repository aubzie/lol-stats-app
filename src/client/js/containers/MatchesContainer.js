import React, { Component } from "react";
import MatchContainer from "./MatchContainer";

class MatchesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: props.matches,
            accountId: props.accountId
        }
    }

    componentDidMount() {

    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.matches !== this.props.matches) {
            console.log("matches containter update");
            this.setState({
                matches: this.props.matches,
                accountId: this.props.accountId
            });
        }
    }

    render() {
        console.log(this.state.matches.length);
        return (
            <div id="match-list">
            {
                this.state.matches.map((match, index) => {
                    return <MatchContainer key={ match.gameId } gameId={ match.gameId } accountId={ this.state.accountId }/>
                })
            }
            </div>
        );
    }
}

export default MatchesContainer;