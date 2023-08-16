import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar.component";
import LandingComponent from "./components/landing.component";
import "./App.css";
import DefaultPage from "./components/DefaultPage";
function BGComponent() {
  return (
    <>
      <div className="absolute -z-10 blur-[200px] -bottom-14 -left-24 w-96 h-96 bg-[#32FFE6] rounded-full"></div>
      <div className="absolute -z-10 blur-[200px] max-xl:-right-[50%] xl:-right-[15%] -top-1/4 w-[973px] h-[1000px] bg-[#2CA6FF] opacity-70 rounded-full max-md:hidden md:block"></div>
      <div className="absolute -z-10 blur-[200px] bottom-0 right-0 w-96 h-96 bg-[#CA32FF] rounded-full max-md:hidden md:block"></div>
    </>
  );
}

function App() {
  
  return (
    <>
      <Router>
        <div className="relative h-screen overflow-x-hidden lg:overflow-hidden">
          <NavbarComponent/>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LandingComponent />

                  <BGComponent />
                </>
              }
            />
            <Route
              path="/:_id"
              element={
                <>
                  <DefaultPage />
                  <BGComponent />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
