// setup
require("dotenv").config();
const express = require("express");
const app = express();
const {crews , shifts} = require('./data.js');

//middlewares
app.use(express.json());

const logger = (req , res , next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const path = req.originalUrl;
    const ip = req.ip;
    console.log(
        `[${timestamp}] ${method} ${path} - ip: ${ip}`
    );
    next();
};
app.use(logger);
//[Get] A Crews
app.get("/api/v1/crews" ,(req , res) =>{ 
    res.status(200).json({
        message: "Get All Crews Successflly",
        data : crews
    })

});
//[Get] signale Crew Member By id
app.get("/api/v1/crews/:id" ,(req , res) =>{
    const id = +req.params.id;
    const crew = crews.find(e => e.id ===id);

    if(!crew){
    return res.status(404).json({
            message : "This Crews Does not Exist",
            data : null
        });
    }
    res.status(200).json({
        message : "Get Crews By ID Successfully",
        data : crew
    });
});
//[Post] (Create New Crew Member)
app.post("/api/v1/crews" , (req , res) =>{
    const {name , role} = req.body;

    const data = {
        id : new Date()
        .getTime(),
        name ,
        role
    };
    crews.push(data);

    res.status(201).json({
        message : "Creat New Crews Successfully",
        data : data
    });
});

//[Put] Update the Crew
app.put("/api/v1/crews/:id" , (req , res) =>{
    const id = +req.params.id;
    const crew = crews.find(e => e.id === id);

if (!crew){
    return res.status(404).json({
        message : "This User Does not Exist",
        data : null
    });
}
const {name , role} = req.body;
crew.name = name;
crew.role = role;
res.status(201).json({
    message: "Update User sccessfully",
    data : crew
})
});

//[Delete] Delete The Member from crews
app.delete("/api/v1/crews/:id", (req, res) => {
    const id = +req.params.id;
    const index = crews.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Member not found",
            data: null
        });
    }

    crews.splice(index, 1); 
    res.status(200).json({ 
        message: "Delete The Member Successfully",
        data: null
    });
});
//------------------------------------------------------
//[Get] Get All Shifts
app.get("/api/v1/shifts" , (req , res) =>{
    res.status(200).json({
        message : "Get All The Shifts",
        data : shifts
    })
});

//[Get] Get Single shifts By ID
app.get("/api/v1/shifts/:id" , (req , res) =>{
    const id = +req.params.id;
    const shift = shifts.find(s => s.id === id);

    if(!shift){
        return res.status(404).json({
            message : "shift not found",
            data : null
        })
    }
    res.status(200).json({
        message : "Get shifts successfully",
        data  : shift
    })
});

//[Post] Create New Sheits
app.post("/api/v1/shifts" , (req , res) =>{
    const {crewId, berth, startsAt, endsAt} = req.body;
    const newShift = {
        id : new Date().getTime(),
        crewId,
        berth,
        startsAt,
        endsAt
    };
    shifts.push(newShift);
    res.status(201).json({
        message : "Create New Member",
        data : newShift
    });
});

//[put] Update the shifts
app.put("/api/v1/shifts/:id" , (req , res) =>{
    const id = +req.params.id;
    const shift = shifts.find(s => s.id === id);
    if(!shift){
        return res.status(404).json({
            message : "This User Does not Exist",
            data : null
        })
    }
    const {crewId, berth, startsAt, endsAt} = req.body;
    shift.crewId = crewId;
    shift.berth = berth;
    shift.startsAt = startsAt;
    shift.endsAt = endsAt;
    res.status(201).json({
        message : "Update User sccessfully",
        data : shift
    })
});

app.delete("/api/v1/shifts/:id", (req, res) => {
    const id = +req.params.id;
    const index = shifts.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Member not found",
            data: null
        });
    }

    shifts.splice(index, 1); 
    res.status(200).json({ 
        message: "Delete The Member Successfully",
        data: null
    });
});

const PORT =process.env.port

app.listen(PORT, () => {
    console.log(` HarborStack API is live at http://localhost:${PORT}`);
});