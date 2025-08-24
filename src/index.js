require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./configs/cors');
const { swaggerUi, swaggerSpec } = require('./configs/swagger');

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('API Beaudio funcionando!');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const taskListRoutes = require('./routes/taskList');
app.use('/tasklists', taskListRoutes);

const taskRoutes = require('./routes/task');
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});