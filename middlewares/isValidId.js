const {isValidObjectId} = require('mongoose');

const HttpError = require('../helpers/HttpError')

const isValidId = (req,res,next) => {
    const {noticeId} = req.params;
    if(!isValidObjectId(noticeId)) 
        return next(HttpError(404))
    
    next()
}

module.exports = isValidId;