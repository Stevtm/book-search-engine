const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id })
					.select("-__v -password")
					.populate("savedBooks");

				return userData;
			}

			throw new AuthenticationError("Not logged in");
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

			const token = signToken(user);
			return { token, user };
		},
		addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		saveBook: async (parent, args, context) => {
			const { title, authors, description, bookId, image, link } = args;

			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$push: {
							savedBooks: { title, authors, description, bookId, image, link },
						},
					},
					{ new: true, runValidators: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;
