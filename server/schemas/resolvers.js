const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const {signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findOne({_id: context.user._id })
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {input}, context) => {
            if(context.user) {
                return User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: input}},
                    {new: true}
                )
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (parent, { bookId }, context) => {
            if(context.user) {
                return User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: { bookId: bookId } }},
                    {new: true}
                )
            }
        }
    }
};

module.exports = resolvers;

