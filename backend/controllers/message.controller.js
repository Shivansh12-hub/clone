import Conversation from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";



export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const {message} = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // establishing the conversation if not started yet

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([
            conversation.save(),
            newMessage.save()
        ])

        // implement socket for real time data transfer
        // socker .io



        return res, status(200).json({
            newMessage,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const getMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;

        const conversation = await Conversation.find({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            return res.status(401).json({
                success: true, 
                message:[]
            })
        }
        return res.status(200).json({
            message: conversation?.message,
            success:true``
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}