import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { 
    RegisterFromContent,
    RegisterPageContent,
    Title,
    Button, 
    RegisterContainer
} from "./RegisterPageElements";

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [apellidoP, setApellidoP] = useState('');
    const [apellidoM, setApellidoM] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setpassConfirm] = useState('');

    return(
        <RegisterPageContent>
           <RegisterFromContent>
               <Title>Registro</Title>
                <RegisterContainer>
                    <InputField
                        label="Nombre(s)"
                        placeholder="Nombre(s)"
                        inputWidth="90%"
                    />
                    <InputField
                        label="Apellido Paterno"
                        placeholder="Apellido paterno"
                        inputWidth="40%"
                    />
                    <InputField
                        label="Apellido Materno"
                        placeholder="Apellido materno"
                        inputWidth="40%"
                    />
                    <InputField
                        label="Contraseña"
                        placeholder="Contraseña"
                        inputWidth="40%"
                    />
                    <InputField
                        label="Confirmar Contraseña"
                        placeholder="Confirmar Contraseña"
                        inputWidth="40%"
                    />
                </RegisterContainer>
                    <Button mt="2em">Ingresar</Button>
           </RegisterFromContent>
       </RegisterPageContent>
    )
}

export default RegisterPage;