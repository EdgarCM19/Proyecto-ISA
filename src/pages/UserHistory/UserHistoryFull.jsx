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
import Modal from "../../components/Modal/Modal";
import {
    ContenedorBotones,
    Boton,
    Boton2,
    Boton3,
    Contenido
} from "../../components/Modal/ModalContenidoElements";
import InputField from "../../components/InputField/InputField";

import { FiEdit2, FiTrash, FiCheck, FiSave} from 'react-icons/fi';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { addDoc, collection, getDocs, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from '../../firebaseConfig'
import { getDatabase } from "firebase/database";
import MultiSelect from "../../components/MultiSelect/MultiSelect";

const UserHistoryFull = () => {


    const usertype = localStorage.getItem('user-type');

    const history = useHistory();
    const location = useLocation();
    const {id, _new, doc_name, fire} = location.state

    const [canEdit, setcanEdit] = useState(_new);

    const deleteConfirmHistory = `borrar-historia`; //Se obtiene el nombre de la historia de la base de datos y se pone como "borrar-[nombre]""
    
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(0);
    const [time, setTime] = useState(0);
    const [historyNumber, setHistoryNumber] = useState(0);
    const [timeOption, setTimeOption] = useState("dias");
    const [description, setDescription] = useState('');
    const [observations, setObservations] = useState('');
    const [date, setDate] = useState('');
    const [projectCollabs, setProjectCollabs] = useState([]);
    const [selectedProjectColabs, setSelectedProjectCollabs] = useState([]);
    const [colabs, setColabs] = useState([]);

    // Modal states
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [confirmDeleteModalState, setConfirmDeleteModalState] = useState(false);
    //Inputs states
    const [historyName, setHistoryName] = useState('');
    const [deleteHistoryName, setDeleteHistoryName] = useState('');
    const [loading, setLoading] = useState(true);

    
    const openDeleteModal = () => setDeleteModalState(true);
    const closeDeleteModal = () => setDeleteModalState(false);

    const openconfirmDeleteModal = () => setConfirmDeleteModalState(true);
    const closeConfirmDeleteModal = () => setConfirmDeleteModalState(false);

    const handleTitle = (title) => {setTitle(title.target.value)};
    const handleHistoryNumber = (histnum) => setHistoryNumber(histnum.target.value);
    const handlePriority = (priority) => setPriority(priority.target.value);
    const handleTime = (time) => setTime(time.target.value);
    const handleTimeOption = (option) => setTimeOption(option);
    const handleDescription = (description) => setDescription(description.target.value);
    const handleObservations = (observations) => setObservations(observations.target.value);
    const handleDeleteHistoryName = (name) => setDeleteHistoryName(name);
    const handleSelectedProjectCollabs= (selected) => setSelectedProjectCollabs([...selected]);

    const editUserHistory = () => { setcanEdit(!canEdit)};
    const deleteUserHistory = async  () => {
        await deleteDoc(doc(db, 'projects', doc_name, 'historyData', fire));
        history.goBack();
    };

    const saveUserHistory = async () => {
        let selectedAux = []
        selectedProjectColabs.forEach(element=>{
            let res = colabs.find(co=> co.name === element)
            if(!!res) selectedAux.push(res)
        })

        let aux = {
            id: new Date().getTime(), 
            historyName: title, 
            description: description,
            observations: observations,
            historyNum: historyNumber,
            priority: priority,
            time: time,
            timeOption: timeOption,
            collabs: selectedAux,
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
                        collabs: selectedAux,
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
                setTitle(res.data().historyName);
                setPriority(res.data().priority);
                setTime(res.data().time);
                setHistoryNumber(res.data().historyNum);
                setTimeOption(res.data().timeOption);
                setDescription(res.data().description);
                setObservations(res.data().observations);
                setDate(res.data().date);
                if(res.data().collabs){
                    res.data().collabs.forEach((element)=>{
                        setSelectedProjectCollabs((prev)=>[...prev, element.name]);
                    })
                }
            }
        })
        const dataCol = await getDocs(collection(db, 'projects', doc_name, "colaborators"))
        dataCol.forEach(element=>{
            setProjectCollabs( (prevData)=>[...prevData, element.data().name])
            setColabs((prevData) => [...prevData, {name: element.data().name, id: element.data().uid}])
        })
        setLoading(false);
    }
    if(loading) return( null );
    return (
        <UserHistoryFullPage>
            <UserHistoryFullContainer>
                <UserHistoryFullTitle disabled={!canEdit}  placeholder={"Nombre"} onChange={handleTitle} value={title}/>
                <UserHistoryFullInfoContainer>
                    <UserHistoryFullInfoItem>
                        <UserHistoryFullInfoText>#: </UserHistoryFullInfoText>
                        <UserHistoryFullInfoInput disabled={!canEdit} onChange={handleHistoryNumber} value={historyNumber}/>
                    </UserHistoryFullInfoItem>
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
                { !_new ? <RoundedButton onClick={openDeleteModal} className='delete_btn'><FiTrash /></RoundedButton> : ""}
                <MultiSelect
                    canEdit={canEdit}
                    options={projectCollabs}
                    value={selectedProjectColabs}
                    handleSelected={handleSelectedProjectCollabs}
                    reverse={true}
                    placeholder="Colaboradores:"
                    max={2}
                    />
                </> : 
                <RoundedButton onClick={saveUserHistory} className='edit_btn' active={canEdit}><FiCheck /></RoundedButton>
                }
            </UserHistoryFullButtonsContainer>
            {/* Modal delete */}
            <Modal
                estado={deleteModalState}
                cambiarEstado={setDeleteModalState}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>Ingrese "borrar-{title}" para eliminar</msg>
                    <InputField 
                        label=""
                        placeholder= {"borrar-"+title}
                        inputWidth="90%"
                        password={false}
                        value={deleteHistoryName}
                        onChange={handleDeleteHistoryName}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={closeDeleteModal}>Cancelar</Boton2>
                        <Boton 
                            disabled={ !(deleteHistoryName === "borrar-"+title) }
                            onClick={() => {
                                    closeDeleteModal();
                                    openconfirmDeleteModal();}
                        }>Eliminar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

            <Modal
                estado={confirmDeleteModalState}
                cambiarEstado={setConfirmDeleteModalState}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>¿Esta seguro que desea eliminar [Historia]?
                        <br></br>Esta accion es irreversible.
                    </msg>
                    <ContenedorBotones>
                        <Boton3 onClick={deleteUserHistory}>Eliminar</Boton3>
                        <Boton onClick={closeConfirmDeleteModal}>Cancelar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>
            
        </UserHistoryFullPage>
   );
}

export default UserHistoryFull;