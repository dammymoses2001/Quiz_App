import React, { useState, useEffect } from 'react';
import QuizeData from '../quizeData';

export default function Quize() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState({ answer: null, index: null });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [quizeEnd, setQuizeEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(true);
  const [selectedAnswers, setSelectedAnswer] = useState([]);

  //   const Load = () => {
  //     setQuestion(QuizeData[currentIndex].question);
  //     setOptions(QuizeData[currentIndex].option);
  //     setAnswer(QuizeData[currentIndex].answer);
  //   };
  useEffect(() => {
    async function Load() {
      setQuestion(QuizeData[currentIndex].question);
      setOptions(QuizeData[currentIndex].option);
      setAnswer(QuizeData[currentIndex].answer);
    }
    Load();
  }, [currentIndex]);

  //   useEffect(() => {
  //     effect;
  //     return () => {
  //       cleanup;
  //     };
  //   }, [input]);
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    if (userAnswer.answer === answer) {
      setScore(score + 5);
    }
    setDisable(true);
    setSelectedAnswer([...selectedAnswers, { ...userAnswer }]);
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    // if (userAnswer === answer) {
    //   setScore(score + 5);
    // }
    setDisable(false);
    //setSelectedAnswer([...selectedAnswers, { ...userAnswer }]);
  };
  const handleFinish = () => {
    // setCurrentIndex(currentIndex + 1);
    if (userAnswer.answer === answer) {
      setScore(score + 5);
    }
    setDisable(true);
    setQuizeEnd(true);
    setSelectedAnswer([...selectedAnswers, { ...userAnswer }]);
  };

  const handleAnswer = (answer, index) => {
    setUserAnswer({ answer, index });
    setDisable(false);
  };
  // console.log(selectedAnswers);

  if (quizeEnd) {
    return (
      <div>
        <h1>Game Over. Final Score is {score} points</h1>
        <p>The correct Answers for the quize are</p>
        <ul>
          {QuizeData.map((item, index) => (
            <li className='options' key={index}>
              <h4> {`Questions: ${item.question}`}</h4>
              <p>{`Answer: ${item.answer}`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h3>{`Question ${QuizeData.length} of ${currentIndex + 1}`}</h3>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <p
          key={index}
          className={`options ${
            userAnswer.answer === option ? 'selected' : null
          }`}
          onClick={() => handleAnswer(option, QuizeData[currentIndex])}
        >
          {option}
        </p>
      ))}
      {currentIndex < QuizeData.length - 1 && (
        <button onClick={handleNext} disabled={disable}>
          Next
        </button>
      )}
      {currentIndex === QuizeData.length - 1 && (
        <button onClick={handleFinish} disabled={disable}>
          Finish
        </button>
      )}
      {currentIndex > 0 && <button onClick={handlePrevious}>Previous</button>}
    </div>
  );
}
