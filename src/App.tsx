import "./App.css";
import "./index.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./components/DataProvider";

function App() {
  return (
    <div className="w-screen h-screen flex">
      <Router>
        {/* <Nav /> */}
        <DataProvider />
      </Router>
    </div>
  );
}

export default App;
