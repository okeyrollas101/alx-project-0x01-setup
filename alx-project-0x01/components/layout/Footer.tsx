import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;