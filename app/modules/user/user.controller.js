const httpStatus = require("http-status");
const { sendRes } = require("../../../src/utilities/sendRes");
const { tryCatch } = require("../../../src/utilities/tryCatch");
const {
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
  addToWishListService,
  getUserProfileService,
  removeFromWishListService,
  addToReadListService,
  markFinishedService,
} = require("./user.services");
const { paginationFields } = require("../../../src/constants/pagination");
const { pick } = require("../../../src/utilities/pick");
const { userFilterableFields } = require("./user.constant");

exports.getAllUsers = tryCatch(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, userFilterableFields);

  const result = await getAllUsersService(paginationOptions, filters);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

exports.getSingleUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleUserService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

exports.updateUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await updateUserService(id, updatedData);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully",
    data: result,
  });
});

exports.deleteUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await deleteUserService(id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User delete successfully",
    data: result,
  });
});

exports.addToWishList = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.body;
  const result = await addToWishListService(_id, bookId);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book add to wishlist successfully",
    data: result,
  });
});

exports.removeFromWishList = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.body;
  const result = await removeFromWishListService(_id, bookId);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book remove from wishlist successfully",
    data: result,
  });
});

exports.getUserProfile = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const result = await getUserProfileService(_id);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

exports.addToReadList = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const result = await addToReadListService(_id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book add to read list successfully",
    data: result,
  });
});

exports.markAsFinished = tryCatch(async (req, res) => {
  const { _id } = req.user;
  const result = await markFinishedService(_id, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mark as finished successfully",
    data: result,
  });
});
