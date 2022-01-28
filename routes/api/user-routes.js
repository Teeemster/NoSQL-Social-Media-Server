const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addAFriend,
    removeAFriend
} = require('../../controllers/user-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router
    .route('/:friends/friendId')
    .put(addAFriend)
    .delete(removeAFriend)


module.exports = router;