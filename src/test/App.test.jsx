import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react'

import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('Job Application Tracker', () => {
  beforeEach(() => {
    localStorage.clear()
  })

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
it('deletes an application', () => {
  render(<App />)

  // Find the Delete buttons
  const deleteButtons = screen.getAllByRole('button', {
    name: 'Delete',
  })

  // Delete the first application
  fireEvent.click(deleteButtons[0])

  // Confirmation should appear
  expect(
    screen.getByText('Delete this application?')
  ).toBeInTheDocument()

  // Confirm deletion
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Confirm Delete',
    })
  )

  // The confirmation should disappear
  expect(
    screen.queryByText('Delete this application?')
  ).not.toBeInTheDocument()
})
it('edits an application', () => {
  render(<App />)

  // Find the Edit buttons
  const editButtons = screen.getAllByRole('button', {
    name: 'Edit',
  })

  // Edit the first application
  fireEvent.click(editButtons[0])

  // Change the company
  fireEvent.change(
    screen.getByPlaceholderText('e.g. Microsoft'),
    {
      target: { value: 'TCS' },
    }
  )

  // Change the role
  fireEvent.change(
    screen.getByPlaceholderText('e.g. Frontend Developer'),
    {
      target: { value: 'Software Engineer' },
    }
  )

  // Submit the update
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Update Application',
    })
  )

// Check that the updated application appears
expect(screen.getByText('TCS')).toBeInTheDocument()

expect(
  screen.getAllByText('Software Engineer').length
).toBeGreaterThanOrEqual(1)
 })

 it('shows an error when required fields are missing', () => {
  render(<App />)

  // Open the Add Application form
  const addButtons = screen.getAllByRole('button', {
    name: 'Add Application',
  })

  fireEvent.click(addButtons[0])

  // Submit the form directly.
  // This bypasses browser HTML "required" validation
  // so React's handleSubmit can run.
  const form = document.querySelector('form')

  fireEvent.submit(form)

  // Error message should appear
  expect(
    screen.getByText('Please complete all required fields.')
  ).toBeInTheDocument()
})
it('cancels the Add Application form', () => {
  render(<App />)

  // Open the Add Application form
  const addButtons = screen.getAllByRole('button', {
    name: 'Add Application',
  })

  fireEvent.click(addButtons[0])

  // Confirm the form is open
  expect(
    screen.getByRole('heading', {
      name: 'Add Application',
    })
  ).toBeInTheDocument()

  // Click Cancel
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Cancel',
    })
  )

  // Form should disappear
  expect(
    screen.queryByRole('heading', {
      name: 'Add Application',
    })
  ).not.toBeInTheDocument()
})
it('shows an error when editing with required fields missing', () => {
  render(<App />)

  // Open Edit for the first application
  const editButtons = screen.getAllByRole('button', {
    name: 'Edit',
  })

  fireEvent.click(editButtons[0])

  // Clear the company field
  fireEvent.change(
    screen.getByPlaceholderText('e.g. Microsoft'),
    {
      target: { value: '' },
    }
  )

  // Submit the edit form directly to bypass browser "required" validation
  const form = document.querySelector('form')

  fireEvent.submit(form)

  // Error should appear
  expect(
    screen.getByText('Please complete all required fields.')
  ).toBeInTheDocument()
})
it('cancels editing an application', () => {
  render(<App />)

  // Open Edit for the first application
  const editButtons = screen.getAllByRole('button', {
    name: 'Edit',
  })

  fireEvent.click(editButtons[0])

  // Confirm the edit form is open
  expect(
    screen.getByRole('heading', {
      name: 'Edit Application',
    })
  ).toBeInTheDocument()

  // Click Cancel
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Cancel',
    })
  )

  // Edit form should disappear
  expect(
    screen.queryByRole('heading', {
      name: 'Edit Application',
    })
  ).not.toBeInTheDocument()
})
it('updates the application status when editing', () => {
  render(<App />)

  // Open Edit for the first application
  const editButtons = screen.getAllByRole('button', {
    name: 'Edit',
  })

  fireEvent.click(editButtons[0])

  // Change Status to Offer
  fireEvent.change(screen.getByLabelText('Status'), {
    target: { value: 'Offer' },
  })

  // Submit the edit
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Update Application',
    })
  )

  // The updated status should appear
  expect(screen.getAllByText('Offer').length).toBeGreaterThanOrEqual(1)
})
it('cancels deleting an application', () => {
  render(<App />)

  const deleteButtons = screen.getAllByRole('button', {
    name: 'Delete',
  })

  // Start deleting the first application
  fireEvent.click(deleteButtons[0])

  // Confirmation should appear
  expect(
    screen.getByText('Delete this application?')
  ).toBeInTheDocument()

  // Cancel deletion
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Cancel',
    })
  )

  // Confirmation should disappear
  expect(
    screen.queryByText('Delete this application?')
  ).not.toBeInTheDocument()

 // The application should still exist
