const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/Stock_Manager", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connect("mongodb+srv://anmolrajverma:4b8TSofBIpQ8tF9D@cluster0.b3ekp.mongodb.net/stock_market?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const stockSchema = new mongoose.Schema({
    company: String,
    description: String,
    initial_price: Number,
    price_2002: Number,
    price_2007: Number,
    symbol: String,
});

const Stock = mongoose.model("stocks", stockSchema);
 
app.get("/api/stocks", async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/watchlist", async (req, res) => {
    try {
        const {
            company,
            description,
            initial_price,
            price_2002,
            price_2007,
            symbol,
        } = req.body;
        const stock = new Stock({
            company,
            description,
            initial_price,
            price_2002,
            price_2007,
            symbol,
        });
        await stock.save();
        res.json({ message: "Stock added to watchlist successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
