import styled from 'styled-components';
import { FiChevronLeft, FiEdit2, FiTrash } from 'react-icons/fi';

export const ProjectPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    transition: all .3s ease-in-out;
    
    &:hover {
        & .edit_btn, 
        & .delete_btn {
            opacity: 1;
            display: block;
        }
    }
`;

export const HeaderTitle = styled.h1`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 2.5em;
    font-weight: bold;
    text-align: left;
    color: var(--fg-color);
`;

export const HeaderBtn = styled.button`
    display: none;
    opacity: 0;
    padding: 1em;
    border-radius: .5em;
    border: 1px soliid var(--fg-color);
    background-color: var(--bg-color);
    border: 1px solid var(--fg-color);
    transition: all .3s ease-in-out;
    outline-color: none;
    &:hover {
        &.edit_btn {
            border: 1px solid var(--success-color);
        }
        &.delete_btn {
            border: 1px solid var(--danger-color);
        }
        & .edit_icon {
            color: var(--success-color);
        }
        & .delete_icon {
            color: var(--danger-color);
        }
    }
`;

export const EditIcon = styled(FiEdit2)`
    color: var(--fg-color);
    width: 2em;
    height: 2em;
`;

export const DeleteIcon = styled(FiTrash)`
    color: var(--fg-color);
    width: 2em;
    height: 2em;
`;

export const ProjectContentPanel = styled.div`
    /* background-color: blue; */
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
/* position: relative */
`;

export const ProjectCardsContainer = styled.div`
    /* background-color: red; */
    width: 100%;
    height: 100%;
`;

export const ColaboratorsPanel = styled.div`
    position: relative;
    background-color: green;
    width: ${p => p.expand ? "30%" : "0"};
    height: 90%;
    border-radius: .5em 0 0 .5em;
    transition: all .5s ease-in-out;
    `;

export const ExpandPanelButton = styled.button`
    width: 3em;
    height: 3em;
    background-color: transparent;
    border: 1px solid var(--fg-color);
    border-radius: .5em;
    outline: none;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    transform: ${ p => p.expand ? "translate(-50%, -50%);" : "translate(-110%, -50%);" };
    z-index: 9;
`;

export const ExpandIcon = styled(FiChevronLeft)`
    transform: ${p => !p.expand ? "rotate(0deg);" : "rotate(-180deg);"};
    color: var(--fg-color);
    width: 2em;
    height: 2em;
    transition: all .5s ease-in-out;
`
export const TabsContainer = styled.div`
    width: 95%;
    border: 1px solid blue;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

`
export const Tab = styled.button`
background-color: black;
color: white;

`