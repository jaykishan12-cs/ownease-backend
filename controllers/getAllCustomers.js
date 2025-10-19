const Customer = require("../models/Customer");


const getAllCustomers = async (req,res) =>
{
    try
    {
        const customers = await Customer.find({ owner: req.user._id });

        res.json(customers);
    }
    catch(e)
    {
        res.status(500).json({ e: err.message });
    }
}

module.exports = getAllCustomers;