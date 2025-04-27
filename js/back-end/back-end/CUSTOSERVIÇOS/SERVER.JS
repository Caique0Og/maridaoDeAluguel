const express = require('express');
const app = express();
const servicoRoute = require('./routes/servicoRoute');

app.use(express.json());
app.use('/api', servicoRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
