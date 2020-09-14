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

router.delete("/expenses/id", auth, async (req,res) => {
    try{
        const { _id } = req.headers;
        const expense = await Expense.findOneAndDelete({_id, userId: req.user._id})
        if(!expense){
            return res.status(404).send()
        }
        res.send("Expense Deleted " + expense);
    }catch(err){
        res.status(500).send();
    }
})

router.patch( "/expenses/:id", auth, async (req,res) => {
    const { _id } = req.body;
    const body = req.body;
    const updates = Object.keys( body )

    try{
        const expense = await Expense.findOne( {_id, userId: req.user._id } );

        if(!expense){
            return res.status(404).send()
        }

        updates.forEach( (update) => expense[update] = body[update] )

        await expense.save()

        res.send(expense)

    }catch(e){
        res.status(500).send();
    }
} )

module.exports = router;