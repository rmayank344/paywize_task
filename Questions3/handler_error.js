const response_handler = require("./response_handler");

function handleCaught (res, err) {
    const message = `something error: ${err.message}`;
    return response_handler.send_error_handler(res, message, 500);
};

module.exports = handleCaught;


