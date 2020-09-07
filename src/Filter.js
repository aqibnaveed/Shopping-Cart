import React, { Component } from "react";
import data from "./data";
import ProductItem from "./ProductItem";
import Cart from "./Cart"
import "./Filter.css";

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "All",
            itemsCount: [0, 0, 0, 0, 0, 0],
            totalCount: 0,
            totalPrice: 0
        };
    }

    findSelectedValue = () => {
        const selectedColor = document.getElementById("colors").value;
        this.setState({ color: selectedColor })
    }

    addToCart = (id, price) => {
        this.setState(state => {
            const itemsCount = state.itemsCount.map((item, j) => {
                if (j === id) {
                    this.incrementTotalCount();
                    this.incrementTotalPrice(price);
                    return item + 1;
                } else {
                    return item;
                }
            });

            return {
                itemsCount,
            };
        });
    }

    removeFromCart = (id, price) => {
        this.setState(state => {
            const itemsCount = state.itemsCount.map((item, j) => {
                if (j === id && item !== 0) {
                    this.decrementTotalPrice(price);
                    this.decrementTotalCount(1);
                    return item - 1;
                } else {
                    return item;
                }
            });

            return {
                itemsCount,
            };
        });
    }

    removeProduct = (id, price) => {
        this.setState(state => {
            const itemsCount = state.itemsCount.map((item, j) => {
                console.log("price 3: " + price)
                if (j === id) {
                    console.log(price * item)
                    this.decrementTotalPrice(price * item);
                    this.decrementTotalCount(item);
                    return 0;
                } else {
                    return item;
                }
            });
            return {
                itemsCount,
            };
        });
    }

    incrementTotalCount = () => {
        this.setState({ totalCount: this.state.totalCount + 1 })
    }

    decrementTotalCount = (number) => {
        this.setState({ totalCount: this.state.totalCount - number })

        if (this.state.totalCount == number) {
            this.setState({ totalPrice: 0 })
        }
    }

    incrementTotalPrice = (price) => {
        const newPrice = Math.round((price + Number.EPSILON) * 100) / 100;
        this.setState({ totalPrice: this.state.totalPrice + newPrice })
    }

    decrementTotalPrice = (price) => {
        const newPrice = price.toFixed(2);
        this.setState({ totalPrice: this.state.totalPrice - newPrice })

    }

    EmptyCart = () => {
        this.setState({
            itemsCount: [0, 0, 0, 0, 0, 0],
            totalCount: 0,
            totalPrice: 0
        })
    }

    render() {
        const itemList = data
            .filter(items => {
                return (
                    items.colour.toLowerCase() === this.state.color.toLowerCase() ||
                    this.state.color.toLowerCase() === "all"
                )
            })
            .map(item => {
                let id = item.id;
                return (
                    <li key={item.id} >
                        <div id="leftDiv">         {/* Product Image    */}
                            <img
                                src={item.img}
                                alt={item.name}
                                title={item.name}
                                height='200px'
                                style={this.liStyle}
                            />
                        </div>

                        <div id="middleDiv">       {/* Product Details    */}
                            <h4>{item.name}</h4>
                            <h6>Color: {item.colour}</h6>
                            <h6>Price: ${item.price}</h6>
                        </div>

                        <div id="rightDiv">        {/* Add/Remove Product    */}
                            <h4>{this.state.itemsCount[id]}</h4>
                            <button onClick={() => this.removeFromCart(item.id, item.price)}>-</button>
                            <button onClick={() => this.addToCart(item.id, item.price)}>+</button>
                            <div>
                                <button onClick={() => this.removeProduct(item.id, item.price)}>Remove</button>
                            </div>
                        </div>
                    </li>
                )
            })
        return (
            <div id="custom">
                <select name="colors" id="colors" onChange={this.findSelectedValue}>
                    <option value="All" >All</option>
                    <option value="black" >Black</option>
                    <option value="stone" >Stone</option>
                    <option value="red" >Red</option>
                </select>
                <ProductItem items={itemList} selectedColor={this.state.color} />
                <Cart
                    EmptyCartClick={this.EmptyCart}
                    totalPrice={this.state.totalPrice}
                    totalCount={this.state.totalCount}
                />
            </div>
        )
    }
}
export default Filter;