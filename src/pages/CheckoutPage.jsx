import { useCart } from '../contextData/CartContext'
import BasketCard from '../components/BasketCard';
import BasketSidebar from '../components/BasketSidebar';
import styles from "./Checkout.module.css"

function CheckoutPage() {
  const[state,dispatch]=useCart()
  console.log(state);
  if(!state.selectedItem){
    return(
      <div>
        <p style={{textAlign:"center",fontSize:"18px",fontWeight:"600"}}>Empty</p>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <BasketSidebar data={state} dispatch={dispatch}/>
      <div className={styles.products}>
      {state.selectedItem.map((product)=>(
        <BasketCard key={product.id} product={product} dispatch={dispatch}/>
      ))}
      </div>
    </div>
  )
}

export default CheckoutPage
