const Users = require('../repositories/users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const { Role } = require('../../models')

const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res, next) => {
  try {
    const userEmail = await Users.findByEmail(req.body.email)
    if (userEmail) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Provided email already exists",
      });
    }
    const userRole = await Role.findOne({ value: 'User' })
    console.log(userRole)
    const { value } = userRole
    const body = req.body
    const { id, name, email, avatarURL } = await Users.create(
      { ...body, role: [value] }
    );
    const payload = { id, value };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      user: { id, name, email, avatarURL, token, role: [value] },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    const id = user.id;
    const { email, name, avatarURL, role } = user;
    const { value } = await Role.findOne({ where: { id: role } })
    const payload = { id, value };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await Users.updateToken(id, token);
    return res.json({ status: "OK", code: HttpCode.OK, data: { token, id, email, name, avatarURL, role: [value] } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({ status: "No Content" });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, email, avatarURL, role } = await Users.findById(id);
    return res.status(HttpCode.OK).json({
      status: "OK",
      code: HttpCode.OK,
      user: { name, email, avatarURL, role },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
};
