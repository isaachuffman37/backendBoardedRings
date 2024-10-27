const { body, param, validationResult } = require('express-validator')

const emptyMessage = "Value is empty";
const stringMessage = "Value is not a string";
const emailMessage = "Value not in email format";
const phoneMessage = "Value is not a mobile phone format"


const buyerValidationRules = () => {
  return [
    
    body('email').notEmpty().withMessage(emptyMessage).isEmail().withMessage(emailMessage),
    
    body('firstName').notEmpty().withMessage(emptyMessage).isString().withMessage(stringMessage),

    body('lastName').notEmpty().withMessage(emptyMessage).isString().withMessage(stringMessage),

    body('phoneNumber').notEmpty().withMessage(emptyMessage).isMobilePhone().withMessage(phoneMessage),
  ]
}

const ringDeleteValidationRules = () => {
  return [
    param('id').isString().withMessage(stringMessage),
  ]
}

const buyerPutValidationRules = () => {
  return [
    param('id').isString().withMessage(stringMessage),
    
    body('email').optional().isEmail().withMessage(emailMessage),
    
    body('firstName').optional().isString().withMessage(stringMessage),

    body('lastName').optional().isString().withMessage(stringMessage),

    body('phoneNumber').optional().isMobilePhone().withMessage(phoneMessage),
  ]
}

// firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     phoneNumber: req.body.phoneNumber

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  buyerValidationRules,
  buyerPutValidationRules,
  ringDeleteValidationRules,
  validate,
}