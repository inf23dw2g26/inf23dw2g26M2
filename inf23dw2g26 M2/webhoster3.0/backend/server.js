const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Cliente, Dominio, Pagamento, Plano } = require('./models');

const app = express();
app.use(bodyParser.json());

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

// Rotas para Clientes
app.get('/api/cliente', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

app.post('/api/cliente', async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.json(cliente);
});

app.put('/api/cliente/:id', async (req, res) => {
  await Cliente.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ success: 'Cliente updated' });
});

app.delete('/api/cliente/:id', async (req, res) => {
  await Cliente.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: 'Cliente deleted' });
});

// Rotas para Dominios
app.get('/api/dominio', async (req, res) => {
  const dominios = await Dominio.findAll();
  res.json(dominios);
});

app.post('/api/dominio', async (req, res) => {
  const dominio = await Dominio.create(req.body);
  res.json(dominio);
});

app.put('/api/dominio/:id', async (req, res) => {
  await Dominio.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ success: 'Dominio updated' });
});

app.delete('/api/dominio/:id', async (req, res) => {
  await Dominio.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: 'Dominio deleted' });
});

// Rotas para Pagamentos
app.get('/api/pagamento', async (req, res) => {
  const pagamentos = await Pagamento.findAll();
  res.json(pagamentos);
});

app.post('/api/pagamento', async (req, res) => {
  const pagamento = await Pagamento.create(req.body);
  res.json(pagamento);
});

app.put('/api/pagamento/:id', async (req, res) => {
  await Pagamento.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ success: 'Pagamento updated' });
});

app.delete('/api/pagamento/:id', async (req, res) => {
  await Pagamento.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: 'Pagamento deleted' });
});

// Rotas para Planos
app.get('/api/plano', async (req, res) => {
  const planos = await Plano.findAll();
  res.json(planos);
});

app.post('/api/plano', async (req, res) => {
  const plano = await Plano.create(req.body);
  res.json(plano);
});

app.put('/api/plano/:id', async (req, res) => {
  await Plano.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ success: 'Plano updated' });
});

app.delete('/api/plano/:id', async (req, res) => {
  await Plano.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: 'Plano deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
