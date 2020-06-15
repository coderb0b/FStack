
import React, { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(subscriptionData.data.bookAdded.title + " added")
    }
  })

  let books_from_db = useQuery(ALL_BOOKS)
  
  if (books_from_db.loading) {
    return <div>loading...</div>
  }

  //Haetaan erilliset genret listaan
  let genres = [].concat.apply([], books_from_db.data.allBooks.map(b => b.genres))
  let distinct_genres = [...new Set(genres)]
  distinct_genres.sort()
  
  if (!token) {
    return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books_from_db={books_from_db.data.allBooks}
        genres={distinct_genres}
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        page={page}
        setPage={setPage}
      />

    </div>
    )
  } 



  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout} >logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books_from_db={books_from_db.data.allBooks}
        genres={distinct_genres}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        books_from_db={books_from_db.data.allBooks}
      />

    </div>
  )
}

export default App