import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Only for https
import https from "https";
import path from "path";
import fs from "fs";
// only for https

// Route import
import { routes } from "./routes";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env
      .CORS_ALLOWED_ORIGINS!.replace(/\s+/g, "")
      .split(",")
      .map((origin) => origin.toLowerCase()),
    credentials: true,
  }),
);
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/", routes);

// SERVER
const port = Number(process.env.PORT) || 3001;

// Uncomment to use without local SSL
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// only for https
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "../certificates/localhost-key.pem"),
  ),
  cert: fs.readFileSync(path.join(__dirname, "../certificates/localhost.pem")),
};

const server = https.createServer(options, app);
server.listen(port, "0.0.0.0", () => {
  console.log(`App listening on https://localhost:${port}`);
});
// only for https
