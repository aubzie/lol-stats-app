import React, { Component } from "react";
import Spell from "../components/Spell";
import axios from "axios";

class ChampionContainer extends Component {
    constructor(props) {
        super(props);

        this.championImageUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/";
        this.state = {
            championId: props.championId,
            championName: '',
            championLevel: props.championLevel,
            championImage: ''
        }
        
    }

    componentDidMount() {
        //console.log(this.props.championId);
        axios.get("http://localhost:8080/champions/" + this.props.championId)
            .then((response) => {

                this.setState({
                    championImage: response.data.image.full,
                    championName: response.data.name,
                });

                //console.log(response.data);
            })
            .catch((error) => {

            });
    }

    render() {
        if (this.state.championImage == '')
            return null;
        
        else {
            return (

                <div className="row no-gutters mb-3">
                    <div className="col-3 mr-2">
                        <img src={ this.championImageUrl + this.state.championImage } className="champion-img" />
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <h2>{ this.state.championName }, Level { this.state.championLevel }</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {
                                    this.props.spells.map((spell, index) => {
                                        return <Spell key={ index } spellId={ spell } />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default ChampionContainer;