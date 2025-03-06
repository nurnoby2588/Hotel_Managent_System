const Property = require('../models/Property');

exports.createProperty = async (req, res, next) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllProperties = async (req, res, next) => {
    try {
        const properties = await Property.find();
        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        next(error);
    }
};

exports.getProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                error: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};