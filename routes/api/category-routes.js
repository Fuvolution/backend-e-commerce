const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // This finds all categories and include their associated products! 
  /*
  try{
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
  */
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
  // find one category by its `id` value
  // be sure to include its associated Products
  // This finds one category by its  `id` value and include its associated Product!
  /*
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!category){
      res.status(404).json({ message: `Category not found`});
      return 
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  */
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Category,
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
  // create a new category
  /*
  try{
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  */
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
  // update a category by its `id` value
  /* 
  try{
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  */ 
  Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then((updatedCategory) => {
    if(updatedCategory[0] === 0){
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
  // delete a category by its `id` value
  /*
  try{
    const deletedCategory = await Category.destroy(req.body, {
      where: { id: req.params.id },
    });
    res.json(deletedCategory);
  } catch (err) { 
    res.status(400).json(err); 
  }
  */
  Category.delete(req.body, {
    where: { id: req.params.id }
  })
  .then((deletedCategory) => {
    if(deletedCategory === 0){
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
