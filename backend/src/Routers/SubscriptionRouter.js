import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js'
import { User } from '../models/User.model.js';
import { Subscription } from '../models/Subscription.model.js';


const SubscriptionRouter = express.Router()

SubscriptionRouter.post('/api/subscribe/:channelId', AuthCheck, async (req, res) => {
    try {
        const user = req.user;
        const channelId = req.params.channelId;
        let message;


        if (!channelId) {
            return res.json({
                message: "Channel ID is undfined"
            })
        }

        const channel = await User.findById(channelId);
        if (!channel) {
            return res.status(404).json({
                message: 'Can"t Find the Channel'
            })
        };

        if (channel._id.toString() == user._id.toString()) {
            return res.status(500).json({
                message: "You cant Subscribe yourself"
            })
        }
        // Cheacking wather already subsciber or not ??
        const ExistingSubsCription = await Subscription.find({
            Subscriber: user._id,
            channel: channel._id
        })
        console.log(ExistingSubsCription)

        if (ExistingSubsCription.length == 0) {
            const subscribeObj = new Subscription({
                Subscriber: user._id,
                channel: channel._id
            })
            await subscribeObj.save();
            message = "subscribed"

        } else if(ExistingSubsCription) {
           
            await Subscription.findByIdAndDelete(ExistingSubsCription[0]?._id)
            // console.log(ExistingSubsCription._id)
            message = "Unsubscribed"
        }



        res.status(201).json({
            message: message
        })
    } catch (error) {
        console.log(error)
        res.status(error.statusCode || 400).json({
            message: error.message
        })
    }
})

SubscriptionRouter.get('/api/subscribers/channel/:channelId',AuthCheck,async (req,res) => {
    try {
        const channelId = req.params.channelId;
        const subscibers = await Subscription.find({
          channel:channelId  
        })
        let data;
        data=`Total Subsciber of this channel is ${subscibers.length}`;
        let allIdsOfsubscriber =[];
        subscibers.forEach((data)=>{
            allIdsOfsubscriber.push(data.Subscriber)
        })


        console.log(allIdsOfsubscriber)
        
       
       res.status(200).json({
        data:data,
       }) 
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
SubscriptionRouter.get('/api/channels/mysubscriptions',AuthCheck,async (req,res) => {
    try {
        const user = req.user;
        const channles = await Subscription.find({
            Subscriber:user._id
        })
        let Ids_Arrays = [];

        channles.forEach((data)=>{
            Ids_Arrays.push(data.channel)
        })
        console.log(Ids_Arrays);

        const channlesDetails = await User.find({
                _id:{$in:Ids_Arrays}
        })

        console.log(channlesDetails)
        res.status(201).json({
            message:"Found",
            data:channles
        })
    } catch (error) {
        
    }
})
export { SubscriptionRouter }