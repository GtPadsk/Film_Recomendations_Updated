import { v4 as uuidv4 } from 'uuid';
import casual from 'casual';
import filmModel from '../model/task.js';

const usedIds = new Set();
const filmRecommendations = [];

//==============================================

const POST_FILM_RECOMMENDATION = async (req, res) => {
    try {
        const filmRecommendation = () => {
            let newId = uuidv4();
            while (usedIds.has(newId)) {
                newId = uuidv4();
            }
            usedIds.add(newId);
            return {
                id: newId,
                title: casual.title,
                rating: casual.double(0, 10).toFixed(1),
                description: casual.sentences(2),
                imdbLink: `https://www.imdb.com/title/tt${casual.integer(1000000, 9999999)}`
            }
        };

        const newFilm = filmRecommendation();
        // const { title, rating, description, imdbLink } = newFilm;

        if (!newFilm.title || !newFilm.rating || !newFilm.description || !newFilm.imdbLink) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const film = new filmModel(newFilm);
        const response = await film.save();
        console.log(response);

        filmRecommendations.push(newFilm);
        res.status(201).json(newFilm);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'we have some problems' });
    }
};
//==============================================

const GET_FILM_RECOMMENDATIONS = async (req, res) => {

    try {
        const filmRecommendations = await filmModel.find();

        if (filmRecommendations.length === 0) {
            return res.status(200).json({ message: 'Data does not exist' });
        } else {
            return res.status(200).json({
                message: 'Successfully retrieved data',
                data: filmRecommendations
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

//==============================================

const GET_FILM_BY_ID = (req, res) => {
    const { id } = req.params;
    const film = filmRecommendations.find(film => film.id === id);
    if (!film) {
        return res.status(404).json({ message: 'Film recommendation not found' });
    }
    res.json(film);
};

//==============================================

const UPDATE_FILM_BY_ID = (req, res) => {
    const film = filmRecommendations.find((t) => t.id === req.params.id);

    if (!film) {
        return res.status(404).json({ message: 'Film recommendation not found' });
    }

    const index = filmRecommendations.findIndex((t) => t.id === req.params.id);

    filmRecommendations[index] = { ...film, ...req.body, };

    return res.status(200).json({ message: "Film recommendation updated successfully" });
}


//==============================================

const GET_SORTED_FILMS = (req, res) => {
    if (filmRecommendations.length === 0) {
        return res.status(200).json({ message: 'Data does not exist' });
    }
    const sortedRecommendations = [...filmRecommendations].sort((a, b) => b.rating - a.rating);
    res.json(sortedRecommendations);
};

//==============================================

const DELETE_ALL_FILMS = (req, res) => {
    if (filmRecommendations.length === 0) {
        return res.status(200).json({ message: 'Data does not exist' });
    };
    filmRecommendations.length = 0;
    res.sendStatus(204);
};

//==============================================

const DELETE_FILM_BY_ID = (req, res) => {
    const { id } = req.params;
    const index = filmRecommendations.findIndex(film => film.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Film recommendation not found' });
    }
    filmRecommendations.splice(index, 1);
    res.sendStatus(204);
};

//==============================================

const GET_FILM_HIGHER_RATING_THAN = (req, res) => {
    const { rating } = req.params;
    const films = filmRecommendations.filter(film => film.rating > rating);
    if (!films) {
        return res.status(404).json({ message: 'Film recommendation not found' });
    }
    res.json(films);
}

//==============================================
export {
    POST_FILM_RECOMMENDATION,
    GET_FILM_RECOMMENDATIONS,
    GET_FILM_BY_ID,
    UPDATE_FILM_BY_ID,
    GET_SORTED_FILMS,
    DELETE_ALL_FILMS,
    DELETE_FILM_BY_ID,
    GET_FILM_HIGHER_RATING_THAN,
}

