const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController');

router.use(authenticateToken);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, taskListId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               taskListId:
 *                 type: integer
 *                 description: ID da lista à qual a tarefa pertence
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */
router.post('/', taskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista tarefas de uma lista (com paginação)
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: taskListId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da lista de tarefas
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade por página
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 */
router.get('/', taskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 */
router.put('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 */
router.delete('/:id', taskController.remove);

module.exports = router;