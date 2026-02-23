import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance  } from "../server.js";

export const processPayment = handleAsyncError(async (req, res, next) => {
    const options = {
        amount: req.body.amount,
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
        success: true,
        order,
    });
});