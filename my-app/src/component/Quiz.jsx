import { useState, useEffect } from "react";
import "./Quiz.css";

// Timer component to handle countdown
const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time's up! Reload to try again.");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, setTimeLeft]);

  return <h2>Time Left: {timeLeft}s</h2>;
};

// QuizOption component to handle option logic and styling
const QuizOption = ({
  option,
  selectedOption,
  submitted,
  correctAnswer,
  handleOptionClick,
}) => {
  const isSelected = selectedOption === option;
  const isCorrect = option === correctAnswer;
  const isWrong = isSelected && !isCorrect;

  return (
    <li
      className={`option ${isSelected ? "selected" : ""} ${
        submitted
          ? isCorrect
            ? "correct"
            : isWrong
            ? "wrong"
            : ""
          : ""
      }`}
      onClick={() => handleOptionClick(option)}
    >
      {option}
    </li>
  );
};

const Quiz = () => {
  // Quiz question and options
  const questionData = {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Markup Language",
      "HyperText Making Language",
    ],
    correctAnswer: "HyperText Markup Language",
  };

  // State to track the selected option, submission status, and timer
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Handle when an option is clicked
  const handleOptionClick = (option) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  // Handle when the submit button is clicked
  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="question-container">
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <h3>{questionData.question}</h3>
      <ul className="options-list">
        {questionData.options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            selectedOption={selectedOption}
            submitted={submitted}
            correctAnswer={questionData.correctAnswer}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </ul>
      <button onClick={handleSubmit}>
        {submitted ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default Quiz;
