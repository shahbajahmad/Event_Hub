// routes/paymentRoutes.js
const express = require('express');
const {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require('../../controllers/paymentController');

const router = express.Router();

router.post('/', createPayment);
router.get('/', getPayments);
router.get('/:id', getPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;
