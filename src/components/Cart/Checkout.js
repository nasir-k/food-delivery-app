import { Fragment, useRef, useState } from "react";

import classes from "./Checkout.module.css";
import { Button, Checkbox, FormControlLabel, FormGroup, Link, Tooltip, Typography } from "@mui/material";
import Modal from '../UI/Modal';

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const [checked, setChecked] = useState(false);
  const [showMoredetails, setShowMoredetails] = useState(false);

  const handleChange = (event) => {
    setChecked((preState)=> !preState);
    props.shareMealHandler(checked);
  };


  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      postalCode: enteredPostalCode,
      city: enteredCity,
      street: enteredStreet,
    });

    // Submit cart data
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const moreDetailsModalHandler = ()=>{
    setShowMoredetails(false);
  }

  const moreDetailsModalContent = (
    <Fragment>
      <Typography>
      By donating leftover food to NGOs, you contribute to reducing food waste and help provide nourishment to those in need.<br />
If you select the above checkbox after you deliver the order NGO will contact you to collect surplus, No opened food.
      </Typography>
      <Button variant="contained" sx={{backgroundColor:"#8a2b06", marginTop:"2rem"}} onClick={moreDetailsModalHandler}>Close</Button>
    </Fragment>
  );

  return (
    <Fragment>
      <form className={classes.form} onSubmit={confirmHandler}>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} label="Share a meal" /> 
      </FormGroup>
        <Link component="button" variant="body2" onClick={(event) => {
          event.preventDefault();
          setShowMoredetails(true);
        }} sx={{paddingBottom: "20px"}}>More details</Link>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
    {showMoredetails && <Modal onClose={moreDetailsModalHandler}>
      {moreDetailsModalContent}
    </Modal>}
    </Fragment>
  );
};

export default Checkout;
