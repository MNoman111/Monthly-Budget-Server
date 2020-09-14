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

router.delete("/incomes/id", auth, async (req,res) => {
    try{
        const { _id } = req.headers;
        const income = await Income.findOneAndDelete({_id, userId: req.user._id})
        if(!income){
            return res.status(404).send()
        }
        res.send("Income Deleted " + income);
    }catch(err){
        res.status(500).send();
    }
})

router.patch( "/incomes/id", auth, async (req,res) => {
    const { _id } = req.body;
    const body = req.body;
    const updates = Object.keys( body );
    try{
        const income = await Income.findOne( {_id, userId: req.user._id } );
        if(!income){
            return res.status(404).send()
        }

        updates.forEach( (update) => income[update] = body[update] )

        await income.save()

        res.send(income)

    }catch(e){
        res.status(500).send();
    }
} )


module.exports = router;