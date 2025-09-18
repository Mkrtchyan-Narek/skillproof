import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#16113A] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Trophy className="h-8 w-8 text-[#0FD354]" />
            <span className="text-xl font-bold">SkillProof</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-[#0FD354] transition-colors ${
                location.pathname === '/' ? 'text-[#0FD354]' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/competitions"
              className={`hover:text-[#0FD354] transition-colors ${
                location.pathname === '/competitions' ? 'text-[#0FD354]' : ''
              }`}
            >
              Competitions
            </Link>
            <Link
              to="/signin"
              className="bg-[#0FD354] text-[#16113A] px-4 py-2 rounded-lg font-semibold hover:bg-[#0FD354]/90 transition-colors flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#16113A] px-4 pt-4 pb-6 space-y-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block hover:text-[#0FD354] transition-colors ${
                location.pathname === '/' ? 'text-[#0FD354]' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/competitions"
              onClick={() => setMobileOpen(false)}
              className={`block hover:text-[#0FD354] transition-colors ${
                location.pathname === '/competitions' ? 'text-[#0FD354]' : ''
              }`}
            >
              Competitions
            </Link>
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="block bg-[#0FD354] text-[#16113A] px-4 py-2 rounded-lg font-semibold hover:bg-[#0FD354]/90 transition-colors flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
