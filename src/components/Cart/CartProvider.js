import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (plant) => plant.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type =='REMOVE')
  {
    const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmpount = state.totalAmount - existingCartItem.price;
    console.log(existingCartItem.price)

    let updatedItems; 
    if(existingCartItem.amount === 1)
    {
        updatedItems = state.items.filter((item) => item.id !== action.id);

    }

    else{
        const updatedItem = {
            ...existingCartItem,
            amount : existingCartItem.amount-1
        }

        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem;

    }

    if(action.type === 'CLEAR'){
      return defaultCartState
    }
    return {
        items : updatedItems,
        totalAmount :updatedTotalAmpount
    }
  }

  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addPlantToCart = (plantItem) => {
    dispatchCart({ type: "ADD", item: plantItem });
  };

  const removePlantFromCart = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const clearCartHandler = ()=>{
    dispatchCart({type:'CLEAR'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addPlant: addPlantToCart,
    removePlant: removePlantFromCart,
    clearCart : clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
