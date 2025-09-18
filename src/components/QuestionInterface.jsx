import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code, FileText } from 'lucide-react';

const QuestionInterface = ({
  question,
  questionIndex,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState(answer ?? null);
  const [codeAnswer, setCodeAnswer] = useState(answer ?? '');

  const handleMultipleChoiceAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    onAnswer(optionIndex);
  };

  const handleCodeAnswer = (code) => {
    setCodeAnswer(code);
    onAnswer(code);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Question Header */}
        <div className="bg-gradient-to-r from-[#16113A] to-[#16113A]/90 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {question.type === 'Multiple Choice' ? (
                <FileText className="h-6 w-6 text-[#0FD354]" />
              ) : (
                <Code className="h-6 w-6 text-[#0FD354]" />
              )}
              <h2 className="text-2xl font-bold">{question.title}</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Question {questionIndex + 1} of {totalQuestions} • {question.type}
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-700 whitespace-pre-line">{question.content}</div>
          </div>

          {/* Answer Interface */}
          {question.type === 'Multiple Choice' && question.options ? (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoiceAnswer(index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedOption === index
                      ? 'border-[#0FD354] bg-[#0FD354]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-[#0FD354] bg-[#0FD354] text-white'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Solution:
              </label>
              <textarea
                value={codeAnswer}
                onChange={(e) => handleCodeAnswer(e.target.value)}
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:border-[#0FD354] focus:outline-none resize-none"
                placeholder="Write your code solution here..."
              />
              <div className="text-sm text-gray-500">
                Use proper JavaScript/React syntax. Your code will be evaluated automatically.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onPrevious}
              disabled={isFirst}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isFirst
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-sm text-gray-500">
              {answer !== undefined && answer !== '' ? (
                <span className="text-[#0FD354] font-medium">✓ Answered</span>
              ) : (
                <span>Not answered</span>
              )}
            </div>

            <button
              onClick={onNext}
              disabled={isLast}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isLast
                  ? 'bg-[#16113A] text-white hover:bg-[#16113A]/90'
                  : 'bg-[#0FD354] text-[#16113A] hover:bg-[#0FD354]/90'
              }`}
            >
              <span>{isLast ? 'Submit' : 'Next'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionInterface;
