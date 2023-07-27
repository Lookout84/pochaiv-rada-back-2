const Session = require("../repositories/sessions");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { sessions, total, limit, offset } = await Session.getAllSessions(
      userId,
      req.query
    );
    sessions.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { sessions, total, limit, offset },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const session = await Session.addSession(userId, req.body);
    if (session) {
      const { sessions } = await Session.getAllSessions(userId, req.query);
      sessions.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: { sessions },
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Незаповнене обов'язкове поле",
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const session = await Session.getById(req.params.id);
    if (session) {
      return res.json({ status: "success", code: 200, data: { session } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const session = await Session.remove(req.params.id);
    if (session) {
      return res.json({ status: "success", code: 200, data: { session } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const session = await Article.update(req.params.id, req.body);
    if (session) {
      return res.json({ status: "success", code: 200, data: { session } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
