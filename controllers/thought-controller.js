//Import the models
const { Thought, User } = require('../models');

//Controller Section

const thoughtController = {
    //Get All Thoughts
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //Get One Thought
    getOneThought(req, res) {
        Thought.findById(req.params.id )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //Create A Thought
    createAThought(req, res) {
        Thought.create(req.body)
            .then(dbThoughtData => {
                User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { thoughts: dbThoughtData } },
                    {runValidators: true, new: true}
                )
            })
            .then(dbThoughtData => { res.json(dbThoughtData)})
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
             });
    },

    //Update One Thought
    updateOneThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            });
    },

    //Delete A Thought
    deleteAThought(req, res) {
        Thought.findOneAndDelete(req.params.id)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    //Create A Reaction
    createAReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: 'No thought with ID!' });
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    //Delete A Reaction
    deleteAReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

//Export The Controller
module.exports = thoughtController;