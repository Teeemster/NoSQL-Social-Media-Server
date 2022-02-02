//Require Mongoose and Date Getter
const { Schema, model } = require("mongoose");
const Thought = require('./Thought')

//User Schema Setup
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Please key in the required username.',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'Please key in the required email.',
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter an email in proper format.']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

//Virtual that retrieves length of user's friends array field on query
UserSchema.virtual('friendsCount').get(function () {
    return this.friends.length
})

//Exports Model / Schema
const User = model('User', UserSchema);
module.exports = User;