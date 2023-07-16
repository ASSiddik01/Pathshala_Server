exports.userFilterableFields = ["searchTerm", "firstname", "lastname", "email"];

exports.userSearchableFields = ["firstname", "lastname", "email", "address"];

exports.status = ["Reading", "Finished"];

exports.userPopulate = [
  "wishlist",
  {
    path: "readlist",
    populate: [
      {
        path: "bookId",
      },
    ],
  },
];
