const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    type: {
        type: "String",
        required:true
    },
    amount: {
        type: "Number",
        required:true
    },
    description: {
        type: "String"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;