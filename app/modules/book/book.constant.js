exports.bookFilterableFields = ["searchTerm", "genre", "publishedDate"];

exports.bookSearchableFields = ["title", "author", "genre"];

exports.bookPopulate = [
  "userId",
  {
    path: "reviews",
    populate: [
      {
        path: "reviewerId",
      },
    ],
  },
];
