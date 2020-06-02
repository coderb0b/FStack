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
    author
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
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