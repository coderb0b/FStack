import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent(
      'Log in to application'
    )
    expect(component.container).not.toHaveTextContent(
      'testi blogi'
    )
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'heimo',
      token: '5234234123',
      name: 'Heimo Vesa'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container).toHaveTextContent(
      'testi blogi'
    )
  })
})



