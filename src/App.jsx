import { useEffect, useState } from 'react'
import './App.css'

const initialApplications = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Microsoft',
    status: 'Interview',
    appliedDate: '2026-08-10',
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Google',
    status: 'Applied',
    appliedDate: '2026-08-12',
  },
  {
    id: 3,
    role: 'React Developer',
    company: 'Amazon',
    status: 'Offer',
    appliedDate: '2026-08-05',
  },
]

const emptyForm = {
  company: '',
  role: '',
  status: 'Applied',
  appliedDate: '',
  notes: '',
}
function App() {
  const [applications, setApplications] = useState(() => {
  const savedApplications = localStorage.getItem('jobApplications')

  if (savedApplications) {
    return JSON.parse(savedApplications)
  }

  return initialApplications
})
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  useEffect(() => {
  localStorage.setItem('jobApplications', JSON.stringify(applications))
}, [applications])

  const totalApplications = applications.length
const filteredApplications = applications
  .filter((application) => {
    const searchTerm = search.trim().toLowerCase()

    const matchesSearch =
      application.company.toLowerCase().includes(searchTerm) ||
      application.role.toLowerCase().includes(searchTerm)

    const matchesStatus =
      statusFilter === 'All' || application.status === statusFilter
      const matchesDate =
  dateFilter === '' || application.appliedDate === dateFilter

   return matchesSearch && matchesStatus
  })
  .sort((a, b) => {
    const dateA = new Date(a.appliedDate)
    const dateB = new Date(b.appliedDate)

    return sortOrder === 'newest'
      ? dateB - dateA
      : dateA - dateB
  })
  const interviews = applications.filter(
    (application) =>
      application.status.toLowerCase() === 'interview'
  ).length

  const offers = applications.filter(
    (application) =>
      application.status.toLowerCase() === 'offer'
  ).length
  const rejected = applications.filter(
  (application) =>
    application.status.toLowerCase() === 'rejected'
).length

  function handleInputChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !form.company.trim() ||
      !form.role.trim() ||
      !form.appliedDate
    ) {
      setError('Please complete all required fields.')
      return
    }

    if (editingId !== null) {
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === editingId
            ? {
                ...application,
                company: form.company.trim(),
                role: form.role.trim(),
                status: form.status,
                appliedDate: form.appliedDate,
              }
            : application
        )
      )

      setEditingId(null)
    } else {
      const newApplication = {
        id: Date.now(),
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
        appliedDate: form.appliedDate,
      }

      setApplications((currentApplications) => [
        newApplication,
        ...currentApplications,
      ])
    }

    setForm(emptyForm)
    setError('')
    setShowForm(false)
  }

  function handleCancel() {
    setForm(emptyForm)
    setError('')
    setEditingId(null)
    setShowForm(false)
  }

  function handleEdit(application) {
    setEditingId(application.id)

    setForm({
      company: application.company,
      role: application.role,
      status: application.status,
      appliedDate: application.appliedDate,
    })

    setError('')
    setShowForm(true)
  }

  function handleDelete(applicationId) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== applicationId
      )
    )

    setDeletingId(null)
  }

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">CAREER DASHBOARD</p>

        <h1>Job Application Tracker</h1>

        <p className="subtitle">
          Keep track of your applications and follow your progress.
        </p>
      </header>

      <section
        className="stats"
        aria-label="Application statistics"
      >
        <article className="stat-card">
          <span>Total Applications</span>
          <strong>{totalApplications}</strong>
        </article>

        <article className="stat-card">
          <span>Interviews</span>
          <strong>{interviews}</strong>
        </article>

        <article className="stat-card">
          <span>Offers</span>
          <strong>{offers}</strong>
        </article>
        <article className="stat-card">
  <span>Rejected</span>
  <strong>{rejected}</strong>
</article>
      </section>

      <section className="applications">
        <div className="section-heading">
          <div>
            <h2>Applications</h2>
            <p>Your recent job applications.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setForm(emptyForm)
              setError('')
              setShowForm(true)
            }}
          >
            Add Application
          </button>
        </div>

        {showForm && (
          <form
            className="application-form"
            onSubmit={handleSubmit}
          >
            <h2>
              {editingId !== null
                ? 'Edit Application'
                : 'Add Application'}
            </h2>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="form-grid">
              <label>
                Company

                <input
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Microsoft"
                  required
                />
              </label>

              <label>
                Role

                <input
                  name="role"
                  type="text"
                  value={form.role}
                  onChange={handleInputChange}
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label>
                Applied Date

                <input
                  name="appliedDate"
                  type="date"
                  value={form.appliedDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
  Notes
  <textarea
    value={form.notes}
    onChange={(event) =>
      setForm({ ...form, notes: event.target.value })
    }
    aria-label="Notes"
    placeholder="Add notes..."
  />
</label>
            </div>

            <div className="form-actions">
              <button type="submit">
                {editingId !== null
                  ? 'Update Application'
                  : 'Add Application'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="application-list">
  <input
  type="search"
  placeholder="Search company or role..."
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  aria-label="Search applications"
/>
<input
  type="date"
  value={dateFilter}
  aria-label="Filter applications by date"
  onChange={(event) => setDateFilter(event.target.value)}
/>


<select
  value={statusFilter}
  onChange={(event) => setStatusFilter(event.target.value)}
  aria-label="Filter applications by status"
>
  <option value="All">All Statuses</option>
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value="Offer">Offer</option>
  <option value="Rejected">Rejected</option>
</select>
<button
  type="button"
 onClick={() => {
  setSearch('')
  setStatusFilter('All')
  setDateFilter('')
  setSortOrder('newest')
}}
>
  Clear Filters
</button>
<button
  type="button"
  disabled={applications.length === 0}
  onClick={() => {
    const headers = ['Company', 'Role', 'Status', 'Applied Date']

 const rows = filteredApplications.map((application) => [
  application.company,
  application.role,
  application.status,
  application.appliedDate,
])

   const escapeCSV = (value) =>
  `"${String(value).replace(/"/g, '""')}"`

const csv = [headers, ...rows]
  .map((row) => row.map(escapeCSV).join(','))
  .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
   const date = new Date().toISOString().slice(0, 10)
link.download = `job-applications-${date}.csv`
    link.click()

    URL.revokeObjectURL(url)
  }}
>
  <span aria-hidden="true">↓</span> Export CSV
</button>
<select
  value={sortOrder}
  onChange={(event) => setSortOrder(event.target.value)}
  aria-label="Sort applications"
>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
</select>
<p className="result-count" aria-live="polite">
  Showing {filteredApplications.length} of {applications.length} applications
</p>
{filteredApplications.length === 0 && (
  <p className="empty-state">
    No applications found.
  </p>
)}
          {filteredApplications.map((application) => (
            <article
              className="application-card"
              key={application.id}
            >
              <div>
                <h3>{application.role}</h3>
                <p>{application.company}</p>
                {application.notes && (
  <p className="application-notes">
    {application.notes}
  </p>
)}
              </div>

              <div className="application-details">
                <span
                  className={`status ${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>
                <span className="updated-date">
  Applied: {application.appliedDate}
</span>

                <time dateTime={application.appliedDate}>
                  {application.appliedDate}
                </time>

                <button
                  type="button"
                  onClick={() => handleEdit(application)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeletingId(application.id)
                  }
                >
                  Delete
                </button>
              </div>

              {deletingId === application.id && (
                <div className="delete-confirmation">
                  <p>Delete this application?</p>

                  <div>
                    <button
                      type="button"
                      onClick={() => setDeletingId(null)}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(application.id)
                      }
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
export default App