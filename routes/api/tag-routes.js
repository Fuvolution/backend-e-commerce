const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name'],
      },
    ],
  })
  .then((tags) => {
    res.json(tags);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name'],
      },
    ],
  })
  .then((tag) => {
    if(!tag){
      res.status(404).json({ message: `Tag not found`})
    }
    res.json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tag) => {
    res.status(201).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  }); 
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then((updatedTag) => {
    if(!updatedTag){
      return res.status(404).json({ message: `Category not found`});
    }
    res.status(201).json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete(req.body, {
    where: { id: req.params.id }
  })
  .then((deletedTag) => {
    if(!deletedTag){
      return res.status(404).json({ message: `Category not found`});
    }
    res.status(201).json(deletedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
