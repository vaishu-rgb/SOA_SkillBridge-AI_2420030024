import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Welcome, Vaishnavi 👋</h1>
          <p>Here’s your career readiness overview.</p>
        </div>

        <div className="profile-badge">
          V
        </div>
      </header>

      {/* Top Cards */}
      <section className="overview-grid">

        <div className="dashboard-card career-card">
          <p className="card-label">Target Career</p>
          <h2>Data Engineer</h2>
          <span className="card-subtitle">
            Your selected career goal
          </span>
        </div>

        <div className="dashboard-card readiness-card">
          <p className="card-label">Career Readiness</p>

          <div className="readiness-content">
            <div className="readiness-circle">
              <span>82%</span>
            </div>

            <div>
              <h3>Career Ready</h3>
              <p>Keep improving your skills.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Skill Gaps */}
      <section className="dashboard-card section-card">
        <div className="section-header">
          <div>
            <h2>Skill Gaps</h2>
            <p>Skills that need improvement for your target career.</p>
          </div>
        </div>

        <div className="skill-list">

          <div className="skill-row">
            <div className="skill-info">
              <span>Apache Spark</span>
              <strong>42%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>

          <div className="skill-row">
            <div className="skill-info">
              <span>AWS</span>
              <strong>38%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "38%" }}
              ></div>
            </div>
          </div>

          <div className="skill-row">
            <div className="skill-info">
              <span>Docker</span>
              <strong>55%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "55%" }}
              ></div>
            </div>
          </div>

        </div>
      </section>

      {/* Career Plan */}
      <section className="dashboard-card section-card">
        <div className="section-header">
          <div>
            <h2>Career Plan</h2>
            <p>Your current learning roadmap.</p>
          </div>
        </div>

        <div className="plan-list">

          <div className="plan-item completed">
            <span className="plan-icon">✓</span>
            <span>Python Project</span>
            <span className="plan-status">Completed</span>
          </div>

          <div className="plan-item completed">
            <span className="plan-icon">✓</span>
            <span>SQL Practice</span>
            <span className="plan-status">Completed</span>
          </div>

          <div className="plan-item">
            <span className="plan-icon">→</span>
            <span>Learn Spark</span>
            <span className="plan-status pending">In Progress</span>
          </div>

          <div className="plan-item">
            <span className="plan-icon">→</span>
            <span>AWS Fundamentals</span>
            <span className="plan-status pending">Upcoming</span>
          </div>

        </div>
      </section>

      {/* Opportunities */}
      <section className="dashboard-card section-card">

        <div className="section-header">
          <div>
            <h2>Recommended Opportunities</h2>
            <p>Opportunities matching your career profile.</p>
          </div>
        </div>

        <div className="opportunity-card">

          <div className="opportunity-main">
            <div className="opportunity-icon">
              💼
            </div>

            <div>
              <h3>Data Engineering Internship</h3>
              <p>Data Engineering • Internship</p>
            </div>
          </div>

          <div className="opportunity-readiness">
            <span>Readiness</span>
            <strong>86%</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;