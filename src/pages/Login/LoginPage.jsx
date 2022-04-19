import React from "react";
import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Button, LoginFromContent, LoginPageContent, Title } from "./LoginPageElements";
import { useHistory } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const LoginPage = () => {

    const history = useHistory();
    const auth = getAuth();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = (user) => {
        setUser(user);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    const loggin = async () => {
        await  signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            localStorage.setItem('logged', true);
            //Aqui se verifica con la base de datos para ver si quien esta ingresando tiene rol de ingeniero o de colaborador
            let usertype = 'L'; // O 'C'
            localStorage.setItem('user-type', usertype);
            history.push("/projects");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Credenciales incorrectas');
        });
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