const { Session, Author, Variation } = require("../../models");
const { query } = require("express");

// const getAllSessions = async () => {
//   const result = await Session.find();
//   return result;
// };

const getAllSessions = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorited = null,
    limit = 10,
    offset = 0,
  } = query;
  const options = {
    offset,
    limit,
    where: {
      author: userId,
      ...(favorited !== null ? { isFavorite: favorited } : {}),
    },
    include: [
      {
        model: Author,
        attributes: ["id", "name"],
      },
      {
        model: Variation,
        attributes: ["id", "value"],
      },
    ],
  };
  const order = [];
  if (sortBy) {
    order.push([`${sortBy}`]);
    options.order = order;
  }
  if (sortByDesc) {
    order.push([`${sortByDesc}`, "DESC"]);
    options.order = order;
  }
  if (filter) {
    const attributes = filter.split("|");
    options.attributes = attributes;
  }
  const { count, rows } = await Session.findAndCountAll(options);
  return { sessions: rows, total: count, limit, offset };
};

const getById = async (id) => {
  const result = await Session.findOne({ where: id });
  return result;
};

const remove = async (id) => {
  const session = await Session.findOne({ where: id });
  if (session) {
    await Session.destroy({ where: id });
    return session;
  }
  return null;
};

const addSession = async (body) => {
  const result = await Session.create({
    owner: userId,
    ...body,
  });
  return result;
};

const update = async (id, body) => {
  await Session.update(body, { where: id });
  return await getById(id);
};

module.exports = {
  getAllSessions,
  getById,
  remove,
  addSession,
  update,
};
