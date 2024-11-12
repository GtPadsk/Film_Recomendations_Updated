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
        const film = await filmModel.find();
        return res.status(200).json({ film: film });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

//==============================================

const GET_FILM_BY_ID = async (req, res) => {
    try {
        const film = await filmModel.findOne({ id: req.params.id });

        if (!film) {
            return res
                .status(404)
                .json({ message: `no task with id ${req.params.id}` });
        }
        return res.status(200).json({ film: film });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }

    // const { id } = req.params;
    // const film = filmRecommendations.find({ id: film.id === id });
    // if (!film) {
    //     return res.status(404).json({ message: 'Film recommendation not found' });
    // }
    // res.json(film);
};
//==============================================

const GET_SORTED_FILMS = (req, res) => {
    if (filmRecommendations.length === 0) {
        return res.status(200).json({ message: 'Data does not exist' });
    }
    const sortedRecommendations = [...filmRecommendations].sort((a, b) => b.rating - a.rating);
    res.json(sortedRecommendations);
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

const DELETE_ALL_FILMS = async (req, res) => {
    try {
        const film = await filmModel.deleteMany();
        return res.status(200).json({ film: film });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//==============================================

const DELETE_FILM_BY_ID = async (req, res) => {
    try {
        const response = await filmModel.findOneAndDelete({ id: req.params.id });

        if (!response) {
            return res
                .status(404)
                .json({ message: `task with id: ${req.params.id} does not exist` });
        }

        return res.status(200).json({ response: "film was deleted", film: response });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }

};

//==============================================

const PUT_UPDATE_FILM_BY_ID = async (req, res) => {
    try {
        const film = await filmModel.findOneAndUpdate(
            { id: req.params.id },
            { ...req.body },
            { new: true }
        );

        return res.status(200).json({ message: "Task was updated", film: film })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

//==============================================
export {
    POST_FILM_RECOMMENDATION,
    GET_FILM_RECOMMENDATIONS,
    GET_FILM_BY_ID,
    GET_SORTED_FILMS,
    GET_FILM_HIGHER_RATING_THAN,
    DELETE_ALL_FILMS,
    DELETE_FILM_BY_ID,
    PUT_UPDATE_FILM_BY_ID,
}

