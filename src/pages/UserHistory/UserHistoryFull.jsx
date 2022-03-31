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

const UserHistoryFull = () => {

    const history = useHistory();
    const location = useLocation();
    const {id, _new} = location.state

    const [canEdit, setcanEdit] = useState(_new);

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(0);
    const [time, setTime] = useState(0);
    const [timeOption, setTimeOption] = useState("dias");
    const [description, setDescription] = useState('');
    const [observations, setObservations] = useState('');

    const handleTitle = (title) => setTitle(title);
    const handlePriority = (priority) => setPriority(priority);
    const handleTime = (time) => setTime(time);
    const handleTimeOption = (option) => setTimeOption(option);
    const handleDescription = (description) => setDescription(description);
    const handleObservations = (observations) => setObservations(observations);

    const editUserHistory = () => { setcanEdit(!canEdit)};
    const deleteUserHistory = () => {};
    const saveUserHistory = () => {
      history.goBack();
    }

    //Se hace la peticion de la historia de usuario mediante el ID y se obtienen los datos

    return (
        <UserHistoryFullPage>
            <UserHistoryFullContainer>
                <UserHistoryFullTitle disabled={!canEdit} placeholder="Nombre" value="Nombre"/>
                <UserHistoryFullInfoContainer>
                    <UserHistoryFullInfoText>#: 00</UserHistoryFullInfoText>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Prioridad:</UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit}/>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Tiempo: </UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit}/>
                        <UserHistoryFullSelect disabled={!canEdit} name="periodo" id="perioso">
                            <UserHistoryFullSelectOption value="dias">Días</UserHistoryFullSelectOption>
                            <UserHistoryFullSelectOption value="semanas">Semanas</ UserHistoryFullSelectOption>
                        </UserHistoryFullSelect>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoText>Fecha: 00/00/00</UserHistoryFullInfoText>
            
                </UserHistoryFullInfoContainer>
                <UserHistoryFullSectionTitle>Descripcion</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="5"/>
                <UserHistoryFullSectionTitle>Observaciones</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="3"/>
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