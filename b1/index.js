const express = require('express');
const app = express();
const morgan = require("morgan");


app.use(morgan("combined"))

let products = [1, 2, 3];

app.get('/product', (req, res) => {
  res.status(200).json({ data: products});
});

app.post('/product', (req, res) => {
  res.status(201).json({ message: 'Create success'});
});

app.put('/product/:id', (req, res) => {
  const id = req.params.id;
  console.log(`ID tuong ung khi truyen vao: ${id}`);
  res.status(200).json({ message: 'Update success'});
});

app.delete('/product/:id', (req, res) => {
  const id = req.params.id;
  console.log(`ID tuong ung khi truyen vao: ${id}`);
  res.status(200).json({ message: 'Remove success'});
});

const port = 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
