import React, { Component } from "react";
import ItemSet from "../components/ItemSet";
import axios from "axios";

class ItemsContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="col-3">
                <h4>Items</h4>
                {
                    this.props.items.map((item, index) => {
                        return <ItemSet key={ index } itemId={ item } />
                    })
                }
            </div>
        ); 
    }
}

export default ItemsContainer;