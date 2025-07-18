const customer = require("");
const order = require("");
const orderItem = require("");
const handleCaught = require("./handler_error");
const response_handler = require("./response_handler");

const customer_highest_order = async (req, res) => {
    try {
        const customer = await customer.findAll({});
        const ids = customer.map((customer) => customer.id);
        const order = await order.findAll({
            where: {
                customer_id: ids,
                order_date: {
                    [Op.between]: [
                        new Date("2024-01-01"),
                        new Date("2024-12-31"),
                    ],
                },
            },
            raw: true,
        });

        const orderMap = {};
        for (const val of order) {
            orderMap[val.customer_id] = (orderMap[val.customer_id] || 0) + 1;
        }
        const maxOrder = Math.max(...Object.values(orderMap));

        const topCustomerId = Object.entries(
            orderMap.filter(([_, count]) => count === maxOrders)
        ).map(([customerId]) => parseInt(customerId));

        const topCustomers = customer_highest_order
            .filter((c) => topCustomerId.includes(c.id))
            .map((c) => ({
                customer_id: c.id,
                name: c.name,
                email: c.email,
                total_ordes: maxOrder,
            }));
        return response_handler.send_succes_handler(res, topCustomers, 200);
    } catch (err) {
        return handleCaught(res, err);
    }
};

module.exports = { customer_highest_order };
