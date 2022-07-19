const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json())


app.post("/orders", async (req, res) => {
    try {

        const {description} = req.body;
        const newOrder = await pool.query('INSERT INTO orders (description) VALUES ($1) RETURNING *', [description]);
        res.json(newOrder.rows[0]);

    } catch (error) {
        console.log(error);
    }
})

app.get('/orders', async (req, res) => {
    try {
        const allOrders = await pool.query('SELECT * FROM orders');
        res.json(allOrders.rows)
    } catch (error) {
        console.log(error.message)
    }
})


app.get('/orders/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const order = await pool.query('SELECT * FROM orders WHERE order_id = $1', [id]);
        res.json(order.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

app.put("/orders/:id", async (req, res) => {
    try {

        const {id} = req.params;
        const {description} = req.body;
        const updateOrder = await pool.query('UPDATE orders set description = $1 WHERE order_id = $2', [
            description, id
        ])
        res.json('Updated');

    } catch (error) {
        console.log(error);
    }
});


app.delete('/orders/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteOrder = await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);
        res.json('Deleted');
    } catch (error) {
        console.log(error.message)
    }
})
app.listen(5002, () => {
    console.log("server is running")
});

