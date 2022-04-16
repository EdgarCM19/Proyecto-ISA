import React, { useState, useEffect } from "react";
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

import { addDoc, collection, getDocs, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../../firebaseConfig'
import { getDatabase } from "firebase/database";

const UserHistoryFull = () => {

    const usertype = localStorage.getItem('user-type');

    const history = useHistory();
    const location = useLocation();
    const {id, _new, doc_name, fire} = location.state

    const [canEdit, setcanEdit] = useState(_new);

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(0);
    const [time, setTime] = useState(0);
    const [historyNumber, setHistoryNumber] = useState(0);
    const [timeOption, setTimeOption] = useState("dias");
    const [description, setDescription] = useState('');
    const [observations, setObservations] = useState('');
    const [date, setDate] = useState('');

    const handleTitle = (title) => {setTitle(title.target.value)};
    const handleHistoryNumber = (histnum) => setHistoryNumber(histnum.target.value);
    const handlePriority = (priority) => setPriority(priority.target.value);
    const handleTime = (time) => setTime(time.target.value);
    const handleTimeOption = (option) => setTimeOption(option);
    const handleDescription = (description) => setDescription(description.target.value);
    const handleObservations = (observations) => setObservations(observations.target.value);

    const editUserHistory = () => { setcanEdit(!canEdit)};
    const deleteUserHistory = async  () => {
        await deleteDoc(doc(db, 'projects', doc_name, 'historyData', fire));
        history.goBack();
    };
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
            date: date !== '' ? date : new Date().getUTCDay()+"/"+new Date().getUTCMonth()+"/"+new Date().getUTCFullYear(),
        }
        if( title !== '' &&   description !== '' && observations !== '' &&historyNumber !== 0  &&
            priority !== 0 && time !== 0){
                if(_new){
                    await addDoc(collection(db, 'projects', doc_name, 'historyData'), aux).then(()=>{})
                }else{
                    const ref = doc(db, 'projects', doc_name, 'historyData', fire);

                    // Set the "capital" field of the city 'DC'
                    await updateDoc(ref, {
                        historyName: title, 
                        description: description,
                        observations: observations,
                        historyNum: historyNumber,
                        priority: priority,
                        time: time,
                        timeOption: timeOption
                    });
                }
              history.goBack();
            }else{
                alert("Existen campos vacios");
            }
        
    }

    useEffect(() => {
        if(fire!==null && fire !== undefined){
            getData()
        }
    }, [])
    const getData =  async ()=>{
        let ref = collection(db, 'projects', doc_name, "historyData")
        const data = await getDocs(ref, where('historyNum', '==', parseInt(id)))
        data.forEach(res=>{
            if(res.data().historyNum===id){
                console.log(res.data().historyNum, id);
                setTitle(res.data().historyName);
                setPriority(res.data().priority);
                setTime(res.data().time);
                setHistoryNumber(res.data().historyNum);
                setTimeOption(res.data().timeOption);
                setDescription(res.data().description);
                setObservations(res.data().observations);
                setDate(res.data().date);
                console.log("entro")
            }
        })
    }

    //Se hace la peticion de la historia de usuario mediante el ID y se obtienen los datos

    return (
        <UserHistoryFullPage>
            <UserHistoryFullContainer>
                <UserHistoryFullTitle disabled={!canEdit}  placeholder={"Nombre"} onChange={handleTitle} value={title}/>
                <UserHistoryFullInfoContainer>
                    <UserHistoryFullInfoText>#: <UserHistoryFullInfoInput disabled={!canEdit} style={{width:'30px'}} onChange={handleHistoryNumber} value={historyNumber}/></UserHistoryFullInfoText>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Prioridad:</UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit} onChange={handlePriority} value={priority}/>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>Tiempo: </UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit} onChange={handleTime} value={time} />
                        <UserHistoryFullSelect disabled={!canEdit} name="periodo" id="perioso" >
                            <UserHistoryFullSelectOption value="dias">Días</UserHistoryFullSelectOption>
                            <UserHistoryFullSelectOption value="semanas">Semanas</ UserHistoryFullSelectOption>
                        </UserHistoryFullSelect>
                    </UserHistoryFullInfoItem>
                    <UserHistoryFullInfoText>Fecha: {date !== '' ? date : '00/00/00'}</UserHistoryFullInfoText>
            
                </UserHistoryFullInfoContainer>
                <UserHistoryFullSectionTitle>Descripcion</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="5" onChange={handleDescription} value={description}/>
                <UserHistoryFullSectionTitle>Observaciones</UserHistoryFullSectionTitle>
                <UserHistoryFullSectionText disabled={!canEdit} rows="3" onChange={handleObservations} value={observations}/>
            </UserHistoryFullContainer>

            <UserHistoryFullButtonsContainer>
                { usertype === 'L' ?
                <>
                <RoundedButton onClick={editUserHistory} className='edit_btn' active={canEdit}>
                { _new ?
                    <FiCheck />
                :
                <FiEdit2 /> }
                </RoundedButton>
                <RoundedButton onClick={saveUserHistory} className='save'><FiSave /></RoundedButton>
                { !_new ? <RoundedButton onClick={deleteUserHistory} className='delete_btn'><FiTrash /></RoundedButton> : ""}
                </> : 
                <RoundedButton onClick={saveUserHistory} className='edit_btn' active={canEdit}><FiCheck /></RoundedButton>
                }
            </UserHistoryFullButtonsContainer>
        </UserHistoryFullPage>
   );
}

export default UserHistoryFull;