import { useState } from 'react'
import './App.css'

const initialApplications = [
  {
    id: 1,
    company: 'Microsoft',
    role: 'Frontend Developer',
    status: 'Interview',
    appliedDate: '2026-08-10',
  },
  {
    id: 2,
    company: 'Google',
    role: 'Software Engineer',
    status: 'Applied',
    appliedDate: '2026-08-12',
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'React Developer',
    status: 'Offer',
    appliedDate: '2026-08-05',
  },
]

const emptyForm = {
  company: '',
  role: '',
  status: 'Applied',
  appliedDate: '',
}

function App() {
  const [applications, setApplications] = useState(initialApplications)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const totalApplications = applications.length

  const interviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length

  const offers = applications.filter(
    (application) => application.status === 'Offer'
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

    if (!form.company.trim() || !form.role.trim() || !form.appliedDate) {
      setError('Please complete all required fields.')
      return
    }

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

    setForm(emptyForm)
    setError('')
    setShowForm(false)
  }

  function handleCancel() {
    setForm(emptyForm)
    setError('')
    setShowForm(false)
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

      <section className="stats" aria-label="Application statistics">
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
              setShowForm(true)
              setError('')
            }}
          >
            Add Application
          </button>
        </div>

        {showForm && (
          <form className="application-form" onSubmit={handleSubmit}>
            <h2>Add Application</h2>

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
                Job Role
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
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="form-actions">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Save Application</button>
            </div>
          </form>
        )}

        <div className="application-list">
          {applications.map((application) => (
            <article className="application-card" key={application.id}>
              <div>
                <h3>{application.role}</h3>
                <p>{application.company}</p>
              </div>

              <div className="application-details">
                <span
                  className={`status ${application.status.toLowerCase()}`}
                >
                  {application.status}
                </span>

                <time dateTime={application.appliedDate}>
                  {application.appliedDate}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App