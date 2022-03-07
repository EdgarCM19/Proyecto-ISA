import styled from 'styled-components';

export const LoginPageContent = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginFromContent = styled.div`
    background-color: var(--bg-color);
    padding: 2em 4em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    border-radius: 1em;
    width: 40%;
`;

export const Title = styled.h1`
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    font-size: 2.5em;
    color: var(--fg-color);
`;

export const FromContainer = styled.div`


`;

export const Button = styled.button`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1.25em;
    color: var(--bg-color);
    background-color: var(--primary-color);
    padding: .5em 1em;
    border: none;
    border-radius: .5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in-out;
    margin-right: ${p => p.mr || "0" }; 
    margin-top: ${p => p.mt || "0" };

    &:hover {
        /* transform: scale(1.1); */
        border: 2px solid var(--primary-color);
        color: var(--fg-color);
        background-color: transparent;
    }
`;


