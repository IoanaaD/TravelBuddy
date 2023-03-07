import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage/Homepage";
import ResultsPage from "./views/ResultsPage/ResultsPage";
import FormDataProvider from "./context/FormDataProvider";
import CalculatedDistancesProvider from "./context/CalculatedDistancesProvider";

function App() {
  return (
    <>
      <FormDataProvider>
        <CalculatedDistancesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/results" element={<ResultsPage />}></Route>
            </Routes>
          </Router>
        </CalculatedDistancesProvider>
      </FormDataProvider>
    </>
  );
}

export default App;
