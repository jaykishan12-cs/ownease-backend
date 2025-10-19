const Customer = require("../models/Customer");

const addAmc = async (req,res) =>
{
    try
    {    
        const {id} = req.params;
        const  {startDate, endDate, amcAmount}  = req.body;

        if (!startDate || !endDate || !amcAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const customer = await Customer.findOne({ _id: id, owner: req.user._id });

        if(!customer){
             return res.status(404).json({ message: "Customer not found or not authorized" });
        }

        customer.amcHistory.push({ startDate, endDate, amcAmount });
        await customer.save();

        res.status(201).json({
            message: "AMC added successfully",
            customer
        });


    
    }
    catch(e)
    {
         console.error("Error adding AMC:", e);
         res.status(500).json({ message: "Server error", error: e.message });
    }
    
}

module.exports = addAmc;