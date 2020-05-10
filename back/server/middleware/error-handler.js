
module.exports = function() {
    return function(err, req, res, next) {
        const statusCode = err.statusCode;

        switch(statusCode) {
        case 422: // Validation error
            if (err.details) {
                let messages = err.details.messages;
                for (let message in messages) {
                    let texts = messages[message];
                    for (let i = 0; i < texts.length; i++) {
                        if (!texts[i]) continue;
                        texts[i] = req.__(texts[i]);
                    }
                }
                err.message = req.__('invalidData');
                break;
            }
        default:
            if (statusCode >= 400 && statusCode < 500) {
                err.message = req.__(err.message);
            }
        }

        next(err);
    };
};
