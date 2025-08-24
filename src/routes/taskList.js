const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const taskListController = require('../controllers/taskListController');

router.use(authenticateToken);

/**
 * @swagger
 * /tasklists:
 *   post:
 *     summary: Cria uma nova lista de tarefas
 *     tags: [TaskList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *                 description: Cor hexadecimal 
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
 */
router.post('/', taskListController.create);

/**
 * @swagger
 * /tasklists:
 *   get:
 *     summary: Lista todas as listas do usuário (com paginação)
 *     tags: [TaskList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Listas retornadas com sucesso
 */
router.get('/', taskListController.getAll);

/**
 * @swagger
 * /tasklists/{id}:
 *   put:
 *     summary: Atualiza uma lista de tarefas
 *     tags: [TaskList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lista atualizada com sucesso
 */
router.put('/:id', taskListController.update);

/**
 * @swagger
 * /tasklists/{id}:
 *   delete:
 *     summary: Deleta uma lista de tarefas
 *     tags: [TaskList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista deletada com sucesso
 */
router.delete('/:id', taskListController.remove);

module.exports = router;