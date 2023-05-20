 const { HttpError } = require("../helpers");
 const { validationResult } = require('express-validator');



    const validateBody = validations => {
        return async (req, res, next) => {
            
          for (const validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
          }
             

          const errors = validationResult(req);
          if (errors.isEmpty()) {
            return next();
          }
      
          next(HttpError(400, "Bad request"))
        };
      };


module.exports = validateBody;
