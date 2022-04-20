const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    //we could decide which attributes to show later on
    //do we want to use res.json or res.send?
    res.send(products);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy();
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
});
module.exports = router;
