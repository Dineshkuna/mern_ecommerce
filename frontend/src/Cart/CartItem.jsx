import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeErrors } from '../features/cart/cartSlice';



function CartItem({item}) {
   const dispatch = useDispatch();
   const [quantity, setQuantity] = useState(item.quantity);

    const decreaseQuantity = () => {
               if(quantity <= 1){
                   toast.error('Quantity cannot be less than 1',{position:'top-center', autoClose:3000});
                   dispatch(removeErrors())
                   return;
   
               }
               setQuantity(qty => qty - 1);
   
           }
           const increaseQuantity = () => {
               if(item.stock <=quantity){
                   toast.error('Cannot exceed available Stock!',{position:'top-center', autoClose:3000});
                   dispatch(removeErrors())
                   return;
                   
               }
               setQuantity(qty => qty + 1);
               
   
           }
    
  return (
    <div>
        <div className="cart-item">
                        <div className="item-info">
                            <img src={item.image} alt={item.name}  className='item-image'/>
                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price"><strong>Price:</strong> ₹{item.price.toFixed(2)}</p>
                                <p className="item-quantity"><strong>Quantity: </strong> {item.quantity}</p>
                            </div>
                        
                        </div>

                        <div className="quantity-controls">
                            <button className="quantity-button decrease-btn" onClick={decreaseQuantity}>-</button>
                            <input type="number" value={item.quantity}  className='quantity-input' readOnly min="1"/>
                            <button className="quantity-button increase-btn" onClick={increaseQuantity}>+</button>


                        </div>

                        <div className="item-total">
                            <span className="item-total-price">₹{item.price * item.quantity.toFixed(2)}/-</span>
                        </div>

                        <div className="item-actions">
                            <button className="update-item-btn">Update</button>
                            <button className="remove-item-btn">Remove</button>
                        </div>
                    </div>
      
    </div>
  )
}

export default CartItem
