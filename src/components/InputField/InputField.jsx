import React from "react";
import { InputLabel, InputPass, InputText, InputWrapper } from "./InputFieldElements";

const InputField = ({value, label, placeholder, onChange, password, required, inputWidth}) => {

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value)
    }

    return (
        <InputWrapper inputWidth={inputWidth} >
            { !password ? (
            <InputText 
                value={value}
                defaultValue={value}
                placeholder={placeholder} 
                onChange={handleChange}
            />
            ) : (
            <InputPass 
                value={value}
                defaultValue={value}
                placeholder={placeholder} 
                onChange={handleChange}
            />
            )}
            <InputLabel className="form_label">
                {label}
            </InputLabel>
        </InputWrapper>
    )
};

export default InputField;