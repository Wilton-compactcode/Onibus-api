const router = require('express').Router();
const mongoose = require('mongoose');

// Definição do esquema do Item (seu modelo)
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 200 },
  rg: { type: String, required: true, maxlength: 15 },
  days: { type: String, required: true, maxlength: 200 },
  event: { type: String, required: true, maxlength: 100 },
  observation: { type: String, required: true, maxlength: 200 },
});

// Modelo Item baseado no esquema
const Item = mongoose.model('Item', itemSchema);

// Listar todos os itens
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter os itens.' });
  }
});

// Obter um item específico pelo ID
router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Item não encontrado.' });
    } else {
      res.json(item);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter o item.' });
  }
});

// Excluir um item pelo ID
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      res.status(404).json({ message: 'Item não encontrado.' });
    } else {
      res.json({ message: 'Item excluído com sucesso.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir o item.' });
  }
});

// Criar um novo item
router.post('/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name.substring(0, 200),
    rg: req.body.rg.substring(0, 15),
    days: req.body.days.substring(0, 200),
    event: req.body.event.substring(0, 100),
    observation: req.body.observation.substring(0, 200),
  });

  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar o item.' });
  }
});

// Atualizar um item pelo ID
router.patch('/items/:id', async (req, res) => {
  const updatedData = {
    name: req.body.name.substring(0, 200),
    rg: req.body.rg.substring(0, 15),
    days: req.body.days.substring(0, 200),
    event: req.body.event.substring(0, 100),
    observation: req.body.observation.substring(0, 200),
  };

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedItem) {
      res.status(404).json({ message: 'Item não encontrado.' });
    } else {
      res.json(updatedItem);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar o item.' });
  }
});

module.exports = router;