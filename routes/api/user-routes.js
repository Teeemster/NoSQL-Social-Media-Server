const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createAThought,
    updateOneThought,
    deleteAThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createAThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getOneThought)
    .put(updateOneThought)
    .delete(deleteAThought);


router
    .route('/:thoughtId/reactions')
    .post(createAReaction)
    .delete(deleteAReaction)


module.exports = router;