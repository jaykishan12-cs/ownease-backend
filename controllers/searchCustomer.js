const Customer = require("../models/Customer");

const searchCustomer = async (req,res) =>
{
    try
    {    
        const query = req.query.query;
        
        if( !query ||  query.trim() === "")
        {
            return res.status(400).json({
                success: false,
                message: "Please provide a search query (e.g. ?query=raj)"
            });
        }


        const customers = await Customer.find({
        owner: req.user._id, // 
            $or: [
                { name: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { modelName: { $regex: query, $options: "i" } },
            ],
        });


        res.status(200).json({
            success: true,
            count: customers.length,
            customers
        });
    }
    catch(e)
    {
        console.error("Error in searchCustomers:", e);
        res.status(500).json({ success: false, message: "Server error" });
    }
    
}

module.exports = searchCustomer;