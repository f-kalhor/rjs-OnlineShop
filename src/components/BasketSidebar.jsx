import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa6";
import { BsPatchCheck } from "react-icons/bs";

import styels from "./BasketSidebar.module.css"

function BasketSidebar({ data ,dispatch}) {
    const clickHandler=(type)=>{
        dispatch({type})
    }
  return (
    <div className={styels.sidebar}>
      <div>
        <TbChecklist />
        <p>TotalPrice:</p>
        <span>{data.total} $</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity:</p>
        <span>{data.itemsCount}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status:</p>
        <span>{data.checkout ?"Done":"Pending..."}</span>
      </div>
      <button onClick={()=>clickHandler("CHECKOUT")}>Check Out</button>
    </div> 
  )
}

export default BasketSidebar;
