const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

/* Middleware */
app.use(express.json());

/* Sample Coffee Data */
let coffees = [
    {
        id: 1,
        name: "Latte",
        price: 199
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 219
    },
    {
        id: 3,
        name: "Espresso",
        price: 149
    }
];

/* Home Route */
app.get("/", (req, res) => {
    res.send("☕ Brew Haven API is Running...");
});

/* GET All Coffees */
app.get("/coffee", (req, res) => {
    res.json(coffees);
});

/* GET Coffee By ID */
app.get("/coffee/:id", (req, res) => {

    const coffee = coffees.find(
        c => c.id === parseInt(req.params.id)
    );

    if (!coffee) {
        return res.status(404).json({
            message: "Coffee not found"
        });
    }

    res.json(coffee);
});

/* POST New Coffee */
app.post("/coffee", (req, res) => {

    const { name, price } = req.body;

    /* Validation */
    if (!name || !price) {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }

    const newCoffee = {
        id: coffees.length + 1,
        name,
        price
    };

    coffees.push(newCoffee);

    res.status(201).json({
        message: "Coffee added successfully",
        coffee: newCoffee
    });
});

/* DELETE Coffee */
app.delete("/coffee/:id", (req, res) => {

    const coffeeId = parseInt(req.params.id);

    const coffee = coffees.find(c => c.id === coffeeId);

    if (!coffee) {
        return res.status(404).json({
            message: "Coffee not found"
        });
    }

    coffees = coffees.filter(c => c.id !== coffeeId);

    res.json({
        message: "Coffee deleted successfully"
    });
});

// ================= ORDERS =================

let orders = [];

// GET Orders
app.get("/orders", (req, res) => {

    res.status(200).json(orders);
});

// POST Order
app.post("/orders", (req, res) => {

    const { items } = req.body;

    if(!items || items.length === 0){

        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    const newOrder = {
        id: orders.length + 1,
        items
    };

    orders.push(newOrder);

    res.status(201).json({
        message: "Order placed successfully ☕"
    });
});

/* Start Server */
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});