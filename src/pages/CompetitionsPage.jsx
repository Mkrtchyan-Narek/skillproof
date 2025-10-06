import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Trophy } from 'lucide-react';
import { competitions } from '../data/competitions';

const CompetitionsPage = () => {
  const [filter, setFilter] = useState('all');

  const filteredCompetitions = competitions.filter(competition => {
    if (filter === 'all') return true;
    return competition.status === filter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: 'bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/20',
      active: 'bg-[#0FD354]/10 text-[#0FD354] border-[#0FD354]/20',
      completed: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return badges[status] || badges.upcoming;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#16113A] mb-2">
            IT Competitions
          </h1>
          <p className="text-gray-600">
            Choose from {competitions.length} available competitions and prove your skills
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-[#0FD354] text-[#16113A]' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'upcoming' ? 'bg-[#0FD354] text-[#16113A]' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'active' ? 'bg-[#0FD354] text-[#16113A]' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Active
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCompetitions.map((competition) => (
          <div key={competition.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-[#16113A] flex-1">
                  {competition.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusBadge(competition.status)}`}>
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {competition.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {competition.startDate} - {competition.endDate}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {competition.participants} participants
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {competition.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Trophy className="h-4 w-4 mr-2" />
                  {competition.prize}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {competition.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-[#E9E7F9] text-[#16113A] rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link 
                to={`/competition/${competition.id}`}
                className={`block w-full text-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                  competition.status === 'active'
                    ? 'bg-[#0FD354] text-[#16113A] hover:bg-[#0FD354]/90'
                    : competition.status === 'upcoming'
                    ? 'bg-[#00D1FF] text-white hover:bg-[#00D1FF]/90'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
              >
                {competition.status === 'active' ? 'Join Competition' :
                 competition.status === 'upcoming' ? 'Register Now' :
                 'View Results'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsPage;
