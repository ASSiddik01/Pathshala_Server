const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { bookSearchableFields } = require("./book.constant");
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

exports.getBooksService = async (paginationOptions, filters) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  let andConditions = [];

  // search on the field
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  // filtering on field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }

  // sorting
  let sortConditions = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  // output
  const result = await Book.find(whereConditions)
    .populate("")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
