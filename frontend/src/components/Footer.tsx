import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full text-center py-4 mt-8 text-sm text-black font-normal">
    Application developed by{' '}
    <a
      href="https://michaelawilson.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold underline text-black hover:text-blue-700 transition-colors duration-200"
    >
      Michael Wilson
    </a>
  </footer>
);

export default Footer;
