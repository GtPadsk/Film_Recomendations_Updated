import express from 'express';
import auth from '../middleware/auth.js';

import {
    POST_FILM_RECOMMENDATION,
    GET_FILM_RECOMMENDATIONS,
    GET_FILM_BY_ID,
    GET_FILM_HIGHER_RATING_THAN,
    GET_SORTED_FILMS,
    DELETE_ALL_FILMS,
    DELETE_FILM_BY_ID,
    PUT_UPDATE_FILM_BY_ID,
} from '../controller/task.js';

const router = express.Router();

router.post('/filmRecommendations', auth, POST_FILM_RECOMMENDATION);
router.get('/filmRecommendations', auth, GET_FILM_RECOMMENDATIONS);
router.get('/filmRecommendations/:id', auth, GET_FILM_BY_ID);
router.get('/filmRecommendationsSorted', auth, GET_SORTED_FILMS);
router.get('/filmRecommendationsHigherThan/:rating', auth, GET_FILM_HIGHER_RATING_THAN);
router.delete('/filmRecommendations', auth, DELETE_ALL_FILMS);
router.delete('/filmRecommendations/:id', auth, DELETE_FILM_BY_ID);
router.put('/filmRecommendations/:id', auth, PUT_UPDATE_FILM_BY_ID);


export default router;