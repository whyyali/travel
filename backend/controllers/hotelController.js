const Hotel = require("../models/Hotel");

module.exports = {
    addHotel: async (req, res, next) => {
        const { country_id, description, country, image, title, review, availability, coordinates, facilities, rating, price, contact, location } = req.body;
        try {
            const newHotel = new Hotel({ country_id, country, description, image, title, review, availability, coordinates, facilities, rating, price, contact, location })

            await newHotel.save();

            res.status(201).json({ status: true })
        } catch (error) {
            return next(error)
        }
    },

    getHotels: async (req, res, next) => {
        try {
            const hotels = await Hotel.find({}, '_id review image title country_id location description country availability coordinates facilities rating price contact')

            res.status(201).json({ hotels })
        } catch (error) {
            return next(error)
        }
    },

    getHotelsByCountry: async (req, res, next) => {
        const countryId = req.params.id;

        try {
            const hotels = await Hotel.find({ country_id: countryId })

            if (hotels.length === 0) {
               return res.status(200).json([])
            }

            res.status(200).json( hotels )

        } catch (error) {
            return next(error)
        }
    },

    getHotelById: async (req, res, next) => {
        const hotelId = req.params.id;

        try {
            const hotel = await Hotel.findById(hotelId)
            .populate({
                path: 'reviews',
                options: { sort:{ updatedAt: -1}, limit: 2},
                select: 'rating review updatedAt user',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'username profile'
                }
            })

            if (!hotel) {
               return res.status(404).json({status: false, message: "Hotel does not exist"})
            }

            res.status(200).json( hotel )

        } catch (error) {
            return next(error)
        }
    },

    updateHotel: async (req, res, next) => {
        const hotelId = req.params.id;
        const { country_id, description, country, image, title, review, availability, coordinates, facilities, rating, price, contact, location } = req.body;

        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
                country_id, description, country, image, title, review, availability, coordinates, facilities, rating, price, contact, location
            }, { new: true });

            if (!updatedHotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            res.status(200).json({ status: true, hotel: updatedHotel });
        } catch (error) {
            return next(error);
        }
    },

    deleteHotel: async (req, res, next) => {
        const hotelId = req.params.id;

        try {
            const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

            if (!deletedHotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            res.status(200).json({ status: true });
        } catch (error) {
            return next(error);
        }
    }

}