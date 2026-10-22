const express = require('express');
const sequelize = require('./database');
require('./models');
const eventRoutes = require('./eventRoutes');

const app = express();
app.use(express.json());
app.use(eventRoutes);

const PORT = 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao sincronizar o banco:', err));