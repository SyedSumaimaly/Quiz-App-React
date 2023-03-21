import Result from "./Result";
import ProgressBar from "@ramonak/react-progress-bar";
import decodeUriComponent from "decode-uri-component";
import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";
import data from "../questions.json";
import Countdown from "./Countdown";
import swal from "sweetalert";
import Rating from "@mui/material/Rating";

function Quiz() {
  const [currentquestion, setcurrentquestion] = useState(0);
  const [corretanswer, setcorectanswer] = useState(0);
  const [showresult, setshowresult] = useState(false);
  const [correctAnsMsg, setCorrectAnsMsg] = useState("");
  const [Difficulty, setDifficulty] = useState(0);
  const [disabled, setdisabled] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  let [questionTime, setQuestionTime] = useState(10);
  let [Attempted, setAttempted] = useState(false);
  let [stopTimer, setStopTimmer] = useState(false);
  let [SelectedOption, setSelectedOption] = useState("");

  var multiply = corretanswer * 100;
  var result = multiply / data.length;

  const checkDifficulty = () => {
    if (data.length > 0) {
      const levels = data[currentquestion].difficulty;
      levels === "hard"
        ? setDifficulty(3)
        : levels === "medium"
        ? setDifficulty(2)
        : setDifficulty(1);
    }
  };

  const handleNext = () => {
    let nextquestion = currentquestion + 1;
    setStopTimmer(false);
    setAttempted(false);
    setCorrectAnsMsg("");

    if (nextquestion < data.length) {
      setcurrentquestion(nextquestion);
      setdisabled(false);
    } else {
      setshowresult(true);
    }

    if (Attempted == " ") {
      swal("Please select an option first");
      setcurrentquestion(currentquestion);
    }
  };

  const correctAnswer = (ans) => {
    if (Attempted && ans === data[currentquestion].correct_answer) {
      return " option_btn_true";
    }
    if (
      Attempted &&
      SelectedOption === ans &&
      SelectedOption !== data[currentquestion].correct_answer
    ) {
      return " option_btn_false";
    }
  };

  const handleCountdown = () => {
    if (currentquestion === data.length - 1) {
      setStopTimmer(true);
      setshowresult(true);
      setAttempted(true)
    } else {
      setcurrentquestion(currentquestion + 1);
      setAttempted(false);
      setdisabled(false);
    }
  };

  const handleAnswer = (e) => {
    setAttempted(true);
    setSelectedOption(e.target.value);

    if (e.target.value === data[currentquestion].correct_answer) {
      setCorrectAnsMsg("Correct!");
      setcorectanswer(corretanswer + 1);
      setdisabled(true);
    } else {
      setdisabled(true);
      setCorrectAnsMsg("Sorry!");
    }
  };

  useEffect(() => {
    checkDifficulty();
    let answers = arrayShuffle([
      ...data[currentquestion].incorrect_answers,
      data[currentquestion].correct_answer,
    ]);
    setAllOptions(answers);
  }, [currentquestion]);

  return (
    <div className="main_div">
      {showresult ? (
        <Result result={result} />
      ) : (
        <>
          <div className="sub_div ">
            <div className="header">
              <div>
                <h6>
                  Category: {decodeUriComponent(data[currentquestion].category)}
                </h6>
                <div className="rating">
                  <Rating
                    name="read-only"
                    value={Difficulty}
                    readOnly
                    size="small"
                  />
                </div>
                <h3>
                  Question {currentquestion + 1} of {data.length}
                </h3>
              </div>
              <div className="counter_div">
                <Countdown
                  startingSeconds={questionTime}
                  stopTimer={stopTimer}
                  func={handleCountdown}
                />
              </div>
            </div>

            <div className="Questions_div">
              <p>{decodeUriComponent(data[currentquestion].question)}</p>
            </div>

            <div className="options_main">
              <div className="Options">
                {allOptions.map((ans, i) => {
                  return (
                    <>
                      <button
                        className={"option_btn " + correctAnswer(ans)}
                        key={i}
                        disabled={disabled}
                        value={ans}
                        onClick={handleAnswer}
                      >
                        {decodeUriComponent(ans)}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>

            <div className="Option_Result_div">
              <h1>{correctAnsMsg}</h1>
            </div>
            <div className="next_btn_div">
              <button onClick={handleNext} className="Next_btn">
                Next
              </button>
            </div>
            <div className="score_board">
              <h6>Score:{result}%</h6>
              <h6>Max-Score: 100%</h6>
            </div>
            <div>
              <ProgressBar completed={result} maxCompleted={100} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
