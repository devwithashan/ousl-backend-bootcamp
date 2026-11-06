const Book = require("../models/book");

module.exports = {
  create: (data) => Book.create(data),
  findAll: () => Book.find(),
};
