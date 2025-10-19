const Customer = require("../models/Customer");


const deleteCustomer = async (req,res) =>
{
    try
    {
        const { id } = req.params;
        
        const deletedCustomer = await Customer.findOneAndDelete({
            _id: id,
            owner: req.user._id
        });

        if (!deletedCustomer) {
             return res.status(404).json({ message: "Customer not found or not authorized" });
        }
        res.json({"msg":"deleted successfully"});
    }
    catch(e)
    {
        res.status(500).json({ error: e.message });
    }
}

module.exports = deleteCustomer;