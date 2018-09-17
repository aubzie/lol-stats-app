import React, { Component } from "react";
import axios from "axios";

class ItemSet extends Component {
    constructor(props) {
        super(props);

        this.itemImageUrl = "https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/";

        this.state = {
            name: '',
            image: ''
        }
    }

    componentDidMount() {

        axios.get("http://localhost:8080/items/" + this.props.itemId)
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
                <div className="row no-gutters item">
                    <div className="col-1 mb-1">
                        <img src={ this.itemImageUrl + this.state.image } className="item-img" />
                    </div>
                    <div className="col ml-1 mb-1">
                        { this.state.name }
                    </div>
                </div>
            );
        } else {
            return false;
        }

        
        
    }
}

export default ItemSet;