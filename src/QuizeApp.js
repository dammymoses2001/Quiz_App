import React, { Component } from 'react';
import QuizData from './quizeData';
import './App.css';

export default class QuizeApp extends Component {
  state = {
    userAnswer: null,
    currentIndex: 0,
    options: [],
    quizeEnd: false,
    score: 0,
    disabled: true,
  };

  componentDidMount() {
    this.loadQuiz();
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;

    this.setState(() => ({
      question: QuizData[currentIndex].question,
      options: QuizData[currentIndex].option,
      answer: QuizData[currentIndex].answer,
    }));
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  previousQuestionHandler = () => {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
      userAnswer: null,
    });
  };

  finishHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizeEnd: true,
      });
    }
  };

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex !== prevState.currentIndex) {
      this.setState(() => {
        return {
          disabled: true,
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].option,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }

  render() {
    // console.log(QuizData);
    const {
      question,
      options,
      currentIndex,
      userAnswer,
      quizeEnd,
    } = this.state;
    console.log(this.state);
    if (quizeEnd) {
      return (
        <div>
          <h1>Game Over. Final Score is {this.state.score} points</h1>
          <p>The correct Answers for the quize are</p>
          <ul>
            {QuizData.map((item, index) => (
              <li className='options' key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h2>Quize App</h2>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map((option, index) => (
          <p
            key={index}
            className={`options ${userAnswer === option ? 'selected' : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {currentIndex < QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}

        {currentIndex === QuizData.length - 1 && (
          <button disabled={this.state.disabled} onClick={this.finishHandler}>
            Finish
          </button>
        )}
      </div>
    );
  }
}
