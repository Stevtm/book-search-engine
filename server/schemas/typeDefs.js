// import the gql ragged template function
const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
	input BookInput {
		author: [String]!
		description: String!
		bookId: String!
		image: String!
		link: String!
	}

	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		_id: ID
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		user(username: String): [User]
	}

	type Mutation {
		login(email: String!, password: String!): User
		addUser(username: String!, email: String!, password: String!): User
		saveBook(input: BookInput): User
		removeBook(bookId: String!): User
	}
`;

// export typeDefs
module.exports = typeDefs;
