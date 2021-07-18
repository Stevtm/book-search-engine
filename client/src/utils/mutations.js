import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $password: String!, $email: String!) {
		addUser(username: $username, password: $password, email: $email) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook(
		$title: String!
		$authors: [String]!
		$description: String!
		$bookId: String!
		$image: String!
		$link: String
	) {
		saveBook(
			title: $title
			authors: $authors
			description: $description
			bookId: $bookId
			image: $image
			link: $link
		) {
			_id
			username
			bookCount
			savedBooks {
				title
				authors
				description
				bookId
				link
				image
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: String!) {
		removeBook(bookId: $bookId) {
			_id
			username
			bookCount
			savedBooks {
				title
				authors
				description
				bookId
				link
				image
			}
		}
	}
`;
