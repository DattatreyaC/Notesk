import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToDb from "./utils/connectToDb.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import User from "./models/User.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

connectToDb();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(port, async () => {
    console.log(`App started on port ${port} : http://localhost:${port}`);
    await User.syncIndexes();
    // console.log(cloudinary.config());
});
