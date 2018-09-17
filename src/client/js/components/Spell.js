import React, { Component } from "react";
import axios from "axios";

class ItemSet extends Component {
    constructor(props) {
        super(props);

        this.itemSpellUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/";

        this.state = {
            name: '',
            image: ''
        }
    }

    componentDidMount() {

        axios.get("http://localhost:8080/spells/" + this.props.spellId)
            .then((response) => {

                this.setState({
                    name: response.data.name,
                    image: response.data.image.full
                });
                
            })
            .catch((error) => {

            });

        
    }
    

    render() {

        if (this.state.name != "") {
            return (
                <img src={ this.itemSpellUrl + this.state.image } className="spell-img mr-2" />
            )
        } else {
            return false;
        }

    }
}

export default ItemSet;