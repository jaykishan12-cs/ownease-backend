const express = require("express");
const router = express.Router();
const auth = require("../middlewares/test-user");


const getAllCustomers = require("../controllers/getAllCustomers");
const addNewCustomer = require("../controllers/addNewCustomer");
const deleteCustomer = require("../controllers/deleteCustomer");
const getCustomerByID = require("../controllers/getCustomer");
const getDueCustomerByMonth = require("../controllers/getDueCustomerByMonth");
const searchCustomer = require("../controllers/searchCustomer");
const register = require("../controllers/register");
const login = require("../controllers/login");
//amc routes
const addAmc = require("../controllers/addAmc");



// customer related routes
router.get("/customers",auth,getAllCustomers);
router.post("/new",auth,addNewCustomer);
router.get("/due",auth,getDueCustomerByMonth);
router.get("/search",auth,searchCustomer);
router.delete("/:id",auth,deleteCustomer);
router.get("/:id",auth,getCustomerByID);
router.post("/:id/addamc",auth,addAmc);


module.exports = router;

