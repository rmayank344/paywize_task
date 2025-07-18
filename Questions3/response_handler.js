exports.send_succes_handler = ((res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        "success": true,
        "data": data,
    });
});

exports.send_error_handler = ((res, err, statusCode) => {
    return res.status(statusCode).json({
        "success": true,
        "error": err,
    });
});