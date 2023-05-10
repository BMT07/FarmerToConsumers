const asyncHandler = require('express-async-handler')
const Product = require('../models/Product');


const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, productId } = req.body;
    try {
        const product = await Product.findById(productId);
        let alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString());
        if (alreadyRated) {
            const updateRating = await Product.updateOne({
                ratings: { $elemMatch: alreadyRated }

            }, {
                $set: { "ratings.$.star": star }
            }, {
                new: true
            });

        } else {
            const rateProduct = await Product.findByIdAndUpdate(productId, {
                $push: {
                    ratings: {
                        star: star,
                        postedBy: _id
                    }
                }
            }, {
                new: true
            });
        }
        const getAllratings = await Product.findById(productId);
        let totalRating = getAllratings.ratings.length;
        let ratingsum = getAllratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(productId, {
            totalrating: actualRating
        }, {
            new: true
        });
        res.json(finalproduct)
    } catch (error) {
        throw new Error(error);
    }


})

module.exports = { rating }