

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/order", orderController.createOrder);
router.get("/order/:id", orderController.getOrder);
router.put("/order/:id", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;