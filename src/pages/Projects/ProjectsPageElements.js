import styled from "styled-components";

import { FiUser, FiFolderPlus } from "react-icons/fi";
import { ReactComponent as NoProjects } from '../../assets/projects.svg'

export const ProjectsPageContent = styled.div`
    background-color: var(--bg-color);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
`;

export const ProjectPageHeader = styled.div`
    width: 100%;
    /* background-color: red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 1em 2em; */
`;

export const ProjectPageHeaderTextContainer = styled.div`
    padding: 2em 4em;
    /* background-color: blue; */
`

export const Title = styled.h1`
    font-family: 'Arvo', sans-serif;
    font-weight: bold;
    font-size: ${p => p.fs || "44px"};
    margin: 0;
    color: var(--fg-color);
`;
export const UserIcon = styled(FiUser)`
    width: 40px;
    height: 40px;
    padding: .75em;
    border: 3px solid var(--fg-color);
    border-radius: 1em;
    color: var(--fg-color);
    margin-right: 4em;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    /* padding-right: 3em; */
`;

export const Button = styled.button`
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
    border: 2px solid transparent;
        
    &:hover {
        /* transform: scale(1.1); */
        border: 2px solid var(--primary-color);
        color: var(--fg-color);
        background-color: transparent;
    }
`;

export const FolderIcon = styled(FiFolderPlus)`
    width: 1.25em;
    height: 1.25em;
    margin-left: .75em;
`;

export const ProjectsSection = styled.div`
    width: 90%;
    height: 90%;
    /* max-height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    overflow-y: auto;
    margin-top: 2em;
`;

export const NoProjetsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`

export const AuxText = styled.h3`
    color: var(--secondary-color);
    font-family: 'Source Code Pro', sans-serif;
    font-size: 28px;
`;

export const NoProjectsImg = styled(NoProjects)`
    max-height: 50vh; 
`;

export const ProjectsContainer = styled.div`
    /* margin-top: 2em; */
    /* background-color: red; */
    display: flex; 
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
`;

export const TestBox = styled.div`
    background-color: blue;
    width: 200px;
    height: 200px;
    margin: 1em 2em;
`
//Menu icono
export const UserMenu = styled.div`
    border: 1px solid var(--fg-color);
    background-color: var(--bg-color);
    border-radius: .5em;
    padding: 1em 1.5em;
    position: absolute;
    top: 7.5em;
    z-index: 999;
    right: 4em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-height: 8em;
`;