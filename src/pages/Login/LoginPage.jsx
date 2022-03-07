import React from "react";
import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Button, LoginFromContent, LoginPageContent, Title } from "./LoginPageElements";
import { useHistory } from "react-router-dom";

const LoginPage = () => {

    const history = useHistory();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = (user) => {
        setUser(user);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    const loggin = () => {
        alert(`Usuario: ${user}\nPass:${password}`);
        history.replace("/projects")
    }

    return(
       <LoginPageContent>
           <LoginFromContent>
               <Title>Ingreso</Title>
                <InputField 
                    value={user}
                    onChange={handleUser}
                    label="Usuario/Correo"
                    placeholder="Usuario/Correo"
                    inputWidth="90%"
                    password={false}
                />
                <InputField
                    value={password}
                    onChange={handlePassword}
                    label="Contraseña"
                    placeholder="Contraseña"
                    inputWidth="90%"
                    password={true}
                />
                <Button mt="2em" onClick={loggin}>Ingresar</Button>
           </LoginFromContent>
       </LoginPageContent>
       
    )
}

export default LoginPage;