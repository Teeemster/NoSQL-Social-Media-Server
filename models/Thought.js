const { Schema, model, Types } = require("mongoose");

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
        },
        toJSON: {
            getters: true
        }
    }
)

//Create a virtual that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length
})


const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;