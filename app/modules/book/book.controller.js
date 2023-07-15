const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const { createBookService, getBooksService } = require("./book.services");
const { pick } = require("../../../src/utilities/pick");
const { paginationFields } = require("../../../src/constants/pagination");
const { bookFilterableFields } = require("./book.constant");

exports.createBook = tryCatch(async (req, res) => {
  const { _id } = req?.user;
  const result = await createBookService(req.body, _id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added successfully",
    data: result,
  });
});

exports.getBooks = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, bookFilterableFields);

  const result = await getBooksService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrived successfully",
    data: result,
  });
});
