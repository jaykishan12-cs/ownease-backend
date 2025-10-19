const mongoose = require("mongoose");


// AMC sub-schema (embedded in customer)
const amcSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amcAmount: { type: Number, required: true },
  serviceDates: [Date], // 3 service dates per AMC
  status: { type: String, enum: ["Active", "Expired"], default: "Active" }
}, { _id: false });

// Main Customer schema
const customerSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  modelName: { type: String, required: true, trim: true },

  amcHistory: [amcSchema] // Array of all AMCs for this customer
}, { timestamps: true });

//pre clculation for intervlas
customerSchema.pre("save", function(next) {
  if (this.amcHistory && this.amcHistory.length > 0) {
    const latestAMC = this.amcHistory[this.amcHistory.length - 1];
    if (latestAMC.startDate) {
      latestAMC.serviceDates = [];
      const INTERVAL_MONTHS = 3;
      let date = new Date(latestAMC.startDate);

      for (let i = 1; i <= 3; i++) {
        let serviceDate = new Date(date);
        serviceDate.setMonth(date.getMonth() + INTERVAL_MONTHS * i);
        latestAMC.serviceDates.push(serviceDate);
      }

      // Set status Active
      latestAMC.status = "Active";
    }
  }
  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
