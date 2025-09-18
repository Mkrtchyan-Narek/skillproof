import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Clock, Award } from 'lucide-react';

const HomePage = () => {
  const stats = [
    { icon: Trophy, label: 'Active Competitions', value: '12' },
    { icon: Users, label: 'Registered Users', value: '2.5K+' },
    { icon: Clock, label: 'Hours of Challenges', value: '150+' },
    { icon: Award, label: 'Certificates Issued', value: '890' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#16113A] to-[#16113A]/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Prove Your <span className="text-[#0FD354]">Skills</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join IT competitions designed by top companies. Test your abilities, 
              compete with peers, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/competitions"
                className="bg-[#0FD354] text-[#16113A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0FD354]/90 transition-colors"
              >
                View Competitions
              </Link>
              <button className="border-2 border-[#0FD354] text-[#0FD354] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0FD354] hover:text-[#16113A] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-[#E9E7F9] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[#16113A]" />
                  </div>
                  <div className="text-3xl font-bold text-[#16113A] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#16113A] mb-12">
            Why Choose SkillProof?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#0FD354]/10 p-3 rounded-full w-fit mb-4">
                <Trophy className="h-8 w-8 text-[#0FD354]" />
              </div>
              <h3 className="text-xl font-semibold text-[#16113A] mb-4">Real Company Challenges</h3>
              <p className="text-gray-600">
                Face actual problems from leading tech companies. Each competition is designed by industry experts.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#00D1FF]/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-[#00D1FF]" />
              </div>
              <h3 className="text-xl font-semibold text-[#16113A] mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Connect with fellow developers, learn from each other, and build your professional network.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#16113A]/10 p-3 rounded-full w-fit mb-4">
                <Award className="h-8 w-8 text-[#16113A]" />
              </div>
              <h3 className="text-xl font-semibold text-[#16113A] mb-4">Verified Certificates</h3>
              <p className="text-gray-600">
                Earn certificates that are recognized by top employers and showcase your validated skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0FD354]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#16113A] mb-4">
            Ready to Prove Your Skills?
          </h2>
          <p className="text-lg text-[#16113A]/80 mb-8">
            Join thousands of developers who are already competing and landing better jobs.
          </p>
          <Link 
            to="/competitions"
            className="bg-[#16113A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#16113A]/90 transition-colors inline-block"
          >
            Start Competing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
