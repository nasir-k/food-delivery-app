import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import orderPlacedImage from "../../assets/food-order-icon.png";
import { Box, Container, Link, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import ContainerBox from "./ContainerBox";


const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [didSubmit, setDidSubmit] = useState(false);

  const [isShareMeal, setIsShareMeal] = useState(true);

  const navigate = useNavigate();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    console.log(item);
    cartCtx.addItem(item);
  };

  const handleMealsNavigation = ()=>{
    navigate("/meals");
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const shareMealHandler =(shareMeal)=>{
    setIsShareMeal((prevState)=> !prevState);
    console.log(isShareMeal + " ==> isSharemeal")
  }

  const submitOrderHandler = async (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsSubmitting(true);
    await fetch(
      "https://abbas-s-kitchen-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    shareMealHandler();
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={handleMealsNavigation}>
          Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={handleMealsNavigation} onClose={props.onClose} shareMealHandler={shareMealHandler}/>
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p className={classes["order-placed-text"]}>Your order is placed!
        <span>
          <img src={orderPlacedImage} className={classes["order-image"]}></img>
        </span>
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={()=> navigate(isShareMeal ? '/delivery-update' : "/meals")}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <ContainerBox>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </ContainerBox>
  );
};

export default Cart;
