const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteRoutes');
const dominioRoutes = require('./routes/dominioRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const planoRoutes = require('./routes/planoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// Protege as rotas a seguir com autenticação e autorização
app.use('/api', authMiddleware);

app.use('/api/cliente', clienteRoutes);
app.use('/api/dominio', dominioRoutes);
app.use('/api/pagamento', pagamentoRoutes);
app.use('/api/plano', planoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
