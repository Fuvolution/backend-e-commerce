const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // This finds all categories and include their associated products! 
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name'],
      },
    ],
  })
  .then((categories) => {
    res.json(categories);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // This finds one category by its  `id` value and include its associated Product!
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name'],
      },
    ],
  })
  .then((category) => {
    if(!category){
      res.status(404).json({ message: `Category not found`})
    }
    res.json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // This create a new Category
  Category.create({
    category_name: req.body.category_name
  })
  .then((category) => {
    res.status(201).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  }); 
});

router.put('/:id', (req, res) => {
  // This update a Category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then((updatedCategory) => {
    if(!updatedCategory){
      return res.status(404).json({ message: `Category not found`});
    }
    res.status(201).json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // This delete a category by its `id` value
  Category.delete(req.body, {
    where: { id: req.params.id }
  })
  .then((deletedCategory) => {
    if(!deletedCategory){
      return res.status(404).json({ message: `Category not found`});
    }
    res.status(201).json(deletedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
