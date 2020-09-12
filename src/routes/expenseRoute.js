const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const Expense = mongoose.model("Expense");

const router = express.Router();

router.get("/expenses/id", auth, async (req, res) => {
    try{
        const userId = req.user._id;
        const expense = await Expense.find({userId});
        res.send(expense);
    }catch(err){
        res.status("401").send("Error: Something went wrong!");
    }
})

router.post("/expenses/id", auth, async (req,res) => {
    try{
        const { type, amount, description } = req.body;
        const expense = new Expense({ type, amount, description, userId: req.user._id });
        await expense.save();
        res.send("Expense Saved " + expense);
    }catch(err){
        res.status("401").send("Error: Something went wrong!");
    }
})

module.exports = router;