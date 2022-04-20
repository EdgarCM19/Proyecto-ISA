import styled from 'styled-components';

export const UserHistoryFullPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const UserHistoryFullContainer = styled.div`
    margin-top: 5em;
    width: 70%;
    height: 72%;
    background-color: var(--primary-color);
    border-radius: 1em;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`;

export const UserHistoryFullTitle = styled.input.attrs({type: 'input'})`
    padding: 0.25em 1.5em;
    background-color: var(--masking);
    position: absolute;
    top: -8%;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: 'Arvo', sans-serif;
    font-size: 2.5em;
    font-weight: bold;
    color: var(--bg-color);
    opacity: 0.9;
    text-align: center;
    border: 1px solid var(--bg-color);
    outline: none;
    resize: none;
    &:disabled {
        border: 1px solid transparent;
    }

    &:focus {
        border: 3px solid var(--bg-color);
    }
`;

export const UserHistoryFullInfoContainer = styled.div`
    /* background-color: blue;    */

    margin-top: 3em;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const UserHistoryFullInfoItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
    margin: 0;
    padding: 0;
    /* width: auto; */
    max-width: 20%;
`

export const UserHistoryFullInfoText = styled.span`
    color: var(--secondary-color);
    font-size: 1.5em;
    font-family: 'Source Code Pro', sans-serif;
    font-weight: bold;
`;

export const UserHistoryFullInfoInput = styled.input.attrs({type: 'number'})`
    border: 1px solid var(--bg-color);
    border-radius: .25em;
    outline: none;
    /* padding: .5em .75em; */
    padding: 0 .5em;
    max-width: 20%;
    background-color: transparent;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.5em;
    font-weight: normal;
    width: 3em;
    border: 1px solid transparent;
    /* display: block; */

    &:disabled {
        border: none;
    }

    &:focus { 
        border: 2px solid var(--bg-color);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

export const UserHistoryFullSectionTitle = styled.h1`
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    color: var(--bg-color);
    width: 90%;
    margin-top: .75em;
    padding: 0;
`

export const UserHistoryFullSectionText = styled.textarea`
    font-family: 'Source Code Pro', sans-serif;
    font-weight: 400;
    font-size: 1.25em;
    width: 85%;
    /* max-height: 20%; */
    resize: none;
    background-color: transparent;
    padding: .5em 1em;
    text-indent: 2em;
    margin: 0;
    border: 1px solid var(--bg-color);
    border-radius: 1em;
    
    &:focus {
        outline: none;
        border-radius: 1em;
        border: 3px solid var(--bg-color);
    }
    
    &:disabled {
        border: none;
    }
`;

export const UserHistoryFullSelect = styled.select`
    margin-left: .25em;
    /* appearance: none; */
    /* width: 10em; */
    border: 1px solid var(--bg-color);
    outline: 0;
    background-color: transparent;
    color: var(--bg-color);
    font-family: 'Source Code Pro';
    font-size: 1.25em;
    padding: .25em .5em;
    border-radius: .5em;

    &:disabled { 
        appearance: none;
        border: none;
        color: var(--bg-color);
        opacity: 1;
    }
`;

export const UserHistoryFullSelectOption = styled.option`
    background-color: transparent;
    /* appearance: none; */
`;

export const UserHistoryFullButtonsContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    width: 40%;
    /* background-color: red; */
`

export const RoundedButton = styled.button`
    padding: .5em;
    width: 2em;
    height: 2em;
    border-radius: .5em;
    border: 1px soliid var(--fg-color);
    background-color: var(--bg-color);
    /* border: 1px solid var(--fg-color); */
    border: ${p => p.active ? "1px solid var(--success-color);" : "1px solid var(--fg-color);" };
    /* transform: scale(0); */
    font-size: 1.5em;
    transition: all .3s ease-in-out;
    outline-color: none;
    margin: 1em;
    color: ${p => p.active ? "var(--success-color)" : "var(--fg-color)" };


    &:hover {
        &.edit_btn {
            border: 1px solid var(--success-color);
            color: var(--success-color);
        }
        &.delete_btn {
            border: 1px solid var(--danger-color);
            color: var(--danger-color);
        }
    }
`;
