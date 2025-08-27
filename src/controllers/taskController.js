const prisma = require('../configs/prisma');


exports.create = async (req, res) => {
  const { title, description, taskListId, time } = req.body; 
  const userId = req.user.id;
  try {
    const list = await prisma.taskList.findFirst({ where: { id: taskListId, userId } });
    if (!list) return res.status(404).json({ success: false, message: 'Lista não encontrada.' });

    const task = await prisma.task.create({
      data: { title, description, taskListId, time } 
    });
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao criar tarefa.' });
  }
};

exports.getAll = async (req, res) => {
  const userId = req.user.id;
  const { taskListId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
  
    const list = await prisma.taskList.findFirst({ where: { id: Number(taskListId), userId } });
    if (!list) return res.status(404).json({ success: false, message: 'Lista não encontrada.' });

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { taskListId: Number(taskListId) },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          taskList: {
            select: { color: true } 
          }
        }
      }),
      prisma.task.count({ where: { taskListId: Number(taskListId) } })
    ]);
    res.json({
      success: true,
      tasks,
      color: list.color, 
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar tarefas.' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, time } = req.body; 
  const userId = req.user.id;
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) }, include: { taskList: true } });
    if (!task || task.taskList.userId !== userId) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }

    await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed, time } 
    });
    res.json({ success: true, message: 'Tarefa atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar tarefa.' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) }, include: { taskList: true } });
    if (!task || task.taskList.userId !== userId) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }

    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao deletar tarefa.' });
  }
};