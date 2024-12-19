const Event = require('../model/Event')

const createEvent = async(req,res)=>{
    console.log(req.body);
    const event = await Event.create(req.body)
    res.status(200).json(event)
    
}

const fetchEvent = async(req,res)=>{
    try{
        const event = await Event.find()
        res.status(200).json(event)

    }
    catch(error){
        console.error("error in event",error);
        res.status(500).json({error:"failed to fetch events"})
    }
}


const fetchEventById = async(req,res)=>{
    try{
        const eventid = req.params.id
        const session = await Event.findById(eventid)
        console.log(session);
        res.status(200).json(session)
        
    }catch(error){
        console.error("Error fetching events:",error);
        res.status(500).json({error:"failed to fetch events"})
        
    }
}

const deleteEvent=async(req,res)=>{
    try{
        const eventid=req.params.id
        const session = await Event.findByIdAndDelete(eventid);
       
        res.status(200).json(session);
    }catch(error){
        console.error("error fetching events:",error);
        res.status(500).json({error:"failed to fetch events"});
    }
}


const updateEvent=async(req,res)=>{
    try{
        console.log('updated:')
        const eventid=req.params.id
        const session = await Event.findByIdAndUpdate(eventid,req.body,{new:true});
       
        res.status(200).json(session);
    }catch(error){
        console.error("error fetching events:",error);
        res.status(500).json({error:"failed to fetch events"});
    }
}


module.exports = {createEvent,fetchEvent,deleteEvent,fetchEventById,updateEvent}