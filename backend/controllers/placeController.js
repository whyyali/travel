const Place = require("../models/Place");

module.exports = {
    addPlaces: async (req, res, next) => {
        const { country_id, country, description, image, location, title, review, rating, latitude, longitude, } = req.body;

        try {
            const newPlace = new Place({
                country_id, country, description, image, location, title, review, rating, latitude, longitude
            })
            await newPlace.save()

            res.status(201).json({ status: true })
        } catch (error) {
            return next(error)
        }
    },

    getPlaces: async (req, res, next) => {
        try {
            const places = await Place.find({}, '_id review rating image title country_id location description latitude longitude country')

            res.status(201).json({ places })
        } catch (error) {
            return next(error)
        }
    },

    getPlace: async (req, res, next) => {
        const placeId = req.params.id
        try {
            const place = await Place.findById(placeId, { createdAt: 0, updatedAt: 0, __v: 0 })
            .populate({
                path: 'popular',
                select: 'title rating review image location'
            })
            res.status(201).json({ place })
        } catch (error) {
            return next(error)
        }
    },

    getPlacesByCountry: async (req, res, next) => {
        const countryId = req.params.id;

        try {
            const places = await Place.find({ country_id: countryId }, {updatedAt: 0, __v: 0});

            if (places.length === 0) {
                return res.status(200).json([])
            }

            res.status(200).json({ places });
        } catch (error) {
            return next(error);
        }
    },

    updatePlace: async (req, res, next) => {
        const placeId = req.params.id;
        const { country_id, country, description, image, location, title, review, rating, latitude, longitude } = req.body;

        try {
            const updatedPlace = await Place.findByIdAndUpdate(placeId, {
                country_id, country, description, image, location, title, review, rating, latitude, longitude
            }, { new: true });

            if (!updatedPlace) {
                return res.status(404).json({ message: "Place not found" });
            }

            res.status(200).json({ status: true, place: updatedPlace });
        } catch (error) {
            return next(error);
        }
    },

    deletePlace: async (req, res, next) => {
        const placeId = req.params.id;

        try {
            const deletedPlace = await Place.findByIdAndDelete(placeId);

            if (!deletedPlace) {
                return res.status(404).json({ message: "Place not found" });
            }

            res.status(200).json({ status: true });
        } catch (error) {
            return next(error);
        }
    }
}