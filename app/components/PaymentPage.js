"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchpayments } from '@/actions/useractions'
import { fetchuser } from '@/actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {

  const [paymentForm, setPaymentForm] = useState({ name: "", message: "", amount: "" })
  const [currentuser, setCurrentuser] = useState({})
  const [payments, setPayments] = useState([])
  const searchparams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchparams.get("paymentdone") === "true") {
      toast.success('Thanks For Your Donation!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      router.push(`/${username}`)
    }
  }, [])



  const getData = async () => {
    let u = await fetchuser(username)
    setCurrentuser(u)
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
  }

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }
  const pay = async (amount) => {
    // Check if both name and message fields are filled
    if (!paymentForm.name || !paymentForm.message) {
      alert('Please enter both name and message');
      return;
    }

    const keyId = currentuser.razorpayid;

    if (!keyId) {
      throw new Error("Razorpay `key_id` is mandatory. Ensure it's defined in your environment variables.");
    }

    try {
      // Wait for the initiate function to complete and return the order
      let a = await initiate(amount, username, paymentForm);
      let orderId = a.id;


      var options = {
        "key": keyId,
        "amount": amount,
        "currency": "INR",
        "name": "Get Me Chai",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId,  // This should now have the correct value
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": {
          "name": "Goutham",
          "email": "gopugoutham3@gmail.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };





  return (
    <>
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="bg-cover relative w-full">
        <img className='object-cover w-full h-[400px]' src={currentuser.coverPic ? currentuser.coverPic : '/cover1.jpg'}
          alt="" />
        <div className='size-20 md:size-32 object-center absolute mx-auto right-0 left-0 -bottom-12 md:-bottom-16 border-2 overflow-hidden border-solid border-red-400 rounded-full bg-black'>
          <img className='object-cover size-20 md:size-32 border-solid border-red-400 rounded-full' src={currentuser.profilePic ? currentuser.profilePic : "/profile.png"}
            alt="" />
        </div>
        <div className="w-full h-[1px] bg-red-400 opacity-1"></div>
      </div>
      <div className="info flex items-center justify-center py-20 flex-col gap-2">
        <h1 className='text-xl font-bold text-center'>
          {username}
        </h1>
        <div>
          <p className='text-sm text-center text-slate-300'>
            Lets help {username} get a chai!
          </p>
        </div>
        <div>
          <p className='text-sm text-center text-slate-400'>
           {payments.length == 0 && "No supporters yet ☹"}
            {payments.length} Payments &middot; ₹{payments.reduce((a, b) => a + Number(b.amount), 0)} raised
          </p>
        </div>
      </div>

      <div className="payment flex flex-col-reverse md:flex-row  container mt-6 mb-12 px-5 md:px-0 md:w-3/4 md:mx-auto gap-6">
        <div className="supporters w-full bg-slate-800/40 rounded-lg backdrop-blur-sm h-[24rem] p-5 md:p-10 overflow-y-auto">
          <h1 className='text-xl text-center font-semibold cursor-pointer mb-4'>Supporters</h1>
          <ul className='flex flex-col gap-2 '>
            {payments.length == 0 && <li> No Payments Yet</li>}
            {payments.map((p, i) => {
              return <li key={i} className=''><span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span></li>
            })}
          </ul>
        </div>
        <div className="makePayment w-full bg-slate-800/40 rounded-lg backdrop-blur-sm p-10 flex-col flex items-center justify-center">
          <h1 className='text-xl font-semibold cursor-pointer mb-4'>Make Payment</h1>
          <input
            type="text"
            name="name"
            id="name"
            value={paymentForm.name || ''}
            placeholder='Enter Your Name'
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 mb-3 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="message"
            id="message"
            value={paymentForm.message || ''}
            placeholder='Enter Your Message'
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            id="amount"
            value={paymentForm.amount || ''}
            placeholder='Enter Amount'
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 mb-3  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={handleChange}
          />

          <button
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg mb-3  text-sm w-full py-2.5 text-center disabled:from-green-100"
            disabled={paymentForm.amount?.length == 0}
            onClick={() => {
              pay(Number.parseInt(paymentForm.amount) * 100)
              if (paymentForm.name?.length > 2 && paymentForm.amount?.length == 0) {
                alert('Please Enter Amount');
              }
            }}
          >
            Pay
          </button>

          <div className="amounts flex gap-2">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                setPaymentForm({ ...paymentForm, amount: 10 });
                // pay(1000)
              }}
            >
              ₹10
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                setPaymentForm({ ...paymentForm, amount: 50 });
                // pay(5000)
              }}
            >
              ₹50
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                setPaymentForm({ ...paymentForm, amount: 100 });
                // pay(10000)
              }}
            >
              ₹100
            </button>

          </div>
        </div>


      </div>
    </>
  )
}

export default PaymentPage
