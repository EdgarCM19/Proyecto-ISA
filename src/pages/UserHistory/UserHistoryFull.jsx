import React, { useState } from "react";
import {
    RoundedButton,
    UserHistoryFullButtonsContainer,
    UserHistoryFullContainer,
    UserHistoryFullInfoContainer,
    UserHistoryFullInfoInput,
    UserHistoryFullInfoItem,
    UserHistoryFullInfoText,
    UserHistoryFullPage,
    UserHistoryFullSectionText,
    UserHistoryFullSectionTitle,
    UserHistoryFullSelect,
    UserHistoryFullSelectOption,
    UserHistoryFullTitle
} from "./UserHistoryFullElements";
import { FiEdit2, FiTrash, FiCheck, FiSave} from 'react-icons/fi';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import db from '../../firebaseConfig'

const UserHistoryFull = () => {

    const history = useHistory();
    const location = useLocation();
    const {id, _new, doc_name} = location.state

    const [canEdit, setcanEdit] = useState(_new);

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(0);
    const [time, setTime] = useState(0);
    const [historyNumber, setHistoryNumber] = useState(0);
    const [timeOption, setTimeOption] = useState("dias");
    const [description, setDescription] = useState('');
    const [observations, setObservations] = useState('');

    const handleTitle = (title) => {setTitle(title.target.value)};
    const handleHistoryNumber = (histnum) => setHistoryNumber(histnum.target.value);
    const handlePriority = (priority) => setPriority(priority.target.value);
    const handleTime = (time) => setTime(time.target.value);
    const handleTimeOption = (option) => setTimeOption(option);
    const handleDescription = (description) => setDescription(description.target.value);
    const handleObservations = (observations) => setObservations(observations.target.value);

    const editUserHistory = () => { setcanEdit(!canEdit)};
    const deleteUserHistory = () => {};
    const saveUserHistory = async () => {
        let aux = {
            id: new Date().getTime(), 
            historyName: title, 
            description: description,
            observations: observations,
            historyNum: historyNumber,
            priority: priority,
            time: time,
            timeOption: timeOption,
            date: new Date().getUTCDay()+"/"+new Date().getUTCMonth()+"/"+new Date().getUTCFullYear(),
        }
        if( title !== '' &&   description !== '' && observations !== '' &&historyNumber !== 0  &&
            priority !== 0 && time !== 0){
                await addDoc(collection(db, 'projects', doc_name, 'historyData'), aux).then(()=>{
                })
              history.goBack();
            }else{
                alert("Existen campos vacios");
            }
        
    }

    //Se hace la peticion de la historia de usuario mediante el ID y se obtienen los datos

    return (
        <UserHistoryFullPage>
            <UserHistoryFullContainer>
                <UserHistoryFullTitle disabled={!canEdit}  placeholder={"Nombre"} onChange={handleTitle}/>
                <UserHistoryFullInfoContainer>
                    <UserHistoryFullInfoText>#: <UserHistoryFullInfoInput disabled={!canEdit} style={{width:'30px'}} onChange={handleHistoryNumber} /></UserHistoryFullInfoText>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Prioridad:</UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit} onChange={handlePriority}/>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Tiempo: </UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit} onChange={handleTime}/>
                        <UserHistoryFullSelect disabled={!canEdit} name="periodo" id="perioso">
                            <UserHistoryFullSelectOption value="dias">Días</UserHistoryFullSelectOption>
                            <UserHistoryFullSelectOption value="semanas">Semanas</ UserHistoryFullSelectOption>
                        </UserHistoryFullSelect>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoText>Fecha: 00/00/00</UserHistoryFullInfoText>
            
                </UserHistoryFullInfoContainer>
                <UserHistoryFullSectionTitle>Descripcion</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="5" onChange={handleDescription}/>
                <UserHistoryFullSectionTitle>Observaciones</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="3" onChange={handleObservations}/>
            </UserHistoryFullContainer>

            <UserHistoryFullButtonsContainer>
                <RoundedButton onClick={editUserHistory} className='edit_btn' active={canEdit}>
                { _new ?
                    <FiCheck />
                :
                <FiEdit2 /> }
                </RoundedButton>
                <RoundedButton onClick={saveUserHistory} className='save'><FiSave /></RoundedButton>
                <RoundedButton onClick={deleteUserHistory} className='delete_btn'><FiTrash /></RoundedButton>
            </UserHistoryFullButtonsContainer>
        </UserHistoryFullPage>
   );
}

export default UserHistoryFull;