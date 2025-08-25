const express = require("express");
const cors = require("cors");
const app = express();

const clicksRouter = require("./routes/clicks");
const postbacksRouter = require("./routes/postbacks");
const affiliatesRouter = require("./routes/affiliates");

app.use(cors()); // 👈 allow requests from frontend
app.use(express.json());

app.use("/click", clicksRouter);
app.use("/postback", postbacksRouter);
app.use("/affiliate", affiliatesRouter);

app.listen(3001, () => {
  console.log("✅ Backend server running at http://localhost:3001");
});
