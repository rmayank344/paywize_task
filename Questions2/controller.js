const maxRequestTime = 60 * 60 * 1000;
const maxRequest = 50;
const myIP = new Map();

const customMiddleware = async (req, res, next) => {
    try {
        const Ip = req.ip || req.connection.remoteAddress;

        const currentTime = Date.now();

        let IpData = myIP.get(Ip);

        if (!IpData) {
            myIP.set(Ip, { count: 1, startTime: currentTime });
            return next();
        }
        const { count, startTime } = IpData;
        const leftTime = currentTime - startTime;
        if (leftTime < maxRequestTime) {
            if (count < maxRequest) {
                IpData.count += 1;
                myIP.set(Ip, IpData);
                return next();
            } else {
                return res.status(429).json({
                    success: false,
                    message: "Too many request.",
                });
            }
        } else {
            myIP.set(Ip, { count: 1, startTime: currentTime });
            return next();
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

module.exports = { customMiddleware };
