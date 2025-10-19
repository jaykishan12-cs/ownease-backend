const Customer = require("../models/Customer");


const getDueCustomerByMonth = async (req,res) =>
{
    try
    {
        const month = parseInt(req.query.month);
        const year  = parseInt(req.query.year);

        if(!month ||!year)
        {
            return res.status(400).json({
                success: false,
                message: "Please provide month and year as query parameters (e.g. ?month=10&year=2025)"
            });
        }

        //calculating the month from user
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);



        const dueCustomers = await Customer.find({
            owner: req.user._id, // only show the logged-in user's customers
            "amcHistory.serviceDates": {
                $elemMatch: {
                $gte: startOfMonth,
                $lte: endOfMonth,
                },
            },
        });


        res.status(200).json({
            success: true,
            count: dueCustomers.length,
            month,
            year,
            dueCustomers
        });
            
    }
    catch(e)
    {
         console.error("Error fetching due customers:", e);
         res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = getDueCustomerByMonth;