import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
// import Quiz from "./Quiz";

function Screen() {
  const navigate = useNavigate();

  const nextScreen = () => {
    navigate("/quiz");
  };

  return (
    <div className="mainBox">
      <div className="sub_div_main">
        <div className="instructionHeading">
          <h4>General Guidelines</h4>
        </div>

        <ul className="instructions">
          <li>You will only have 10 seconds per question.</li>
          <li>Once you select your answer, you can't reselect it.</li>
          <li>When time expires, you are unable to select any choice.</li>
          <li>You cannot leave the Quiz once you have begun it.</li>
          <li>You will get point on the basis of your correct answers.</li>
        </ul>

        <div className="instructionsBtnBox">
          <Button onClick={nextScreen} type="primary">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Screen;
