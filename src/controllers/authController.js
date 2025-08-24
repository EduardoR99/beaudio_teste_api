const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../configs/prisma');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao registrar usuário.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos.' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userData } = user;

    res.json({ success: true, token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao fazer login.' });
  }
};

module.exports = { register, login };