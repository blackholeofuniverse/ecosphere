import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredusers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredusers);

    } catch (error) {
        console.log("Error in get users for sidebar controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: userToChat },
                { senderId: userToChat, receiverId: senderId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const { text, image } = req.body;

        let imageUrl;

        if (image) {
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}