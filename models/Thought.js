//Require Mongoose and Date Getter
const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat')

//Reaction Schema Setup
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please key in the required reaction.',
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please key in the required username.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

//Thought Schema Setup
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please key in the required thought.',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username:
        {
            type: String,
            required: 'Please key in the required username,'
        }
        ,
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


//Virtual that retrieves length of the thought reactions array field on query
ThoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length
})

//Exports Thought Model / Schema
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;