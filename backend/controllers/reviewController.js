const Hotel = require("../models/Hotel");
const Review = require("../models/Review");

module.exports = {
    addReview: async (req, res, next) => {
        const user = req.user.id;
        const { place, review, rating } = req.body;

        try {

            const existingReview = await Review.findOne({ place, user })

            if (existingReview) {
                existingReview.review = review,
                existingReview.rating = rating

                await existingReview.save()
            } else {
                const newReview = new Review({
                    place, review, rating, user
                })

                await newReview.save()

                const hotel = await Hotel.findById(place)
                hotel.reviews.push(newReview._id)

                await hotel.save()
            }


            res.status(201).json({ status: true })
        } catch (error) {
            return next(error)
        }
    },

    getReviews: async (req, res, next) => {
        const placeId = req.params.id;

        try {
            const reviews = await Review.find({place: placeId})
            .populate({
                path: 'user',
                select: 'username profile'
            })

            res.status(200).json(reviews)
        } catch (error) {
            return next(error)
        }
    }
}