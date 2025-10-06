import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompetitionTimeline from '../components/CompetitionTimeline';
import QuestionInterface from '../components/QuestionInterface';
import { competitions } from '../data/competitions';
import { questions } from '../data/questions';

const ActiveCompetitionPage = () => {
  const { id } = useParams();
  const competition = competitions.find(c => c.id === id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!competition) {
    return <div className="text-center py-12">Competition not found</div>;
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="min-h-screen bg-[#E9E7F9]">
      {/* Header */}
      <div className="bg-[#16113A] text-white p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{competition.title}</h1>
            <p className="text-sm text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-300">Time Remaining</div>
              <div
                className={`text-lg font-mono font-bold ${
                  timeRemaining < 300 ? 'text-red-400' : 'text-[#0FD354]'
                }`}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Progress</div>
              <div className="text-lg font-semibold">
                {Object.keys(answers).length}/{questions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Timeline Sidebar */}
        <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto sticky top-16">
          <CompetitionTimeline
            questions={questions}
            currentQuestion={currentQuestion}
            answers={answers}
            onQuestionSelect={goToQuestion}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <QuestionInterface
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            answer={answers[currentQuestion]}
            onAnswer={(answer) => handleAnswer(currentQuestion, answer)}
            onNext={() =>
              currentQuestion < questions.length - 1 &&
              setCurrentQuestion(currentQuestion + 1)
            }
            onPrevious={() =>
              currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)
            }
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveCompetitionPage;
