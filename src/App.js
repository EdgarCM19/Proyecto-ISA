import { Redirect } from "react-router-dom";
import { BrowserRouter as Routes, Route, Switch} from "react-router-dom";
import './App.css';
import CRCFull from "./pages/CRC/CRCFull";
import LoginPage from "./pages/Login/LoginPage";
import ProjectPage from "./pages/Project/ProjectPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import RegisterPage from "./pages/Register/RegisterPage";
import TestPage from "./pages/Test";
import UserHistoryFull from "./pages/UserHistory/UserHistoryFull";

//To do:
// [ ] Select para historia de usuario entre dias y semanas.
// [ ] Input para prioridad y nombre de historia de usuario.


function App() {


  const logged = false;


  return (
    <div className="App">

      <Routes>
        <Switch>
            <Route exact path="/">
              { logged ? <Redirect to="/projects" /> : <Redirect to="/login" /> }
            </Route>
            <Route path="/test">
              <TestPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route  exact path="/projects">
              <ProjectsPage />
            </Route>
            <Route path="/projects/:id">
              <ProjectPage />
            </Route>
            <Route path="/crc-card/:id">
              <CRCFull />
            </Route>
            <Route path="/user-history/:id">
              <UserHistoryFull />
            </Route>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
