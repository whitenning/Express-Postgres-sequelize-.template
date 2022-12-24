import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";
import * as models from "./models/models.js";
dotenv.config();
const PORT = process.env.PORT || 1000;
const app = express();

// DEPENDICIES //
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.status(200).json({ message: "WORKING!!!" });
});
//DEPENDICIES END//

//SYNC SERVER WITH DATABASE START
const start = async (req, res) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("Server and DB OK"));
  } catch (error) {
    console.log(error);
  }
};

start();
//SYNC SERVER WITH DATABASE END
