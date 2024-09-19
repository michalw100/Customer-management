const { object, string } = require("zod");

exports.SignUpSchema = object({
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


// exports.verifyUserSchema = object({
//   params: object({
//     id: string(),
//     verificationCode: string(),
//   }),
// });

// exports.forgotPasswordSchema = object({
//   body: object({
//     user_email: string({
//       required_error: "Email is required",
//     }).email("Not a valid email"),
//   }),
// });

// exports.resetPasswordSchema = object({
//   params: object({
//     id: string(),
//     passwordResetCode: string(),
//   }),
//   body: object({
//     user_password: string({
//       required_error: "Password is required",
//     }).min(6, "Password is too short - should be min 6 chars"),
//     passwordConfirmation: string({
//       required_error: "Password confirmation is required",
//     }),
//   }).refine((data) => data.user_password === data.passwordConfirmation, {
//     message: "Passwords do not match",
//     path: ["passwordConfirmation"],
//   }),
// });
