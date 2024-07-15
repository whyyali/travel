const User = require("../models/User");

module.exports ={
    deleteUser: async(req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({status: true, message: "User successfully deleted"})
        } catch (error) {
            return next(error)
        }
    },

    getUser: async(req, res, next) => {
        const user_id = req.user.id;

        try {
            const user = await User.findById({_id: user_id}, {password: 0, __v: 0, createdAt: 0, updatedAt: 0 })
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            const userData = {
                _id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile
            };

            res.status(200).json(userData);

        } catch (error) {
            return next(error)
        }
    }
}