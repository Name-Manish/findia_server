const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
    question:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    },
    deckId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"deck"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const flashCard = mongoose.model("flashCard",flashcardSchema);

module.exports = flashCard;