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

function App() {
  const [applications] = useState(initialApplications)

  const totalApplications = applications.length
  const interviews = applications.filter(
    (application) => application.status === 'Interview'
  ).length
  const offers = applications.filter(
    (application) => application.status === 'Offer'
  ).length

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">CAREER DASHBOARD</p>
          <h1>Job Application Tracker</h1>
          <p className="subtitle">
            Keep track of your applications and follow your progress.
          </p>
        </div>
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

          <button type="button">Add Application</button>
        </div>

        <div className="application-list">
          {applications.map((application) => (
            <article className="application-card" key={application.id}>
              <div>
                <h3>{application.role}</h3>
                <p>{application.company}</p>
              </div>

              <div className="application-details">
                <span className={`status ${application.status.toLowerCase()}`}>
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