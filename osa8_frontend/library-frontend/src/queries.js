import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
      name
    }
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
    name
    born
    bookCount
    }
}
`

export const SET_BORN = gql`
mutation editAuthor($author: String!, $born: Int!) {
  editAuthor(name: $author, setBornTo: $born) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
    }
  }
`