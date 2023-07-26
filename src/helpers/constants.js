const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const limiterAPI = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: "error",
      code: HttpCode.TOO_MANY_REQUESTS,
      message: "Користувач відправив за багато запитів",
    });
  },
};

const Role = {
  ADMIN: "Admin",
  USER: "User",
};

const Variation = {
  PROJECT: "Проект",
  SOLUTION: "Рішення",
};

const Author = {
  NAME1: "Сергій Максимчук",
  NAME2: "Андрій Чубик",
  NAME3: "Наталія Совбецька",
  NAME4: "Сергій Мамчур",
  NAME5: "Віктор Лівінюк",
  NAME6: "Богдан Касаткін",
  NAME7: "Марія Коношевська",
  NAME8: "Тетяна Нечай",
  NAME9: "Олександр Петровський",
  NAME10: "Галина Бондар",
  NAME11: "Ольга Боцюк",
  NAME12: "Інна Яра",
  NAME13: "Сергій Пастощук",
  NAME14: "Сергій Лисак",
};
module.exports = {
  HttpCode,
  limiterAPI,
  Role,
  Author,
  Variation,
};
