import styled from 'styled-components';
import { FiChevronLeft, FiEdit2, FiTrash, FiUserPlus, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ProjectPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
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
            transform: scale(1);
        }

        & .header_title {
            color: var(--fg-color);
        }
    }
`;

export const HeaderTitle = styled.h1`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 2.5em;
    font-weight: bold;
    text-align: left;
    transition: color .3s ease-in-out;
    color: var(--secondary-color);
`;

export const HeaderBtn = styled.button`
    padding: 1em;
    border-radius: .5em;
    border: 1px soliid var(--fg-color);
    background-color: var(--bg-color);
    border: 1px solid var(--fg-color);
    transform: scale(0);
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
    // background-color: blue;
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

export const ProjectCardsHeader = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    /* background-color: blue; */
`;

export const ProjectCardsHeaderButton = styled.button`
    font-size: 1.25em;
    color: var(--bg-color);
    background-color: var(--primary-color);
    padding: .5em 1em;
    border: 2px solid transparent;
    border-radius: .5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in-out;
    margin-right: 1.5em; 
    margin-top: ${p => p.mt || "0" };

    &:hover {
        /* transform: scale(1.1); */
        border: 2px solid var(--primary-color);
        color: var(--fg-color);
        background-color: transparent;
    }
`;

export const ProjectCardsHeaderButtonLink = styled(Link)`
    font-size: 1.25em;
    color: var(--bg-color);
    background-color: var(--primary-color);
    padding: .5em 1em;
    border: 2px solid transparent;
    border-radius: .5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s ease-in-out;
    margin-right: 1.5em; 
    text-decoration: none;
    margin-top: ${p => p.mt || "0" };

    &:hover {
        /* transform: scale(1.1); */
        border: 2px solid var(--primary-color);
        color: var(--fg-color);
        background-color: transparent;
    }
`;

export const TabsContainer = styled.div`
    width: 90%;
    margin-top: .5em;
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

`;
export const Tab = styled.button`
    background-color: var(--bg-color);
    padding: 1em;
    font-size: 1.5em;
    font-family: 'Source Code Pro';
    font-weight: normal;
    border: none;
    outline: none;
    width: 50%;
    color: var(--fg-color);
    border-radius: 1em 1em 0 0;

    &.active {
        background-color: #599895;
    }

`;

export const TabsContentPanel = styled.div`
    width: 100%;
    flex-direction: column;
    flex: 1;
    height: 85%;
    /* -------------------------- */
`;

export const TabContentCointainer = styled.div`
    width: 100%;
    height: 100%;
    display: none;
    background-color: #A5D8D6;
    overflow-y: auto;
    border-radius: ${ p => p.tab === 0 ? 
        '0 1em 1em 1em' : '1em 0 1em 1em'
    };

    &.active {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
    }
`


export const ColaboratorsPanel = styled.div`
    position: relative;
    background-color: var(--primary-color);
    /* border: ${ p => p.expand ? "2px solid var(--fg-color);" : "none" }; */
    width: ${ p => p.expand ? "30%" : "10%"};
    border: 1px solid var(--fg-color);
    /* width: 30%; */
    transform: ${ p => p.expand ? "translateX(0);" : "translateX(101%)" };
    height: 80%;
    border-radius: .5em 0 0 .5em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* overflow-x: hidden; */
    transition: all .5s ease-in-out;
    `;

export const ExpandPanelButton = styled.button`
    width: 3em;
    height: 3em;
    background-color: var(--bg-color);
    border: 1px solid var(--fg-color);
    border-radius: .5em;
    outline: none;
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    /* transform: ${ p => p.expand ? "translate(-20%, -50%);" : "translate(-110%, -50%);" }; */
    transform: ${ p => p.expand ? "translateX(-50%);" : "translateX(-120%);" };
    z-index: 9;
    transition: all .5s ease-in-out;
`;

export const ExpandIcon = styled(FiChevronLeft)`
    transform: ${p => !p.expand ? "rotate(0deg);" : "rotate(-180deg);"};
    color: var(--fg-color);
    width: 2em;
    height: 2em;
    transition: all .5s ease-in-out;
`;


export const ColabsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    /* height: 80%; */
    height: 65%;
    overflow-y: auto;
    width: 90%;
    /* background-color: red; */
`

export const ColabsTitle = styled.h2`
    margin: 0;
    /* padding: .5em 1em; */
    font-family: 'Arvo', sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: var(--bg-color);
`

export const ColabName = styled.h5`
    margin: 0;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1.25em;
    color: var(--secondary-color);
`;

export const  ColabContent = styled.div`
    /* padding: .25em .5em; */
    /* margin-top: .25em; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:hover .c_name {
        color: var(--bg-color);
    }

    &:hover .delete_iconC {
        transform: scale(1);
    }

`;

export const DeleteIconC = styled(FiTrash)`
    color: var(--danger-color);
    padding: .75em;
    width: 1.5em;
    height: 1.5em;
    transform: scale(0);
    transition: all .3s ease-in-out;

    &:hover {
        background-color: var(--danger-color);
        color: var(--fg-color);
        border-radius: .5em;
    }
`;

export const NewColabBtn = styled.button`
    padding: .5em 1em;
    border-radius: .5em;
    border: 1px solid var(--bg-color);
    color: var(--bg-color);
    outline: none;
    font-weight: 500;
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1.25em;
    background-color: VAR(--fg-color);
    margin-bottom: .5em;
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    align-items: center;
    transition: all .3s ease-in-out;
     
    &:hover {
        font-weight: bold;
        background-color: var(--bg-color);
        color: var(--fg-color);
    }
`;

export const NewUserIcon = styled(FiUserPlus)`
    width: 1.25em;
    height: 1.25em;
`

export const BackArrowIcon = styled(FiArrowLeft)`
    width: 1.25em;
    height: 1.25em;
    color: var(--fg-color);
`
