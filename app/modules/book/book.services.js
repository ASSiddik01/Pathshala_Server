const {
  calculatePagination,
} = require("../../../src/helpers/paginationHelpers");
const { bookSearchableFields, bookPopulate } = require("./book.constant");
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

exports.getBookService = async (id) => {
  const result = await Book.findById(id).populate(bookPopulate);
  if (!result) {
    throw new Error("Book not found");
  }
  return result;
};

exports.deleteBookService = async (userId, id) => {
  const book = await Book.findById(id);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.userId.valueOf() !== userId) {
    throw new Error("This is not your added book, so you can't delete");
  }
  const result = await Book.findByIdAndDelete(id);

  if (!result) {
    throw new Error("Book delete failed");
  }
  return result;
};

exports.updateBookService = async (userId, id, payload) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }

  // Title existency check in another book
  const titleExist = await Book.findOne({ title: payload.title });
  if (book.title !== titleExist?.title && titleExist) {
    throw new Error(`Already here is a book by ${payload.title} name`);
  }

  if (book.userId.valueOf() !== userId) {
    throw new Error("This is not your added book, so you can't update");
  }

  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new Error("Book update failed");
  }
  return result;
};

exports.reviewBookService = async (userId, id, payload) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }

  const reviews = {
    review: payload.review,
    reviewerId: userId,
  };

  const result = await Book.findByIdAndUpdate(
    id,
    {
      $push: { reviews: reviews },
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw new Error("Book update failed");
  }
  return result;
};
