import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Clock, Trophy, CheckCircle, Play } from 'lucide-react';
import { competitions } from '../data/competitions';

const CompetitionDetailPage = () => {
  const { id } = useParams();
  const competition = competitions.find(c => c.id === id);

  if (!competition) {
    return <div className="text-center py-12">Competition not found</div>;
  }

  const requirements = [
    'Basic understanding of React.js concepts',
    'Familiarity with JavaScript ES6+',
    'Knowledge of HTML5 and CSS3',
    'Experience with component-based architecture'
  ];

  const prizes = [
    { place: '1st Place', reward: '$1,000 + Certificate', color: 'text-yellow-600' },
    { place: '2nd Place', reward: '$500 + Certificate', color: 'text-gray-600' },
    { place: '3rd Place', reward: '$250 + Certificate', color: 'text-orange-600' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#16113A] to-[#16113A]/90 text-white p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{competition.title}</h1>
            <span className={`px-4 py-2 rounded-full text-sm ${
              competition.status === 'active' ? 'bg-[#0FD354] text-[#16113A]' :
              competition.status === 'upcoming' ? 'bg-[#00D1FF] text-white' :
              'bg-gray-200 text-gray-600'
            }`}>
              {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
            </span>
          </div>
          <p className="text-lg text-gray-300 mb-6">{competition.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#0FD354]" />
              <div>
                <div className="text-sm text-gray-300">Start Date</div>
                <div className="font-semibold">{competition.startDate}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#0FD354]" />
              <div>
                <div className="text-sm text-gray-300">Participants</div>
                <div className="font-semibold">{competition.participants}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#0FD354]" />
              <div>
                <div className="text-sm text-gray-300">Duration</div>
                <div className="font-semibold">{competition.duration}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-[#0FD354]" />
              <div>
                <div className="text-sm text-gray-300">Prize</div>
                <div className="font-semibold">{competition.prize}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Technologies */}
          <div>
            <h3 className="text-xl font-semibold text-[#16113A] mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {competition.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-[#E9E7F9] text-[#16113A] rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xl font-semibold text-[#16113A] mb-4">Requirements</h3>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#0FD354]" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prizes */}
          <div>
            <h3 className="text-xl font-semibold text-[#16113A] mb-4">Prizes</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {prizes.map((prize, index) => (
                <div key={index} className="bg-[#E9E7F9] p-4 rounded-xl text-center">
                  <div className={`text-lg font-semibold ${prize.color} mb-2`}>
                    {prize.place}
                  </div>
                  <div className="text-[#16113A]">{prize.reward}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            {competition.status === 'active' ? (
              <Link 
                to={`/competition/${competition.id}/active`}
                className="bg-[#0FD354] text-[#16113A] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#0FD354]/90 transition-colors flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Enter Competition</span>
              </Link>
            ) : competition.status === 'upcoming' ? (
              <button className="bg-[#00D1FF] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#00D1FF]/90 transition-colors">
                Register for Competition
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-600 px-8 py-4 rounded-xl font-semibold text-lg cursor-not-allowed">
                Competition Ended
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailPage;
