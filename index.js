import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import taskRouter from "./src/route/task.js";
import userRouter from "./src/route/user.js";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => console.log('Connected!'))
    .catch(() => {
        console.log('Bad connection');
    });

app.use(userRouter);
app.use(taskRouter);

app.use((req, res) => {
    res.status(404).json({ response: "your endpoint does not exit" });
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
