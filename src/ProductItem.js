import React, { Component } from "react";
import data from "./data";
import Cart from "./Cart";

class ProductItem extends Component {
    ulCustomStyle = {
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '20px',
        content: '',
        display: 'table',
        clear: 'both',
        listStyleType: 'none'
    }

    render() {
        return (
            <div>
                <ul style={this.ulCustomStyle}>
                    {this.props.items}
                </ul>
            </div>
        )
    }

}

export default ProductItem;