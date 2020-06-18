const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

require('dotenv').config()

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        
        if (typeof args.author !== 'undefined') {
          author = await Author.findOne({ name: args.author })

          if (typeof args.genre !== 'undefined') {
            return (await Book.find({ author: author._id })).filter(b => b.genres.find(g => g === args.genre))
          }
          return Book.find({ author: author._id })
        } else if (typeof args.genre !== 'undefined') {
          return (await Book.find()).filter(b => b.genres.find(g => g === args.genre))
        }
        
        return Book.find()
      },
        
      allAuthors: () => Author.find().populate('bookCount'),
      me: (root, args, context) => {
        return context.currentUser
      }
  },

  Author: {
      bookCount: root => {
        if (root.books.length > 0) {
          return root.books.length
        }
        return 0
      }
  },

  Book: {
    author: async root => {
      return await Author.findById(root.author)
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
          try {
            await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      try {
        saved_book = await book.save()
        author.books = author.books.concat(saved_book)
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      
      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
       })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
