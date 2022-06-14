import express from 'express';

const ordersRoute = express.Router();

ordersRoute.route('/')
.get((req:express.Request, res: express.Response)=>{
    res.send('Show all orders')
    // See all orders
})
.post((req:express.Request, res: express.Response)=>{
    // Create new Order
})


ordersRoute.route('/:id')
.get((req:express.Request, res: express.Response)=>{
    // Show order
})


export default ordersRoute;