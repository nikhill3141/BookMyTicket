// import { comparePassword, hashPassword } from "../../utils/hash.js";
// import { generateToken } from "../../utils/token.js";
// import { createUser, findUser } from "./Auth.queries.js";

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res
//         .status(401)
//         .json({ message: "please provide the all the information" });
//     }
//     const hashPass = await hashPassword(password);
//     await createUser(name, email, hashPass);
//     return res
//       .status(200)
//       .json({ success: true, message: "User created Successfully!" });
//   } catch (error) {
//     //write the utils --- todo
//     if (error.code === "23505") {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }
//     console.error("Registration error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error registering user",
//     });
//   }
// };
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(401)
//         .json({ success: false, message: "provide Email or Password" });
//     }
//     const result = await findUser(email);
//     const user = result.rows[0];
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "user with this email not found" });
//     }

//     const isPassCorrect = await comparePassword(password, user.password);
//     if (!isPassCorrect) {
//       return res
//         .status(401)
//         .json({ success: false, message: "invalid email or password" });
//     }
//     const token = await generateToken(user.id);
//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//       })
//       .json({ success: true, message: "user login successfully" });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error logging in user",
//     });
//   }
// };
// const logoutUser = async (req, res) => {
//   try {

    
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in logout user",
//     });
  
    
//   }
// }
// export { registerUser, loginUser };
import { comparePassword, hashPassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/token.js";
import { createUser, findUser } from "./Auth.queries.js";
import { sendError, sendSuccess } from "../../utils/response.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 401, "please provide the all the information");
    }

    const hashPass = await hashPassword(password);

    await createUser(name, email, hashPass);

    return sendSuccess(res, 200, "User created Successfully!");

  } catch (error) {

    if (error.code === "23505") {
      return sendError(res, 400, "Email already exists");
    }

    console.error("Registration error:", error);

    return sendError(res, 500, "Error registering user");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 401, "provide Email or Password");
    }

    const result = await findUser(email);
    const user = result.rows[0];

    if (!user) {
      return sendError(res, 401, "user with this email not found");
    }

    const isPassCorrect = await comparePassword(password, user.password);

    if (!isPassCorrect) {
      return sendError(res, 401, "invalid email or password");
    }

    const token = await generateToken(user.id);

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "user login successfully",
      });

  } catch (error) {
    console.error("Login error:", error);

    return sendError(res, 500, "Error logging in user");
  }
};

const logoutUser = async (req, res) => {
  try {

    return res
      .clearCookie("token")
      .json({
        success: true,
        message: "User logged out successfully",
      });

  } catch (error) {
    console.error("Logout error:", error);

    return sendError(res, 500, "Error in logout user");
  }
};

export { registerUser, loginUser, logoutUser };