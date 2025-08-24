const prisma = require('../configs/prisma');
exports.create = async (req, res) => {
  const { name, color } = req.body;
  const userId = req.user.id;
  try {
    const taskList = await prisma.taskList.create({
      data: { name, color, userId }
    });
    res.status(201).json({ success: true, taskList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao criar lista.' });
  }
};

exports.getAll = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const [taskLists, total] = await Promise.all([
      prisma.taskList.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          color: true, 
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.taskList.count({ where: { userId } })
    ]);
    res.json({
      success: true,
      taskLists,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar listas.' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;
  const userId = req.user.id;
  try {
    const taskList = await prisma.taskList.updateMany({
      where: { id: Number(id), userId },
      data: { name, color }
    });
    if (taskList.count === 0) {
      return res.status(404).json({ success: false, message: 'Lista não encontrada.' });
    }
    res.json({ success: true, message: 'Lista atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar lista.' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const list = await prisma.taskList.findFirst({ where: { id: Number(id), userId } });
    if (!list) {
      return res.status(404).json({ success: false, message: 'Lista não encontrada.' });
    }

    await prisma.task.deleteMany({
      where: { taskListId: Number(id) }
    });

  
    const deleted = await prisma.taskList.deleteMany({
      where: { id: Number(id), userId }
    });

    res.json({ success: true, message: 'Lista deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao deletar lista.' });
  }
};