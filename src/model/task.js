import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    imdbLink: { type: String, required: true },
});

export default mongoose.model('Film', filmSchema);