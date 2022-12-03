const Joi = require('joi');
const logger = require('intel').getLogger('Users|Validation');

const schemaCreate = Joi.object({
    username: Joi.string().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).min(3).max(50)
        .required(),

    email: Joi.string().email().lowercase().required(),
});

const schemaUpdate = Object.assign(schemaCreate, {});
const schemaSignIn = Object.assign(schemaCreate, {});

function check(req, res, next, schema) {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        const { message } = validationResult.error;

        logger.error(message);

        return res.status(422).json({ error: message });
    }

    return next();
}

function validateCreate(req, res, next) {
    return check(req, res, next, schemaCreate);
}

function validatePatch(req, res, next) {
    return check(req, res, next, schemaUpdate);
}

function validateSignIn(req, res, next) {
    return check(req, res, next, schemaSignIn);
}

module.exports = { validateCreate, validatePatch, validateSignIn };
