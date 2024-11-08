import express from 'express';
import cors from 'cors';


import taskRouter from "./src/route/task.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use(taskRouter);

app.use((req, res) => {
    res.status(404).json({ response: "your endpoint does not exit" });
});

const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port 3000');
});
