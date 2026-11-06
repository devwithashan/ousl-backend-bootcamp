const Book = require("../models/book");

module.exports = {
  create: (data) => Book.create(data),
  findAll: () => Book.find(),
  findById: (id) => Book.findById(id),
  update: (id, data) => Book.findByIdAndUpdate(id, data, {new: true}),
  delete: (id) => Book.findByIdAndDelete(id),
};
