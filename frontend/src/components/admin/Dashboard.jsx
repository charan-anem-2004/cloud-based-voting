import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import ElectionContext from '../context/election/ElectionContext';
import ElectionForm from './ElectionForm';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const electionContext = useContext(ElectionContext);
  const { user } = authContext;
  const { elections, getElections, deleteElection, updateElection } = electionContext;

  const [showForm, setShowForm] = useState(false);
  const [currentElectionId, setCurrentElectionId] = useState(null);

  useEffect(() => {
    authContext.loadUser();
    getElections();
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      deleteElection(id);
    }
  };

  const toggleElectionStatus = (election) => {
    updateElection({
      ...election,
      isActive: !election.isActive,
    });
  };

  const editElection = (id) => {
    setCurrentElectionId(id);
    setShowForm(true);
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="not-authorized">
        <h2>Not Authorized</h2>
        <p>You must be an admin to view this page.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.username}</p>

      <div className="dashboard-actions">
        <button
          className="btn btn-primary"
          onClick={() => {
            setCurrentElectionId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Hide Form' : 'Create New Election'}
        </button>
      </div>

      {showForm && (
        <ElectionForm
          electionId={currentElectionId}
          onClose={() => {
            setShowForm(false);
            setCurrentElectionId(null);
          }}
        />
      )}

      <div className="election-management">
        <h2>Manage Elections</h2>
        {elections && elections.length > 0 ? (
          <table className="election-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election._id}>
                  <td>{election.title}</td>
                  <td>
                    <span className={`status ${election.isActive ? 'active' : 'inactive'}`}>
                      {election.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(election.startDate).toLocaleDateString()}</td>
                  <td>{election.endDate ? new Date(election.endDate).toLocaleDateString() : 'N/A'}</td>
                  <td className="action-buttons">
                    {/* Edit Button */}
                    <button
                      className="btn btn-sm btn-dark"
                      onClick={() => editElection(election._id)}
                    >
                      Edit
                    </button>

                    {/* Toggle Status Button */}
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => toggleElectionStatus(election)}
                    >
                      {election.isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    {/* View Results Link */}
                    <Link
                      to={`/results/${election._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View Results
                    </Link>

                    {/* Delete Button */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(election._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No elections available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
