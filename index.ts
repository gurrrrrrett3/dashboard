import express from "express";
import path from "path";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use(express.json())

app.use("/api", apiRouter)

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));  
});

app.use("/", express.static("./dist"));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
