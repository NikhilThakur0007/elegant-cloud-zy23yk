import "./styles.css";
import { React } from "react";
import Calendar from "../src/components/Calendar";

const App = () => {
  const onChange = (ranges) => {
    console.log(ranges);
  };

  return (
    <div className="App">
      <Calendar onChange={onChange} />
    </div>
  );
};
export default App;
