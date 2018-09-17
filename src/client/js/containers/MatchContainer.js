import React, { Component } from "react";
import ChampionContainer from "./ChampionContainer";
import ItemsContainer from "./ItemsContainer";
import RunesContainer from "./RunesContainer";

import axios from "axios";

class MatchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountId: props.accountId,
            gameId: props.gameId,
            gameDuration: '',
            gameCreated: '',
            outcome: false,

            championId: 0,
            championLevel: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            totalCreepScore: 0,
            creepScorePerMin: 0,

            spells: [],
            items: [],

        }
    }

    componentDidMount() {
        this.getMatchData(this.props.gameId);
    }

    getMatchData(gameId) {
        console.log("update match");
        axios.get("http://localhost:8080/matches/" + gameId + "?accountId=" + this.state.accountId)
            .then((response) => {

                this.setState({
                    gameId: gameId,
                    gameDuration: response.data.duration,
                    gameCreated: response.data.gameCreated,
                    outcome: response.data.outcome,
        
                    championId: response.data.championId,
                    championLevel: response.data.championLevel,
                    kills: response.data.kills,
                    deaths: response.data.deaths,
                    assists: response.data.assists,
                    totalCreepScore: response.data.totalCreepScore,
                    creepScorePerMin: response.data.creepScorePerMin,
        
                    spells: response.data.spells,
                    items: response.data.items,
                });

            })
            .catch((error) => {

            });
    }

    componentDidUpdate(prevProps) {
       
        if (prevProps.gameId !== this.props.gameId) {
            console.log("prop update from " + prevProps.gameId + " to " + this.props.gameId);
            this.getMatchData(this.props.gameId);
            // console.log("matches containter update");
            // this.setState({
            //     matches: this.props.matches,
            //     accountId: this.props.accountId
            // });
        }
    }


    render() {

        if (this.state.championId == 0) {
            return null;

        } else {
            const outcomeClass = (this.state.outcome) ? 'victory' : 'defeat';
            return (  
                <div className={ "row py-2 " + outcomeClass }>

                    <div className="col-6">
                        <div className="row">
                            <div className="col-3 text-center">
                                <h2 className="outcome">{ this.state.outcome ? 'Victory' : 'Defeat' }</h2>
                                <h5>{ this.state.gameDuration }</h5>
                            </div>
                            <div className="col">
                                <ChampionContainer championId={ this.state.championId } championLevel={ this.state.championLevel } spells={ this.state.spells } />
                                <div className="row">
                                    <div className="col">
                                        KDA:
                                        <h2>{ this.state.kills } / <span className="deaths">{ this.state.deaths }</span> / { this.state.assists }</h2>
                                    </div>
                                    <div className="col">
                                        Creep Score:
                                        <h3>{ this.state.totalCreepScore } ({ Math.round(this.state.creepScorePerMin * 10) / 10 }/min)</h3>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                    
                    <ItemsContainer items={ this.state.items } />
                    <RunesContainer />
                </div>
            );
        }
        
    }
}

export default MatchContainer;