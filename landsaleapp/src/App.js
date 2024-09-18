import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import PropertSale from "./pages/PropertyForSale.js";
import PropertyRent from "./pages/PropertyToRent.js";
import ResultforSale from "./pages/ResultsforSale.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-for-sale" element={<PropertSale />} />
          <Route path="/property-to-rent" element={<PropertyRent />} />
          <Route path="/result-property-to-sale" element={<ResultforSale />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
