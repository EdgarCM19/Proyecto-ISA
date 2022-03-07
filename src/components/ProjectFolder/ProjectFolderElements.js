import styled from 'styled-components'

export const ProjectContent = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    padding: 3em 2em;
    /* height: 250px; */
    /* background-color: green; */
`;

export const Folder = styled.div`
    transition: all 0.5s ease-in-out;
`;

export const FolderBack = styled.div`
    position: relative;
    width: 200px;
    height: 120px;
    background-color: #cca352;
    border-radius: 0 8px 8px 8px;

    &::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 0;
        width: 70px;
        height: 20px;
        background-color: #cca352;
        border-radius: 8px 8px 0 0;
    }
`;

export const Paper = styled.div`
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -10%);
    width: 85%;
    height: 80%;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.4 ease-in-out;
`;

export const FolderFront = styled.div`
    background-color: #ffcc66;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transform-origin: bottom;
    transition: all 0.3 ease-in-out;
`;

export const FolderName = styled.h2`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1.5em;
    color: var(--fg-color);
`;

