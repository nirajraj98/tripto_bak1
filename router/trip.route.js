const express=require("express")
// const {TripModel} =reuire("../model/trip.model")
const { TripModel } =require("../model/trip.model")

const tripRoute=express.Router()


tripRoute.get("/hotel",async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 8;
        const sort= req.query.price
        const skip = (page -1) * size;
        
        const total = await TripModel.find({category:"hotels"}).countDocuments();
        let trip=await TripModel.find({category:"hotels"}).sort({price : sort}).skip(skip).limit(size);
        
        res.json({
            records:trip,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// tripRoute.get("/hotel",async(req,res)=>{
//     const {limit=8,page=1}=req.query
//     const total = await TripModel.find({category:"hotels"}).countDocuments();
//     try{
//       let trip=await TripModel.find({category:"hotels"})
//       .limit(limit)
//       .skip((page-1)*limit)
     
//       res.send({trip,total})
//     }catch(err){
//         res.status(400).send(e.message)
//     }
// })

tripRoute.get("/hotel/:id",async(req,res)=>{


    try{
       const trip = await TripModel.findById({_id: req.params.id})
       res.status(200).json(trip)
    }catch(err){
        res.status(201).json(err)
    }
})
tripRoute.get("/",async(req,res)=>{
    try{
       const trip = await TripModel.find({category:"Overview"})
       res.status(200).json(trip)
    }catch(err){
        res.status(201).json(err)
    }
})

tripRoute.get("/trip",async(req,res)=>{
    try{
       const trip = await TripModel.find({category:"Trips"})
       res.status(200).json(trip)
       
    }catch(err){
        res.status(201).json(err)
    }
})

tripRoute.get("/place",async(req,res)=>{
    try{
       const trip = await TripModel.find({category:"Places"})
       res.status(200).json(trip)
    }catch(err){
        res.status(201).json(err)
    }
})

// tripRoute.get("/hotel",async(req,res)=>{
//     try{
//        const trip = await TripModel.find({category:"hotels"})
//        res.status(200).json(trip)
//     }catch(err){
//         res.status(201).json(err)
        
//     }
// })

tripRoute.get(":key",async(req,res)=>{
    let data= await TripModel.find({
        "$or":[
        {"category":{$regex:req.params.key}}
        ]
    
    })
})


tripRoute.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
       const newtrip = new TripModel(payload);
       await newtrip.save()
       res.status(200).json(newtrip)
      
    }catch(err){
        res.status(201).json(err)
    }
})

module.exports = tripRoute;