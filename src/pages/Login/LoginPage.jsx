import React from "react";
import { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Button, LoginFromContent, LoginPageContent, Title } from "./LoginPageElements";
import { useHistory } from "react-router-dom";
import { getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
import db from '../../firebaseConfig'

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
        .then(async (userCredential) => {
            let ref = collection(db, "users" )
            try{
                const q = query(ref, where('uid', '==' , userCredential.user.uid));
                const user = await getDocs(q);
                user.docs.map((res)=>{
                    localStorage.setItem('uid', userCredential.user.uid)
                    localStorage.setItem('user-type', res.data().usertype);
                    localStorage.setItem('name', res.data().name)
                    localStorage.setItem('logged', true);
                    return 0;
                })
            } catch(err){
            }
        
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