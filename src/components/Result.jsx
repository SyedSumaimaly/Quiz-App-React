import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Result(props) {
  const [msg, setmsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.result <= 30) {
      setmsg("Failed!");
    } else if (props.result <= 50) {
      setmsg("Pass!");
    } else if (props.result <= 70) {
      setmsg("Good Job");
    } else if (props.result >= 70) {
      setmsg("Excelent");
    }
  }, []);

  const Quit = () => {
    navigate("/");
  };

  return (
    <div className="main_div">
      <div className="sub_div_result">
        <div className="result_heading">
          <h1>Result</h1>
          <h2>Completed!</h2>
        </div>
        <div>
          <h2>You Scored: {props.result}%</h2>
        </div>
        <div className="msg">
          <h2>{msg}</h2>
        </div>
        <div className="quit_btn_div">
          <Button className="quit_btn" onClick={Quit}>
            Quit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Result;
