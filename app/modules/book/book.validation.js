const { z } = require("zod");

exports.createBookZod = z.object({
  body: z.object({
    title: z.string({
      required_error: "Zod: Book tile is required",
    }),
    author: z.string({
      required_error: "Zod: Auther name required",
    }),
    genre: z.string({
      required_error: "Zod: Book generic is required",
    }),
    publishedDate: z.string({
      required_error: "Zod: Published date is required",
    }),
    bookImgUrl: z.string().optional(),
    desc: z.string().optional(),
  }),
});