expect(
  screen.getAllByRole('button', {
    name: 'Delete',
  }).length
  ).toBeGreaterThan(0)
})
it('filters applications by status', () => {
  render(<App />)

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Interview' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('searches applications by company or role', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'Google' },
  })

  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('searches applications by role', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'React Developer' },
  })

  expect(screen.getByText('Amazon')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
})
it('searches applications case-insensitively', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'google' },
  })

  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('shows no applications when search has no matches', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'NonexistentCompany' },
  })

  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('shows all applications when search is cleared', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'Google' },
  })

  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()

  fireEvent.change(searchInput, {
    target: { value: '' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.getByText('Amazon')).toBeInTheDocument()
})
it('filters applications by Offer status', () => {
  render(<App />)

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Offer' },
  })

  expect(screen.getByText('Amazon')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
})
it('filters applications by Applied status', () => {
  render(<App />)

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Applied' },
  })

  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('filters applications by Interview status', () => {
  render(<App />)

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Interview' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('shows all applications when status filter is reset to All', () => {
  render(<App />)

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Interview' },
  })

  expect(screen.queryByText('Google')).not.toBeInTheDocument()

  fireEvent.change(statusFilter, {
    target: { value: 'All' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.getByText('Amazon')).toBeInTheDocument()
})
it('combines search and status filters', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  const statusFilter = screen.getByRole('combobox', {
    name: 'Filter applications by status',
  })

  fireEvent.change(searchInput, {
    target: { value: 'Google' },
  })

  fireEvent.change(statusFilter, {
    target: { value: 'Applied' },
  })

  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('searches using a partial company name', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'Mic' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
  expect(screen.queryByText('Amazon')).not.toBeInTheDocument()
})
it('searches using a partial role name', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: 'React' },
  })

  expect(screen.getByText('Amazon')).toBeInTheDocument()
  expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
  expect(screen.queryByText('Google')).not.toBeInTheDocument()
})
it('ignores whitespace-only searches', () => {
  render(<App />)

  const searchInput = screen.getByRole('searchbox', {
    name: 'Search applications',
  })

  fireEvent.change(searchInput, {
    target: { value: '   ' },
  })

  expect(screen.getByText('Microsoft')).toBeInTheDocument()
  expect(screen.getByText('Google')).toBeInTheDocument()
  expect(screen.getByText('Amazon')).toBeInTheDocument()
})
it('saves applications to localStorage', () => {
  render(<App />)

  const addButton = screen.getByRole('button', {
    name: 'Add Application',
  })

  fireEvent.click(addButton)

  fireEvent.change(screen.getByLabelText('Company'), {
    target: { value: 'Infosys' },
  })

  fireEvent.change(screen.getByLabelText('Role'), {
    target: { value: 'Software Engineer' },
  })

  fireEvent.change(screen.getByLabelText('Applied Date'), {
    target: { value: '2026-08-18' },
  })

 fireEvent.click(
  screen.getAllByRole('button', {
    name: 'Add Application',
  })[1]
)

  const saved = JSON.parse(localStorage.getItem('jobApplications'))

  expect(saved).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        company: 'Infosys',
        role: 'Software Engineer',
        appliedDate: '2026-08-18',
      }),
    ])
  )
})