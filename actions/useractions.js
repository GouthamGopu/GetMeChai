"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { notFound } from "next/navigation";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message });

  return x;
};

export const fetchuser = async (username) => {
  await connectDB()
  let u = await User.findOne({ username: username })
  let user = u.toObject({ flattenObjectIds: true })
  return user
}

export const fetchpayments = async (username) => {
  await connectDB()
  let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(7).lean()
  return p
}


export const updateProfile = async (data, oldusername) => {
  await connectDB();

  // Check if data is already an object
  let ndata;
  if (data instanceof Object && !Array.isArray(data)) {
    ndata = data;
  } else {
    console.error("Expected data to be an object, but received:", data);
    return { error: "Invalid data format" };
  }

  // Check if the username needs to be updated and if it's unique
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    // Update user profile
    await User.updateOne({ email: ndata.email }, ndata);
    await Payment.updateMany({to_user: oldusername},{to_user: ndata.username})
  }
  else{
    // Update user profile
    await User.updateOne({ email: ndata.email }, ndata);

  }
};

export const checkUser = async (username) => {
  await connectDB();
  let u = await User.findOne({ username });

  if (!u) {
    return notFound();
  }
};
