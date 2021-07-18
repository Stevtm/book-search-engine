const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			// TO DO implement context.user check to see if the user is logged in.
			const userData = await User.findOne({ _id: context.user._id })
				.select("-__v -password")
				.populate("savedBooks");

			return userData;
		},
		user: async (parent, { username }) => {
			const params = username ? { username } : {};

			return User.find(params).select("-__v -password").populate("savedBooks");
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect Credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect Credentials");
			}

			return user;
		},
		addUser: async (parent, args) => {
			const user = await User.create(args);

			return user;
		},
	},
};

module.exports = resolvers;
