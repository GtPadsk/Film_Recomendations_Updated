import express from 'express';

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

router.post('/filmRecommendations', POST_FILM_RECOMMENDATION);
router.get('/filmRecommendations', GET_FILM_RECOMMENDATIONS);
router.get('/filmRecommendations/:id', GET_FILM_BY_ID);
router.get('/filmRecommendationsSorted', GET_SORTED_FILMS);
router.get('/filmRecommendationsHigherThan/:rating', GET_FILM_HIGHER_RATING_THAN);
router.delete('/filmRecommendations', DELETE_ALL_FILMS);
router.delete('/filmRecommendations/:id', DELETE_FILM_BY_ID);
router.put('/filmRecommendations/:id', PUT_UPDATE_FILM_BY_ID);


export default router;