// import the gql ragged template function
import { gql } from "apollo-server-express";

// create typeDefs
const typeDefs = gql`
	type User {
        _id: ID
        username: String
        email: String
        bookCount = Int
        savedBooks [Book]
    }
`;

// export typeDefs
module.exports = typeDefs;
