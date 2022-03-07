import styled from "styled-components";

export const InputWrapper = styled.div`
    position: relative;
    padding: 1em 0;
    /* margin-top: 1em; */
    width: ${p => p.inputWidth || "50%"};
    /* background-color: red; */
`;

export const InputText = styled.input.attrs({ type: 'text'})`
    font-family: 'Source Code Pro', sans-serif;
    width: 100%;
    border: 1px solid var(--secondary-color);
    background-color: var(--bg-color);
    border-radius: 0.25em;
    color: var(--fg-color);
    font-size: 1.25em;
    padding: .5em 1em;
    transition: border-color 0.3s;

    &::placeholder {
        color: var(--secondary-color);
    }

    &:placeholder-shown ~ .form_label {
        font-size: 1em;
        cursor: text;
        top: -.25em;
        left: .5em;
        background-color: transparent;
    }

    &:focus {

        border: 1px solid var(--primaty-color);
        outline: 1px solid var(--primary-color);

        ~ .form_label {
            position: absolute;
            top: -.25em;
            left: 0.75em;
            font-size: 1em;
            color: var(--secondary-color);
            background-color: var(--primary-color);
        }
    }
`;

export const InputLabel = styled.label`
    position: absolute;
    top: -.25em;
    left: 0.75em;
    font-size: 1em;
    /* color: var(--secondary-color); */
    color: transparent;
    /* background-color: var(--primary-color); */
    padding: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
`;

export const InputPass = styled.input.attrs({ type: 'password'})`
    font-family: 'Source Code Pro', sans-serif;
    width: 100%;
    border: 1px solid var(--secondary-color);
    background-color: var(--bg-color);
    border-radius: 0.25em;
    color: var(--fg-color);
    font-size: 1.25em;
    padding: .5em 1em;
    transition: border-color 0.3s;

    &::placeholder {
        color: var(--secondary-color);
    }

    &:placeholder-shown ~ .form_label {
        font-size: 1em;
        cursor: text;
        top: -.25em;
        left: .5em;
        background-color: transparent;
    }

    &:focus {

        border: 1px solid var(--primaty-color);
        outline: 1px solid var(--primary-color);

        ~ .form_label {
            position: absolute;
            top: -.25em;
            left: 0.75em;
            font-size: 1em;
            color: var(--secondary-color);
            background-color: var(--primary-color);
        }
    }
`;