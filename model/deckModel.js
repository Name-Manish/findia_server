const mongoose = require("mongoose");
const User = require("./userModel");

const deckSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const Deck = mongoose.model("deck",deckSchema);

module.exports = Deck;