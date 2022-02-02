//Require Express
const router = require('express').Router();

//Pull In All Controller Routes
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addAFriend,
    removeAFriend
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addAFriend)
    .delete(removeAFriend)

//Export Router
module.exports = router;