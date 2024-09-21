const { object, string } = require("zod");

exports.userSchema = object({
  body: object({
    user_name: string({
      required_error: "name is required",
    }),
    user_password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    user_email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  })
});

exports.SignInSchema = object({
  body: object({
    user_email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    user_password: string({
      required_error: "Password is required",
    }).min(6, "Invalid email or password"),
  }),
});