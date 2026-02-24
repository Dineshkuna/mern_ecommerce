import React from 'react'
import '../CartStyles/Payment.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import CheckoutPath from './CheckoutPath'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderInfo'));
    const {user} = useSelector((state)=>state.user);
    const {shippingInfo} = useSelector((state)=>state.cart);
    const completePayment = async (amount)=>{
        const  {data:keyData} = await axios.get('/api/v1/getKey');
        const {key}= keyData;
        const {data:orderData} = await axios.post('/api/v1/payment/process', {amount});
       
        const {order} = orderData;
      


        const options = {
          key,
          amount: order.amount,
          currency: 'INR',
          name: 'ShopEasy',
          description: 'Ecommerce Website Payment Transaction',
          order_id: order.id,

          handler: async function (response) {

            await axios.post('/api/v1/paymentVerification', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful");
          },

          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNumber
          },

          theme: {
            color: '#3399cc'
          },
        };

      const rzp = new Razorpay(options);
      rzp.open();
    }
  return (
    <>
    <PageTitle title="Payment Processing" />
    <Navbar />

    <CheckoutPath activePath={2} />

    <div className="payment-container">
        <Link to="/order/confirm" className='payment-go-back'>Go Back</Link>
        <button className='payment-btn' onClick={()=>completePayment (orderItem?.total)}>
          Pay ({orderItem?.total})/-
        </button>
    </div>


    <Footer />
    
    
    </>
    
  )
}

export default Payment
