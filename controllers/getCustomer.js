const Customer = require("../models/Customer");


const getCustomer = async (req,res) =>
{
    try
    {
        const id = req.params.id;

        const customer = await Customer.findOne({
            _id: id,
            owner: req.user._id
        });
        res.json(customer);
    }
    catch(e)
    {
        res.status(500).json({ error: e.message });
    }
}

module.exports = getCustomer;