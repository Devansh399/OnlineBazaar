
const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');


// create a new order
const createOrder = async (req, res) => {
    
    try {

        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address || !paymentId) {
            return res.status(400).json({ message: "Invalid order data" });
        }else{
            
            // console.log(req.user);
        
            const order = new Order({
                user: req.user._id,                                 
                items,
                totalAmount,
                address,
                paymentId,
            });
            
            await order.save();
            const message=`Dear ${req.user.name},\n\nYour order has been successfully placed. Your order ID is ${order._id}\nTotal Amout: ${order.totalAmount}\nShipping Address:${order.address}\n\n We will notify you once your order is shipped.\n\nThank you for shopping with us!\n\nBest regards,\nOnline Bazaar Team`;
            
            await sendEmail({
                email: req.user.email,
                subject: 'Order Confirmation',
                message,
            });
            res.status(201).json({message: 'Order created successfully', order});
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// my orders

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price'); // Populate product details

        res.status(200).json({ message: 'My Orders', orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// get all orders (admin only)

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', ' _id name ');
        res.status(200).json({ message: 'All Orders', orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = status;
            await order.save();
            res.status(200).json({ message: 'Order status updated successfully', order });
        }
        else{
            res.status(404).json({ message: 'Order not found' });
        }

    } catch (error) {
        res.status(500).json({ message:'Error updating order status', error });
    } 
}



module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus   
};
