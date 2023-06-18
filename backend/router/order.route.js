import express from 'express';
const orderRoute = express.Router();
import orderModel from '../model/order.model';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KtVxhSAIlAmsg9ER2usF0pyzuLnlfKvPkdDLN1melVKcWAqbfgmF0qqmU3X0oMs5Sv9SnoHt2LhJu3x43JYyudQ00yIyjAl6r');
import { v4 as uuidv4 } from 'uuid';

orderRoute.post('/placeOrder', async (req, res) => {
    const { token, total, loginUser, cartproducts } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        console.log(customer);

        const payment = await stripe.paymentIntents.create({
            customer: customer.id,
            amount: total * 100,
            currency: 'INR',
            receipt_email: token.email,
            payment_method_types: ['card'],
        }, {
            idempotencyKey: uuidv4()
        })
        console.log(payment);

        if (payment) {
            const newOrder = new orderModel({
                name: loginUser.username,
                email: loginUser.email,
                userId: loginUser._id,
                orderItems: cartproducts,
                shippingAddress: {
                    street: token.card.address_line_1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                orderAmount: total,
                transactionId: payment.id
            })
            newOrder.save();
            console.log(newOrder);

            res.send('Payment processed successfully. Order Placed!');
        } else {
            res.send('Payment failed');
        }

    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong. Please retry again.' + error
        })
    }
})

orderRoute.get('/get-user-orders/:userID', async (req, res) => {
    // const { userId } = req.body;
    try {
        const orders = await orderModel.find({ userId: req.params.userID })
        console.log(orders)
        res.send(orders);
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }

})

orderRoute.get('/get-all-orders', async (req, res) => {

    try {
        const orders = await orderModel.find()
        res.send(orders);
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }

})


orderRoute.post('/deliver-order', async (req, res) => {
    const orderId = req.body.orderId;
    try {
        const order = await orderModel.findOne({ _id: orderId })
        order.isDelivered = true
        await order.save()
        res.send("Order delivered successfully");
    } catch (error) {
        return res.status(400).json({
            message: 'something went wrong' + error
        })
    }
})

orderRoute.get('/single-order/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderModel.findOne({ _id: id })
        if (order) {
            res.status(201).json({
                data: order,
                message: "data found successfully"
            })
        }
        else {
            res.status(400).json({
                message: "data not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

export default orderRoute;
