const Article = require("../repositories/articles");
const { HttpCode } = require("../helpers/constants");
// const article = require("../../models/article");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { articles, total, limit, offset } = await Article.getAll(
      userId,
      req.query
    );
    articles.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { articles, total, limit, offset },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const article = await Article.addArticle(userId, req.body);
    if (article) {
      const { articles } = await Article.getAll(userId, req.query);
      articles.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res.status(HttpCode.CREATED).json({
        status: "success",
        code: HttpCode.CREATED,
        data: { articles },
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
    const article = await Article.getById(req.params.id);
    if (article) {
      return res.json({ status: "success", code: 200, data: { article } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const article = await Article.remove(req.params.id);
    if (article) {
      return res.json({ status: "success", code: 200, data: { article } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const article = await Article.update(req.params.id, req.body);
    if (article) {
      return res.json({ status: "success", code: 200, data: { article } });
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
