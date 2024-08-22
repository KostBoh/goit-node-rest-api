import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import sequelize from "./db/sequelize.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

import nodemailer from "nodemailer";
// import "dotenv/config";

const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_FROM,
  to: "tekexit359@avashost.com",
  subject: "Test email subject",
  html: "<strong>Test email text</strong>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { PORT = 3000 } = process.env;
const port = Number(PORT);

let server = null;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
    server = app.listen(port, () => {
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.log("Database connection error:", error.message);
    process.exit(1);
  }
};

startServer();

export default server;
