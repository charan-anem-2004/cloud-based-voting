import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';

const Home = () => {
  const { isAuthenticated, user, loadUser } = useContext(AuthContext);
  const { elections, getElections } = useContext(ElectionContext);

  useEffect(() => {
    loadUser();
    getElections();
  }, []);

  const activeElections = Array.isArray(elections)
    ? elections.filter(election => election.isActive).slice(0, 3)
    : [];

  return (
    <>
      <section className="hero">
        <h1>Welcome to <span className="highlight">VoteCloud</span></h1>
        <p className="lead">A secure cloud-based voting system for political elections.</p>
        {!isAuthenticated ? (
          <div>
            <Link to="/register" className="btn btn-primary">Register</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        ) : (
          <div>
            <p>Welcome back, {user?.username}!</p>
            <Link to="/elections" className="btn btn-primary">View Active Elections</Link>
          </div>
        )}
      </section>

      <div className="home-container">
        <section>
          <h2 className="section-title">Recent Active Elections</h2>
          {activeElections.length > 0 ? (
            <div className="election-preview-grid">
              {activeElections.map(election => (
                <div key={election._id} className="election-card">
                  <h3>{election.title}</h3>
                  <p>{election.description?.substring(0, 100)}...</p>
                  <div className="election-meta">
                    <span>{election.candidates.length} Candidates</span>
                    {election.endDate && (
                      <span> • Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <Link to={`/elections/${election._id}`} className="btn btn-primary">View Election</Link>
                </div>
              ))}
            </div>
          ) : (
            <p>There are currently no active elections. Please check back later.</p>
          )}
          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link to="/elections" className="btn btn-secondary">View All Elections</Link>
          </div>
        </section>

        <section>
          <h2 className="section-title">Why Choose VoteCloud?</h2>
          <div className="feature-grid">
            {[
              { icon: "fas fa-lock", title: "Secure Voting", description: "Your vote is confidential and protected with advanced encryption." },
              { icon: "fas fa-cloud", title: "Cloud-Based", description: "Vote from anywhere, anytime using any device with internet access." },
              { icon: "fas fa-chart-bar", title: "Real-Time Results", description: "Watch results update in real-time as votes are cast." },
              { icon: "fas fa-user-shield", title: "User Authentication", description: "Ensures one vote per registered user for fair results." }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <i className={feature.icon}></i>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              { number: 1, title: "Register to Vote", description: "Create an account with your verified credentials." },
              { number: 2, title: "Browse Active Elections", description: "View current and upcoming elections." },
              { number: 3, title: "Cast Your Vote", description: "Select your preferred candidate securely." },
              { number: 4, title: "View Results", description: "See real-time election results as they come in." }
            ].map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {!isAuthenticated && (
          <section className="cta-section">
            <h2>Ready to Make Your Voice Heard?</h2>
            <p>Join thousands of citizens participating in democratic elections through our secure platform.</p>
            <Link to="/register" className="btn btn-primary">Get Started Now</Link>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
