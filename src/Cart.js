import React, { Component } from "react";
//import data from "./data";

class Cart extends Component {

    cartStyle = {
        paddingLeft: '5%',
        paddingBottom: '5%'
    }


    render() {
        return (
            <div style={this.cartStyle}>

                <button onClick={this.props.EmptyCartClick}>
                    Empty Cart
                </button>
                <h3>
                    Total Price: ${this.props.totalPrice}
                </h3>
                <h5>
                    Items in cart: {this.props.totalCount}
                </h5>

            </div>
        )
    }
}

export default Cart;