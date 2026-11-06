const sequelize = require('./database');
require('./models');
const app = require('./app');

const PORT = 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao sincronizar o banco:', err));