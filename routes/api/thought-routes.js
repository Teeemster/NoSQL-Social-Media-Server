//Require Express
const router = require('express').Router();

//Pull In All Controller Routes
const {
    getThoughts,
    getOneThought,
    createAThought,
    updateOneThought,
    deleteAThought,
    createAReaction,
    deleteAReaction
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

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createAReaction)
    .delete(deleteAReaction)

//Export Router
module.exports = router;