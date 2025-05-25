import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import "./models/index.js";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: [
        "https://frontend-refaiza-dot-f-02-450706.uc.r.appspot.com",
        "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(router);

// jalankan server
app.listen(port, () => console.log("Server is up and running on port " + port));
