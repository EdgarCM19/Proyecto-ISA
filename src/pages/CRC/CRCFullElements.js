import { Link } from "react-router-dom";
import styled from "styled-components";

export const CRCFullPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const CRCFullContainer = styled.div`
    /* min-width: 30vw; */
    /* max-width: 45vw; */
    width: 35vw;
    height: 92vh;
    transform: translateY(2%);
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 0em 2em;
    position: relative;
`
export const CRCFullTitle = styled.input.attrs({type: 'text'})`
    width: 50%;
    padding: 0.25em 1.5em;
    background-color: var(--masking);
    position: absolute;
    top: -5%;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: 'Arvo', sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: var(--bg-color);
    opacity: 0.9;
    text-align: center;
    border: 1px solid var(--bg-color);
    outline: none;

    &:disabled {
        border: none;
    }

    &:focus {
        border: 3px solid var(--bg-color);
    }
`;

export const CRCFullSectionTitle = styled.h2`
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    font-size: 1.5em;
    padding: 0;
    margin: 0;
    margin-top: 1.5em;
    margin-bottom: .5em;
    width: 100%;
    text-align: left;
`;

export const CRCFullResponsabiliteContainer = styled.div`
    /* background-color: red; */

    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin-top: 1em;
    border-bottom: 3px solid var(--bg-color);
`;
export const CRCFullResponsabilitesSeparator = styled.div`
    margin: 0 1.5em;
    width: 3px;
    height: 105%;
    background-color: var(--bg-color);
`;

export const CRCFullResponsabilitieName = styled.input.attrs({type: 'text'})`
    padding: 0.25em;
    background-color: transparent;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    font-weight: normal;
    color: var(--bg-color);
    opacity: 0.9;
    text-align: center;
    border: 1px solid var(--bg-color);
    outline: none;
    border-radius: .25em;

    &:disabled {
        border: none;
    }

    &:focus {
        border: 3px solid var(--bg-color);
    }
`;

export const CRCFullResponsabilitiesScrollContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`

export const CRCFullNewResponsabilitieButton = styled.button`
    outline: none;
    border: none;
    margin-bottom: .5em;
    padding: .5em 1em;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    border: 2px solid var(--bg-color);
    border-radius: .25em;
    background-color: transparent;
    opacity: ${p => p.canEdit ? "1" : "0"};
    /* scale: 0; */
    transition: all 300ms ease-in-out;

    &:hover {
        background-color: var(--bg-color);
        color: var(--fg-color);
    }
`;

export const CRCFullNewResponsabilitieButtonLink = styled(Link)`
    outline: none;
    border: none;
    margin-bottom: .5em;
    padding: .5em 1em;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    border: 2px solid var(--bg-color);
    border-radius: .25em;
    background-color: transparent;
    opacity: ${p => p.canEdit ? "1" : "0"};
    /* scale: 0; */
    transition: all 300ms ease-in-out;

    &:hover {
        background-color: var(--bg-color);
        color: var(--fg-color);
    }
`;

export const CRCFullButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
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
    margin: 1em 0;
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