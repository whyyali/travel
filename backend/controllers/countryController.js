const Country = require("../models/Country");

module.exports = {
    addCountry: async (req, res, next) => {
        const { country, description, image, region, popular } = req.body;

        try {
            const newCountry = new Country({
                country, description, image, region, popular
            })

            await newCountry.save();
            res.status(201).json({ status: true })
        } catch (error) {
            return next(error)
        }
    },

    getCountries: async (req, res, next) => {
        try {
            const countries = await Country.find({}, { country: 1, _id: 1, image: 1, description: 1, region: 1})

            res.status(200).json({ countries })
        } catch (error) {
            return next(error)
        }
    },

    getCountry: async (req, res, next) => {
        const countryId = req.params.id
        try {
            const country = await Country.findById(countryId, { createdAt: 0, updatedAt: 0, __v: 0 })
                .populate({
                    path: 'popular',
                    select: 'title rating review image location description country_id'
                })

            res.status(200).json(country)
        } catch (error) {
            return next(error)
        }
    },

    addPlacesToCountry: async (req, res, next) => {
        const { countryId, placeId } = req.body;

        try {
            const country = await Country.findById(countryId);

            if (!country) {
                return res.status(404).json({ message: "Country not found" })
            }

            const index = country.popular.indexOf(placeId);

            if (index !== -1) {
                country.popular.splice(index, 1)
            } else {
                country.popular.push(placeId)
            }

            await country.save()

            res.status(200).json({status: true})
        } catch (error) {
            return next(error)
        }
    },

    updateCountry: async (req, res, next) => {
        const countryId = req.params.id;
        const { country, description, image, region, popular } = req.body;

        try {
            const updatedCountry = await Country.findByIdAndUpdate(
                countryId,
                { country, description, image, region, popular },
                { new: true }
            );

            if (!updatedCountry) {
                return res.status(404).json({ message: "Country not found" });
            }

            res.status(200).json({ status: true, country: updatedCountry });
        } catch (error) {
            return next(error);
        }
    },

    deleteCountry: async (req, res, next) => {
        const countryId = req.params.id || req.body._id;
        try {
            const deletedCountry = await Country.findByIdAndDelete(countryId);

            if (!deletedCountry) {
                return res.status(404).json({ message: "Country not found" });
            }

            res.status(200).json({ status: true, message: "Country deleted successfully" });
        } catch (error) {
            return next(error);
        }
    },
}