import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
await import('dotenv/config');
import dotenv from 'dotenv';


import taskRouter from "./src/route/task.js";
const app = express();

app.use(cors());

app.use(express.json());

// mongoose
//     .connect("process.env.MONGO_CONNECTION")
//     .then(() => console.log('Connected!'))
//     .catch(() => {
//         console.log('Bad connection');
//     })

app.use(taskRouter);

app.use((req, res) => {
    res.status(404).json({ response: "your endpoint does not exit" });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log('MongoDB Connected!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
