import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";
import http from "http";
import initSocket from "./socket/index.js";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
initSocket(server);

connectDB()
  .then(() => {
    server
      .listen(PORT, () => {
        console.log(`Server is running at PORT: ${PORT}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`PORT: ${PORT} is already in use!`);
          process.exit(1);
        }
      });
  })
  .catch((err) => {
    console.log("ERROR!! While connecting to MongoDB!", err);
    process.exit(1);
  });
