import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

import { emailRegexp } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      // is: emailRegexp,
      isEmail(value) {
        if (!emailRegexp.test(value)) {
          throw new Error("Email not validate");
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription: {
    type: DataTypes.STRING,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({ force: true });
// User.sync();

export default User;
