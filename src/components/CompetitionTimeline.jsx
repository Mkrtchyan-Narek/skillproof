import React from 'react';
import { CheckCircle, Circle, Play } from 'lucide-react';

const CompetitionTimeline = ({ questions, currentQuestion, answers, onQuestionSelect }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[#16113A] mb-6">Competition Progress</h3>
      
      <div className="space-y-4">
        {questions.map((question, index) => {
          const isCompleted = answers[index] !== undefined;
          const isCurrent = index === currentQuestion;
          
          return (
            <div key={question.id} className="relative">
              {/* Connection Line */}
              {index < questions.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
              )}
              
              <button
                onClick={() => onQuestionSelect(index)}
                className={`w-full text-left p-4 rounded-xl transition-all hover:shadow-md ${
                  isCurrent 
                    ? 'bg-[#0FD354]/10 border-2 border-[#0FD354]' 
                    : isCompleted
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                    isCurrent
                      ? 'bg-[#0FD354] text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300'
                  }`}>
                    {isCurrent ? (
                      <Play className="h-3 w-3" />
                    ) : isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium truncate ${
                        isCurrent ? 'text-[#16113A]' : 'text-gray-700'
                      }`}>
                        {question.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-lg text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{question.type}</span>
                    </div>
                    
                    {isCompleted && (
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        ✓ Completed
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-[#E9E7F9] rounded-xl">
        <div className="text-sm text-[#16113A] mb-2">Overall Progress</div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#0FD354] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-[#16113A]">
            {Math.round((Object.keys(answers).length / questions.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompetitionTimeline;
