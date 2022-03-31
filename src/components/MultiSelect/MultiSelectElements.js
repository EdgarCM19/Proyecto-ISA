import styled from "styled-components";
import { FiChevronDown } from 'react-icons/fi';

export const MultiSelectContainer = styled.div`
    /* background-color: red; */
    width: 90%;
    position: relative;
    /* padding: 1em; */
`;

export const MultiSelectInput = styled.div`
    display: flex;
    align-items: center;
    border: ${p => p.canEdit ? "1px solid var(--bg-color)" : "1px solid transparent"};
    border-radius: .5em;
    justify-content: space-between;
    /* width: 95%; */
    padding: .25em .5em;
`;

export const MultiSelectData = styled.div`
    /* background-color: coral; */
    display: flex;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
    min-width: 7em;
    min-height: 3em;
`;

export const MultiSelectIcon = styled(FiChevronDown)`
    transform: ${p => p.open ? "rotate(180deg)" : "0" };
    transition: all 300ms ease-in-out;
`

export const OpenButton = styled.button`
    display: ${p => p.canEdit? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--bg-color);
    /* height: 2em; */
    /* padding: 1em; */
    /* width: 2em; */
`

export const MultiSelectSelect = styled.select`
    position: absolute;
    z-index: 999;
    border-radius: 0 0 .5em .5em;
    margin-left: .25em;
    max-height: 10em;
    width: 100%;

    & option {
        /* display: none; */
        /* display: inherit; */
        padding: 1em;
        background-color: var(--bg-color);
        color: var(--fg-color);
        font-family: 'Source Code Pro', sans-serif;
        font-weight: 'normal';

        &:hover,
        &:focus {
            background-color: var(--secondary-color);
            color: var(--primary-color);
        }

        &:disabled {
            color: var(--secondary-color);

        }
    }

    &.open {
        display: inherit;
        animation: open .5s ease-in-out;
    }

    &.closed {
        display: inherit;
        visibility: hidden;
        animation: close .5s ease-in-out;
    }

    @keyframes open {
        from {
            visibility:hidden;
            max-height: 0; 
        }
        to {
            visibility:visible;
            max-height: 10em;
        }
    }

    @keyframes close {
        100% {
            visibility:hidden;
            max-height: 0; 
        }
        0% {
            visibility:visible;
            max-height: 5.5em;
        }
    }
`;

// CHIPS

export const ChipContainer = styled.div`
    display: flex;
    padding: .5em;
    justify-content: start;
    align-items: center;
    background-color: var(--primary-color);
    color: (--bg-color);
    border: 1px solid var(--bg-color);
    border-radius: .5em;
    margin-left: .5em;
    border: 2px solid transparent;


    &:hover {
        border: ${p => p.canEdit ? '2px solid var(--bg-color)' : 'none'}
    }
`;

export const ChipName = styled.span`
    font-family: 'Source Code Pro', sans-serif;
    font-size: 1em;
    font-weight: normal;
    color: var(--bg-color);
`;

export const ChipBtn = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    display: ${p => p.canEdit? 'flex' : 'none'};
    font-size: 1em;
    /* padding: .25em; */
    margin-left: .5em;
`;