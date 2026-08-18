import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react'

import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Job Application Tracker', () => {
  it('renders the dashboard title', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Job Application Tracker',
      })
    ).toBeInTheDocument()
  })

  it('opens the Add Application form', () => {
    render(<App />)

    const addButtons = screen.getAllByRole('button', {
      name: 'Add Application',
    })

    fireEvent.click(addButtons[0])

    expect(
      screen.getByRole('heading', {
        name: 'Add Application',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('e.g. Microsoft')
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('e.g. Frontend Developer')
    ).toBeInTheDocument()
  })

  it('adds a new application', () => {
    render(<App />)

    // Open the Add Application form
    const addButtons = screen.getAllByRole('button', {
      name: 'Add Application',
    })

    fireEvent.click(addButtons[0])

    // Enter company
    fireEvent.change(
      screen.getByPlaceholderText('e.g. Microsoft'),
      {
        target: {
          value: 'TCS',
        },
      }
    )

    // Enter role
    fireEvent.change(
      screen.getByPlaceholderText('e.g. Frontend Developer'),
      {
        target: {
          value: 'Software Engineer',
        },
      }
    )

    // Select status
    fireEvent.change(
      screen.getByLabelText('Status'),
      {
        target: {
          value: 'Applied',
        },
      }
    )

    // Enter date
    fireEvent.change(
      screen.getByLabelText('Applied Date'),
      {
        target: {
          value: '2026-08-18',
        },
      }
    )

    // Get the two Add Application buttons
    const submitButtons = screen.getAllByRole('button', {
      name: 'Add Application',
    })

    // Click the form submit button
    fireEvent.click(submitButtons[1])

    // TCS is unique, so getByText is safe
    expect(
      screen.getByText('TCS')
    ).toBeInTheDocument()

    // Software Engineer already exists for Google,
    // so there should now be at least two.
    expect(
      screen.getAllByText('Software Engineer').length
    ).toBeGreaterThanOrEqual(2)

    // Applied already exists for Google,
    // so there should now be at least two.
    expect(
      screen.getAllByText('Applied').length
    ).toBeGreaterThanOrEqual(2)

    // This date is unique
    expect(
      screen.getByText('2026-08-18')
    ).toBeInTheDocument()
  })
})