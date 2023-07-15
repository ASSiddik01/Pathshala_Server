const { z } = require("zod");

exports.updateUserZod = z.object({
  body: z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  }),
});
