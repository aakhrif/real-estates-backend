const Property = require('../models/Property');
const { body, validationResult  } = require('express-validator');

exports.searchForProperties = async (req, res) => {
    try {
        const validateSearchParameters = [
            body('name').optional().isString(),
            body('description').optional().isString(),
            body('location.city').optional().isString(),
            body('location.postalCode').optional().isString()
        ];

        await Promise.all(validateSearchParameters.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const query = {};

        if (req.body.name) {
            query.name = req.body.name;
        }

        if (req.body.description) {
            query.description = req.body.description;
        }

        if (req.body.location && req.body.location.city) {
            query['location.city'] = { $regex: `^${req.body.location.city}`, $options: 'i' };
        }

        if (req.body.location && req.body.location.postalCode) {
            query['location.postalCode'] = req.body.location.postalCode;
        }
        
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllProperties = (req, res) => {
    Property.find()
        .then((properties) => {
            res.json(properties);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

// Create a new content
exports.create = (req, res) => {
    const { name, description, location, price, bedrooms, bathrooms,
        size, amentities, images, contact } = req.body;
    const newProperty = new Property({
        name, description, location,
        price, bedrooms, bathrooms, size, amentities, images, contact
    });
    newProperty.save()
        .then((savedProperty) => {
            res.status(201).json(savedProperty);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while saving the property.' });
        });
};

// Update an existing content
exports.update = (req, res) => {
    const { id } = req.params;
    const { name, description, location, price, bedrooms, bathrooms,
        size, amentities, images, contact } = req.body;
    Property.findByIdAndUpdate(id, {
        name, description, location,
        price, bedrooms, bathrooms, size, amentities, images, contact
    }, { new: true })
        .then((updatedProperty) => {
            if (!updatedProperty) {
                return res.status(404).json({ error: 'Property not found.' });
            }
            res.json(updatedProperty);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while updating the property.' });
        });
};

// Delete an existing content
exports.delete = (req, res) => {
    const { id } = req.params;
    Property.findByIdAndDelete(id)
        .then((deletedProperty) => {
            if (!deletedProperty) {
                return res.status(404).json({ error: 'Property not found.' });
            }
            res.json({ message: 'Property deleted successfully.' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while deleting the property.' });
        });
};