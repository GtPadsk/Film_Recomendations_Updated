import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
await import('dotenv/config');


import taskRouter from "./src/route/task.js";
const app = express();

app.use(cors());

app.use(express.json());

mongoose
    .connect("mongodb+srv://padskociusgytis:M257twswCSaS2xN3@cluster0.v1huw.mongodb.net/")
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Bad connection'));


app.use(taskRouter);

app.use((req, res) => {
    res.status(404).json({ response: "your endpoint does not exit" });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port 3000');
});
