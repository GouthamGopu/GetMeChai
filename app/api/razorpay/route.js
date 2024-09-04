import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDB();

  // Parse the form data
  let body = await req.formData();
  body = Object.fromEntries(body);

  // Find the payment in the database using the order ID
  let payment = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!payment) {
    return NextResponse.json({ error: "Order Id not found" }, { status: 404 });
  }


  // Retrieve the associated user
  let user = await User.findOne({ username: payment.to_user});
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const secret = user.razorpaysecret;

  // Validate the payment verification
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (isValid) {
    // Update the payment status in the database
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({ error: "Payment Verification Failed" }, { status: 400 });
  }
};
