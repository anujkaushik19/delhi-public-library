import React, { useState, useRef } from "react";
import classes from "./CheckOut.module.css";

const emptyChecker = (value) => value.trim() === "";
const digitChecker = (value) => value.trim().length === 5;

function CheckOut(props) {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !emptyChecker(name);
    const streetIsValid = !emptyChecker(city);
    const postalIsValid = digitChecker(postal);
    const cityIsValid = !emptyChecker(city);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    if (!formIsValid) return;

    props.submitOrder({
      name: name,
      street: street,
      postal: postal,
      city: city,
    });
    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalInputRef.current.value = "";
    cityInputRef.current.value = "";
  };
  

  return (
    <form onSubmit={submitHandler} className={classes.form} >
      <div
        className={`${classes.control} ${
          formValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="">Your Name</label>
        <input type="text" ref={nameInputRef} />
        {!formValidity.name && <p>Enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="">Street</label>
        <input type="text" ref={streetInputRef} />
        {!formValidity.street && <p>Enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="">Postal Code</label>
        <input type="text" ref={postalInputRef} />
        {!formValidity.postal && <p>Enter a postal code (5 digit long)!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="">City</label>
        <input type="text" ref={cityInputRef} />
        {!formValidity.city && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onHide}>Cancel</button>
      </div>
    </form>
  );
}
export default CheckOut;
