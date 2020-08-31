const mongoose = require("mongoose");


const Vote = require("../models/Vote");

const Pusher = require("pusher");

const keys = require("../config/keys");
var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    encrypted: keys.pusherEncrypted,
  });
module.exports={
    form:(req,res)=>{
        // validation of title by creating index and using if(err.code==1100)
        const{title,question,option}=req.body
        var choice=[];
        for (let index = 0; index < option.length; index++) {
            choice.push({opt:option[index]})
        }
        new Vote({title,question,choice})
            .save()
            .then((data)=>{
                res.redirect(`/poll/${data.title}`);
            })
            .catch(err=>{
                console.log(err);
            })
        // Vote.find().then((votes) => res.json({ success: true, votes: votes }));
    },
    pollget:(req,res)=>{
        Vote.findOne({title:req.params.title})
            .then((data)=>{
                if(!!data)
                {
                    return res.json({msg:'success',vote:data})
                }
                return res.status(404).json({msg:"not such poll existes"})
                
            })
            .catch((err)=>{
                // for server error
                return res.status(500).json({msg:"server errors"})
            })
    },
    pollpost:(req,res)=>{
        const{checked}=req.body;
        Vote.updateOne({'choice.opt':checked},{$inc:{"choice.$.vote":1}})
            .then(data=>{
                if(data)
                {
                    // pusher
                    return res.json({ success: true, message: "Thank you for voting" });
                }
                    return res.json({msg:'fail to update'});
            })
            .catch((err)=>{throw err});
    }
}