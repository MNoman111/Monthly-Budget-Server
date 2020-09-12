const mongoose = require("mongoose");

const CONNECTION_URL = "mongodb+srv://Noman:Misbah@cluster1.80vgd.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})