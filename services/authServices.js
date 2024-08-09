import User from "../db/models/User.js";

export const signup = async (data) => {
  try {
    const newUser = await User.create(data);
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already exist";
    }

    throw error;
  }
};
