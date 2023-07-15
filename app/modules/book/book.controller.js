const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const { createBookService } = require("./book.services");

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
