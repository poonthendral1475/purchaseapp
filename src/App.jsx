import {createContext , useReducer} from 'react';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import { CartContext } from './store/Shoping-cart-context.jsx';
function shoppingCartReducer(state,action)
{
  if(action.type==='ADD_ITEM')
  {
      const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,//not need but we have more number of data it help to prevent from data lost
      items: updatedItems,
    };
  }
  if(action==='UPDATE_ITEM')
  {
    const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
  }
  return state;
}
function App() {
  const [shoppingCartState, setShoppingCartDispatch] = useReducer(shoppingCartReducer,{
    items: [],
  })
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });
  function handleAddItemToCart(id) {
    setShoppingCartDispatch({
      type:'ADD_ITEM',
      payload:id,

    })
    // setShoppingCart((prevShoppingCart) => )
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCartDispatch({
      type:'UPDATE_ITEM',
      payload:{
        productId,
        amount
      }
    })
    // setShoppingCart((prevShoppingCart) => {
      
    // });
  }
  const cxtValue={
    items:shoppingCartState.items,
    addItemToCart:handleAddItemToCart,
    updateItemQuantity:handleUpdateCartItemQuantity
  }

  return (
    <CartContext.Provider value={cxtValue}>
      <Header
      />
      <Shop >  {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}</Shop>
    </CartContext.Provider>
  );
}

export default App;
