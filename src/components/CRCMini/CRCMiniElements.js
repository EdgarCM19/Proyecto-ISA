import styled from "styled-components";

export const CRCMiniContainer = styled.div`
    width: 18em;
    height: 15em;
    background-color: var(--primary-color);
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    border-radius: .5em;
    margin: 2em 0em;
`

export const CRCMiniTitle = styled.h2`
    width: 50%;
    padding: 0.25em 1.5em;
    background-color: var(--masking);
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: 'Arvo', sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    color: var(--bg-color);
    opacity: 0.9;
    text-align: center;
`;

export const CRCMiniSectionTitle = styled.h1`
    /* position: relative; */
    margin: 0;
    padding: 0;
    font-family: 'Arvo', sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    width: 90%;
    margin-top: 1.5em;
    /* margin-left: 1em; */
`;

export const CRCMiniList = styled.span`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    font-weight: normal;
    width: 80%;
`