const express = require("express");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

const Income = mongoose.model("Income");

const router = express.Router();

router.get("/incomes/id", auth, async (req, res) => {
    try{
        const userId = req.user._id;
        const income = await Income.find({userId});
        res.send(income);
    }catch(err){
        res.status("401").send("Error: Something went wrong!");
    }
})

router.post("/incomes/id", auth, async (req,res) => {
    try{
        const { type, amount, validityNumber, validityType, description } = req.body;
        const income = new Income({ type, amount, validityNumber, validityType, description, userId: req.user._id });
        await income.save();
        res.send("Income Saved " + income);
    }catch(err){
        res.status("401").send("Error: Something went wrong!");
    }
})

module.exports = router;