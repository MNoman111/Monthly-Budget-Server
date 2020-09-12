const mongoose = require("mongoose")

const incomeSchema = mongoose.Schema({
    type: {
        type: "String",
        required:true
    },
    amount: {
        type: "Number",
        required:true
    },
    validityNumber: {
        type: "Number",
        required:true
    },
    validityType: {
        type: "String",
        required:true
    },
    description: {
        type: "String"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;