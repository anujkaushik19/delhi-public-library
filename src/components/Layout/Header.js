import image from "../../assets/green.jpg";
import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import CartButton from "./CartButton";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


function Header(props) {

  const ctx = useContext(AuthContext);


  const logOutHandler = ()=>{
     ctx.logout();
  }
  return (
    <Fragment>
      <div className={classes.header}>
        
        <h1>Delhi Public Library</h1>
        
        
        <CartButton onShow = {props.onShow} />
      </div>
      
      <main className={classes["main-image"]}>
        <img src={image} />
      </main>
    </Fragment>
  );
}

export default Header;
