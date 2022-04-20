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
// [ ] Que los proyectos de otros ingenieros no salgan en la cuenta de otro
// [ ] Cargar la lista de colaboradores dados de alta en el proyecto como opciones para el select de colabs en las historias de usuario y las CRC
// [ ] Sustituir "[Usuario]" por el nombre del usuario
// [ ] Checar que a veces en las tarjetas CRC se duplican las tarjetas y/o cambian su titulo al mismo 
// [ ] Asignar y cambiar en el login el tipo se usuario mediante el sessionStorage (ahorita esta en local pero hay que cambiarlo a session) y recuperarlo en 
//      - Projectos
//      - Projecto individual
//      - Tarjeta CRC
//      - Historias de usuario
// Igual cambiar la parte de "logged" de local a session


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
