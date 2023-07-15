const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    bookImgUrl: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        review: {
          type: String,
        },
        reviewerId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

bookSchema.pre("save", async function (next) {
  this.bookImgUrl =
    this.bookImgUrl ||
    "https://smartmobilestudio.com/wp-content/uploads/2012/06/leather-book-preview.png";
  next();
});

const Book = model("Book", bookSchema);

module.exports = Book;
