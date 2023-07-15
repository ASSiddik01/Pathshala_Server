const Book = require("./book.model");

exports.createBookService = async (payload, id) => {
  payload.userId = id;
  const isExist = await Book.findOne({ title: payload.title });
  if (isExist) {
    throw new Error("This book already added");
  }
  const book = await Book.create(payload);
  if (!book) {
    throw new Error("Book added failed");
  }

  const result = await Book.findById(book._id).populate("userId");
  return result;
};
