import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance  } from "../server.js";
import crypto from "crypto";

export const processPayment = handleAsyncError(async (req, res, next) => {
    const options = {
        amount:Number( req.body.amount*100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order
    });
});


// Send API Key

export const sendAPIKey = handleAsyncError(async (req, res, next) => {
   res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    });
});



// Payment Verification

export const paymentVerification = handleAsyncError(async (req, res, next) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "No payment data received"
        });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body)
        .digest("hex");
        

    if (expectedSignature === razorpay_signature) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false });
    }
});
