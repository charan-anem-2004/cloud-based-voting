import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} VoteCloud - Secure Cloud-Based Voting System</p>
        <p>
          Designed and Developed by <strong>SRM AP Students</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
