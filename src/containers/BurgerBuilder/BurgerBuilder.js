import React, { Component } from 'react';
import axios from '../../axios.orders';
import { connect } from 'react-redux';

// import {INGREDIENT_PRICES, BASE_BURGER_PRICE} from '../../configurations/Burger/BurgerConfig';
import Auxiliar from '../../hoc/Auxiliar/Auxilar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount () {
        console.log(this.props)
        this.props.onInitIgredients();
    }

    updatePurchaseState (ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
        //this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const diabledInfo = {
            ...this.props.storedIngredients
        };
        for (let key in diabledInfo) {
            diabledInfo[key] = diabledInfo[key] <= 0;
        }
        let orderSummary = null;               
        let burger = this.props.error ? <p>Ingredients con't be loaded</p> : < Spinner />;
        
        if (this.props.storedIngredients) {
            burger = (
                <Auxiliar>
                    <Burger ingredients={this.props.storedIngredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={diabledInfo}
                        purchasable={this.updatePurchaseState(this.props.storedIngredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.storedTotalPrice}
                    />
                </Auxiliar>
            );
            orderSummary = <OrderSummary ingredients={this.props.storedIngredients}
            price={this.props.storedTotalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        }
        
        return (
            <Auxiliar>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliar>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedIngredients: state.burgerBuilder.ingredients,
        storedTotalPrice: state.burgerBuilder.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIgredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));