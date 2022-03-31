import React, { useState } from "react";
import styled from 'styled-components';
import CRCMini from "../components/CRCMini/CRCMini";
import UserHistoryMini from "../components/UserHistoryMini/UserHistoryMini";
import CRCFull from "./CRC/CRCFull";
// import MultiSelect from "../components/MultiSelect/MultiSelect";
// import UserHistoryFull from "./UserHistory/UserHistoryFull";
// import { UserHistoryContainer } from "./UserHistory/UserHistoryFullElements";

const TestPage = () => {

  const [canEdit, setCanEdit] = useState(true);

  const toggleEditable = () => setCanEdit(!canEdit);

    const options = ['Opcion 1', 'Opcion 2', 'Opcion 3','Opcion 4','Opcion 5',];
    
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectedOptions = (selected) => setSelectedOptions([...selected]);

    return (
        <TestPageContainer>
            {/* <h1>Pagina de tests</h1> */}
            {/* <UserHistoryFull canEdit={canEdit}/> */}
            {/* <button onClick={toggleEditable}>Editable</button>
            <TestContainer>
                <MultiSelect handleSelected={handleSelectedOptions}  options={options} canEdit={canEdit}/>
            </TestContainer>
            <p>{selectedOptions}</p> */}
            {/* <CRCFull _new={false}/> */}
            <UserHistoryMini 
                name={'Clase 1'}
                number="1"
                priority={0}
                time="3 dias"
                date="00/00/00"
            />

            <CRCMini
                name={'Clase 1'}
                superClasses={['Super 1', 'Super 2', 'Super 3']}
                subClasses={['Sub 1', 'Sub 2', 'Sub 3']}
            />

        </TestPageContainer>
    );
}

export default TestPage;

const TestPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & p {
        color: #fff;
    }
`

const TestContainer = styled.div`
    width: 50%;
    /* background-color: green; */
`