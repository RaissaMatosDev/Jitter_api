const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Rotas dos endpoints
router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;