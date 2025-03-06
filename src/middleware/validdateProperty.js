const { body, validationResult } = require('express-validator');

const validateProperty = [
    body('propertyName')
        .trim()
        .notEmpty()
        .withMessage('Property name is required'),
    body('address')
        .trim()
        .notEmpty()
        .withMessage('Address is required'),
    body('costPerNight')
        .isNumeric()
        .withMessage('Cost per night must be a number')
        .isFloat({ min: 0 })
        .withMessage('Cost per night cannot be negative'),
    body('availableRooms')
        .isInt({ min: 0 })
        .withMessage('Available rooms must be a non-negative integer'),
    body('propertyImage')
        .trim()
        .notEmpty()
        .withMessage('Property image URL is required')
        .isURL()
        .withMessage('Invalid image URL'),
    body('averageRating')
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage('Rating must be between 0 and 5'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = validateProperty;
