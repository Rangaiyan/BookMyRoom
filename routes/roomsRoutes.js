const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({rooms});
  } catch (error) {
    res.status(404).json({ message: "Sorry, try again later." });
  }
});


router.post("/getroombyid", async (req, res) => {
   const roomid=req.body.roomid
  try {
    const room = await Room.findOne({_id:roomid});
    return res.json({room});
  } catch (error) {
    res.status(404).json({ message: "Sorry, try again later." });
  }
});


router.post("/addroom",async(req,res)=>{
  try{
const newroom=new Room(req.body)
await newroom.save()
res.send('New ROoom added successfully')
  }catch(error){
return res.status(404).json({error})
  }
})

module.exports = router;