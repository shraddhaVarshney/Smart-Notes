import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./db/db.js"
import router from "./routes/user.route.js";


dotenv.config()

const app = express()

const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  methods: ["POST", "GET"],
  default: "http://localhost:3000",
};

const port = process.env.PORT || 4001

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth",router)

app.listen(port, () => {
  connect()
})