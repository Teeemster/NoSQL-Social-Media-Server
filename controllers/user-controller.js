const { User } = require('../models');

const userController = {
    //Get All Users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //Get One User By ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //Create a User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    //Update One User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //Add A Friend To User
    addAFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { friends: req.params.friendId } },
            {runValidators: true, new: true}
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
        })
    },

    //Remove A Friend From User
    removeAFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    //Delete a User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;