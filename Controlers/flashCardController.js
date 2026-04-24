const dbconnect = require("../config/dbconnect");
const Deck = require("../model/deckModel");
const flashCard = require("../model/flashCardModel");

exports.createFolder = async(req,res) => {
    const {userId,title} = req.body;
    if(!title){
        return res.status(400).json("title nahi aaya");
    }
    if(!req.user.id){
        return res.status(400).json("id nahi aaya");
    }


    const newUser = Deck({
        title,
        userId:req.user.id
    })
    await newUser.save();
    
    return res.status(200).json({message:"folder created successfully"});
}

// exports.createFlashcards = async(req,res) => {
//     const {question,answer,deckId,userId} = req.body;
//     const newUser = flashCard({
//         question,
//         answer,
//         deckId,
//         userId
//     })
//     await newUser.save();
// }
exports.getFolder = async (req,res) =>{
    const folder = await Deck.find({userId:req.user.id});
    res.json(folder);
}