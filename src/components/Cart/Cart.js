import { useContext, useState ,Fragment} from "react";
import PlantItem from "../Plants/PlantItem/PlantItem";
import Modal from "../UI/Modal";
import CartContext from "./cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

function Cart(props) {
  const ctx = useContext(CartContext);
  const [ordered, setOrdered] = useState(false);
  const[didSubmit,setDidSubmit] = useState(false);


  

  const orderHandler = () => {
    setOrdered(true);
  };

  const submitOrderHandler = (userData)=>{
    // console.log(userData)
    fetch('https://green-store-43556-default-rtdb.firebaseio.com/userdata.json',{
      method : 'POST',
      body : JSON.stringify({
        userData : userData,
        orderItems : ctx.items
      }),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    setDidSubmit(true);
    ctx.clearCart();
    
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((plant) => (
        <CartItem
          name={plant.name}
          id={plant.id}
          price={plant.price}
          amount={plant.amount}
        />
      ))}
    </ul>
  );

  const totalAmount = ctx.totalAmount.toFixed(2);
  const cartActions =  <div className={classes.actions}>
  <button className={classes["btn--alt"]} onClick={props.onHide}>
    Close
  </button>
  {ctx.items.length > 0 && <button className={classes.button} onClick={orderHandler}>
    Order
  </button>}
</div>
  const cartModalContent = (
    <div>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!ordered && cartActions}
      {ordered && <CheckOut submitOrder = {submitOrderHandler} onHide = {props.onHide}/>}
    </div>
  );
  const submitModalData =  <Fragment>
  <p>Successfully sent the order!</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onHide}>
    Close
  </button>
</div>
</Fragment>

  return <Modal onHide={props.onHide} didSubmit = {didSubmit}>
   
   {!didSubmit && cartModalContent}
   {didSubmit && submitModalData}
    
  </Modal>;
}

export default Cart;
