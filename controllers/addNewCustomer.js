const Customer = require("../models/Customer");


const addNewCustomer = async (req,res) =>
{
    try
    {
        const newCustomer = new Customer({...req.body,owner: req.user._id} );
        await newCustomer.save();
        res.status(201).json(newCustomer);
    }
    catch(e)
    {
        res.status(500).json({ error: err.message });
    }
}

module.exports = addNewCustomer;