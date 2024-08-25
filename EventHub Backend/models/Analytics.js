const mongoose = require('mongoose');
const Event = require('./Event'); // Assuming Event model is in the same directory
const Ticket = require('./Ticket');
const Payment = require('./Payment');
const Registration = require('./Registration');

const analyticsSchema = new mongoose.Schema({
  total_events: { type: Number, default: 0 },
  total_sales: { type: Number, default: 0 },
  total_discounts: { type: Number, default: 0 },
  sold_tickets: { type: Number, default: 0 },
  upcoming_events: { type: Number, default: 0 },
  total_revenue: { type: Number, default: 0 },
  new_registrations: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

// Static method to calculate and update analytics
analyticsSchema.statics.calculateAndUpdate = async function() {
  const analytics = await this.findOne() || new this();

  // Calculate total events
  analytics.total_events = await Event.countDocuments();

  // Calculate total sales (sum of all completed payment amounts)
  analytics.total_sales = await Payment.aggregate([
    { $match: { status: 'Completed' } },
    { $group: { _id: null, totalSales: { $sum: "$amount" } } }
  ]).then(res => res[0]?.totalSales || 0);

  // Calculate total discounts (if you have a discount field, otherwise you can calculate based on original prices vs sales)
  analytics.total_discounts = 0; // Placeholder, customize based on your logic

  // Calculate sold tickets
  analytics.sold_tickets = await Ticket.countDocuments();

  // Calculate upcoming events (events with a future start date)
  analytics.upcoming_events = await Event.countDocuments({ date_from: { $gte: new Date() } });

  // Calculate total revenue (same as total sales in this example)
  analytics.total_revenue = analytics.total_sales;

  // Calculate new registrations (e.g., registrations within the last 30 days)
  analytics.new_registrations = await Registration.countDocuments({
    registered_at: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) }
  });

  // Save the updated analytics
  await analytics.save();

  return analytics;
};

const Analytics = mongoose.model('Analytics', analyticsSchema);
module.exports = Analytics;
