import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";
import { 
    ColabContent,
    ColabName,
    ColaboratorsPanel,
    ColabsList,
    ColabsTitle,
    DeleteIcon,
    DeleteIconC,
    EditIcon,
    ExpandIcon,
    ExpandPanelButton,
    HeaderBtn,
    HeaderContent,
    HeaderTitle,
    NewColabBtn,
    NewUserIcon,
    ProjectCardsContainer,
    ProjectCardsHeader,
    ProjectCardsHeaderButton,
    ProjectCardsHeaderButtonLink,
    ProjectCardsHeaderTitle,
    ProjectContentPanel,
    ProjectPageContainer,
    Tab,
    TabContentCointainer,
    TabsContainer,
    TabsContentPanel,
} from "./ProjectPageElements";

import Modal from "../../components/Modal/Modal";
import {
    ContenedorBotones,
    Boton,
    Boton2,
    Boton3,
    Contenido
} from "../../components/Modal/ModalContenidoElements";
import InputField from "../../components/InputField/InputField";
import { doc, addDoc, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import db from '../../firebaseConfig'
import UserHistoryMini from "../../components/UserHistoryMini/UserHistoryMini";
import CRCMini from "../../components/CRCMini/CRCMini";
import { Link } from "react-router-dom";
import { CRCFullNewResponsabilitieButtonLink } from "../CRC/CRCFullElements";


let colaborators = {
    name:"",
    id:""
}





const ProjectPage = (props) => {

    const { id } = useParams();
    const location  = useLocation();
    const history = useHistory();
    const [CRCData,setCRCData] = useState([]);

    const [userHistoryData,setUserHistoryData] = useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(()=>{
        getDataInit().then(setLoading(false))
    },[])
    const getDataInit = async() =>{
        return new Promise(async (resolve, reject)=>{
            try{
                const subColRef = collection(db, "projects", doc_name, "historyData");
                const qSnap =await getDocs(subColRef)
                qSnap.docs.map(d => {
                    console.log("llave", d.id)
                    setUserHistoryData(prev =>
                    [...prev,{
                        id: d.data().id, 
                        historyName: d.data().historyName, 
                        historyNum: d.data().historyNum,
                        priority: d.data().priority,
                        time: new Date(d.data().time).getDate(),
                        date: d.data().date,
                        fire:d.id,
                        key:d.id}
                ])})
                const subColRef2 = collection(db, "projects", doc_name, "CRC");
                const qSnap2 =await getDocs(subColRef2)
                qSnap2.docs.map(d =>{
                    setCRCData(prev =>
                    [...prev,{
                        id: d.data().id, 
                        crcName: d.data().crcName,
                        superclases: d.data().selectedSuperClasses,
                        subclases: d.data().selectedSubClasses,
                        fire:d.id,
                        key:d.id
                    }
                ])})
                resolve(true)
            }catch(err){
                reject(err);
            }
        })
        
    }
    const [data, setData] = useState([]);
    const deleteConfirmText = `borrar-proyecto`; //Se obtiene el nombre del proyecto de la base de datos y se pone como "borrar-[nombre]""

    const [colabPanelExpanded, setColabPanelExpanded] = useState(false);

    // Modal states
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [confirmDeleteModalState, setConfirmDeleteModalState] = useState(false);

    const openEditModal = () => setEditModalState(true);
    const closeEditModal = () => setEditModalState(false);

    const openDeleteModal = () => setDeleteModalState(true);
    const closeDeleteModal = () => setDeleteModalState(false);

    const openDeleteColab = () => setDeleteColaborateModal(true);
    const openNewColab = () => setNewColaborateModal(true);

    const openconfirmDeleteModal = () => setConfirmDeleteModalState(true);
    const closeConfirmDeleteModal = () => setConfirmDeleteModalState(false);
    //Inputs states
    const [projectName, setProjectName] = useState('');
    const [deleteProjectName, setDeleteProjectName] = useState('');
    const [deleteColaborateModal, setDeleteColaborateModal] = useState(false);
    const [newColaborateModal, setNewColaborateModal] = useState(false);

    const [colabMail, setColabMail] = useState('');
    const [colabName, setColabName] = useState('');
    const [colabToDelete, setColabToDelete] = useState({});

    const handleProjectName = (name) => setProjectName(name);
    const handleDeleteProjectName = (name) => setDeleteProjectName(name);
    const handleColabMail = (mail) =>  setColabMail(mail);
    const handleColabName = (name) => setColabName(name)
    const doc_name = location.state.key;

    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (tab) => setToggleState(tab);

    React.useEffect(() => {
        
        setProjectName(location.state.name)
        loadColabs()
    }, [])

    const loadColabs = async () =>{
        setData([]);
        const subColRef = collection(db, "projects", doc_name, "colaborators");

        const qSnap =await getDocs(subColRef)

        qSnap.docs.map(d => setData(prev => [...prev,{name:d.data().name, key:d.id}]))
    }

    const editProject = () => {
        let data = {id:location.state.id,name:projectName}
        setDoc(doc(db, 'projects', location.state.key), data, { merge: true});
        setEditModalState(false);
        
        //Hacer el update a la base de datos

    }

    const goToUserHistory = (id) => {
        history.push({
        location: `/user-history/${id}`, 
        state: {
            id: id,
            _new: false,
            doc_name: doc_name
        }
    })};
    
    const goToCRCCard = (id,key) => history.push({
        location: `/user-history/${id}`, 
        state: {
            id: id,
            _new: false,
            doc_name: doc_name,
            key: key
        }
    });

    const deleteProject = async () => {
        const taskDocRef = doc(db, 'projects', location.state.key)
        try{
            await deleteDoc(taskDocRef).then(()=>{
                history.replace("/projects");
            }).catch(()=>{
                alert("Error al elminar el proyecto")
            })
          } catch (err) {
            alert(err)
          }
        setConfirmDeleteModalState(false);
        //Se borra de la base de datos
    }

    const addColab = async () => {
        let userData = {
            email : colabMail,
            name: colabName
        }
        if(colabName!=='' && colabMail !==''){
            await addDoc(collection(db, 'projects', location.state.key, 'colaborators'), userData).then(()=>{
                loadColabs()
            })
            setNewColaborateModal(false);
        }else{
            alert("Ingrese los datos")
        }
        
        //Se agrega el colaborador
    }

    const deleteColab = async () => {
        const taskDocRef = doc(db, 'projects', location.state.key, 'colaborators', colabToDelete.key)
        try{
            await deleteDoc(taskDocRef).then(()=>{
                loadColabs()
            }).catch(()=>{
                alert("Error al elminar el proyecto")
            })
          } catch (err) {
            alert(err)
          }
        setDeleteColaborateModal(false);
    }
    const deleteColabModal = (colab) =>{
        setColabToDelete(colab);
        openDeleteColab()
    }

    const handleColabPanel = () => setColabPanelExpanded(!colabPanelExpanded);
    
    const newUID = 0;
    if(loading){
        return(
        <ProjectPageContainer>
            <HeaderContent>
                <HeaderTitle className="header_title">[{projectName}]</HeaderTitle>
                <HeaderBtn onClick={openEditModal} className="edit_btn">
                    <EditIcon className="edit_icon"/>
                </HeaderBtn>
                <HeaderBtn onClick={openDeleteModal} className="delete_btn">
                    <DeleteIcon className="delete_icon"/>
                </HeaderBtn>
            </HeaderContent>
            <ProjectContentPanel>
                Cargando
            </ProjectContentPanel>
        </ProjectPageContainer>)
    }

    return (
        <ProjectPageContainer>
            <HeaderContent>
                <HeaderTitle className="header_title">[{projectName}]</HeaderTitle>
                <HeaderBtn onClick={openEditModal} className="edit_btn">
                    <EditIcon className="edit_icon"/>
                </HeaderBtn>
                <HeaderBtn onClick={openDeleteModal} className="delete_btn">
                    <DeleteIcon className="delete_icon"/>
                </HeaderBtn>
            </HeaderContent>
            <ProjectContentPanel>
                <ProjectCardsContainer>
                    <ProjectCardsHeader>
                        {/* <ProjectCardsHeaderButton>Nueva {toggleState === 1 ? 'historia de usuario' : 'tarjeta CRC'}</ProjectCardsHeaderButton> */}
                        <ProjectCardsHeaderButtonLink
                            to={{
                                pathname: toggleState === 1 ? `/crc-card/${newUID}` : `/user-history/${newUID}`, 
                                state: { id: newUID, _new: true, doc_name: doc_name}}}
                        >
                            Nueva {toggleState === 0 ? 'historia de usuario' : 'tarjeta CRC'}
                        </ProjectCardsHeaderButtonLink>
                    </ProjectCardsHeader>
                    <TabsContainer>
                        <Tab onClick={() => toggleTab(0)} className={ toggleState === 0 ? "active" : ""}>Historias de Usuario</Tab>
                        <Tab onClick={() => toggleTab(1)} className={ toggleState === 1 ? "active" : ""}>Tarjetas CRC</Tab>
                    </TabsContainer>
                    <TabsContentPanel >
                        <TabContentCointainer
                            tab={toggleState}
                            className={toggleState === 0 ? 'active' : ''}
                        >
                            {userHistoryData.map(e => 
                                <UserHistoryMini
                                    id={e.historyNum}
                                    key={e.key}
                                    name={e.historyName}
                                    numHistory={e.historyNum}
                                    priority={e.priority}
                                    time={e.time}
                                    date={e.date}
                                    fire={e.fire}
                                    doc_name={doc_name}
                                />
                            )}
                        </TabContentCointainer>
                        <TabContentCointainer
                            tab={toggleState}
                            className={toggleState === 1 ? 'active' : ''}
                        >
                            { CRCData.map( (e, index) => 
                                <CRCMini onClick={() => goToCRCCard(e.id, e.key)}
                                    key={index}
                                    name={e.crcName}
                                    superClasses={e.superclases}
                                    subClasses={e.subclases}
                                    fire={e.fire}
                                    doc_name={doc_name}
                                />
                            )}
                        </TabContentCointainer>
                    </TabsContentPanel>
                </ProjectCardsContainer>
                <ColaboratorsPanel expand={colabPanelExpanded}>
                    <ExpandPanelButton expand={colabPanelExpanded} onClick={handleColabPanel}>
                        <ExpandIcon expand={colabPanelExpanded}/>
                    </ExpandPanelButton>
                    <ColabsTitle>Colaboradores</ColabsTitle>
                    {/* Estraer colab a componente */}
                    <ColabsList>
                    { data.map( e => 
                        <ColabContent>
                            <ColabName className="c_name">{e.name}</ColabName>
                            <DeleteIconC onClick={()=>deleteColabModal(e) } className="delete_iconC"/>
                        </ColabContent>
                        ) }
                    </ColabsList>
                    <NewColabBtn onClick={openNewColab}>Agregar<NewUserIcon /></NewColabBtn>
                </ColaboratorsPanel>
            </ProjectContentPanel>


            {/* Modals */}
            {/* Modal edit */}
            <Modal
                estado={editModalState}
                cambiarEstado={setEditModalState}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>Ingrese el nuevo nombre</msg>
                    <InputField 
                        label="Nuevo nombre del Proyecto"
                        placeholder="Nuevo nombre"
                        inputWidth="90%"
                        password={false}
                        value={projectName}
                        onChange={handleProjectName}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={closeEditModal}>Cancelar</Boton2>
                        <Boton onClick={() => editProject()}>Aceptar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

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
                    <msg>Ingrese "{projectName}" para eliminar</msg>
                    <InputField 
                        label=""
                        placeholder= "borrar-[nombreProyecto]"
                        inputWidth="90%"
                        password={false}
                        value={deleteProjectName}
                        onChange={handleDeleteProjectName}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={closeDeleteModal}>Cancelar</Boton2>
                        <Boton 
                            disabled={ !(deleteProjectName === projectName) }
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
                    <msg>¿Esta seguro que desea eliminar [Proyecto]?
                        <br></br>Esta accion es irreversible.
                    </msg>
                    <ContenedorBotones>
                        <Boton3 onClick={deleteProject}>Eliminar</Boton3>
                        <Boton onClick={closeConfirmDeleteModal}>Cancelar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

 {/* Modal delete colab */}
            <Modal
                estado={deleteColaborateModal}
                cambiarEstado={setDeleteColaborateModal}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>¿Esta seguro que desea eliminar al colaborador [{colabToDelete.name}]?
                        <br></br>Esta accion es Permanente.
                    </msg>
                    <ContenedorBotones>
                        <Boton3 onClick={deleteColab}>Eliminar</Boton3>
                        <Boton onClick={() => setDeleteColaborateModal(false)}>Cancelar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

            {/* Modal new colab */}
            <Modal
                estado={newColaborateModal}
                cambiarEstado={setNewColaborateModal}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>Ingrese los datos del colaborador</msg>
                    <InputField 
                        label="Correo electronico"
                        placeholder="Correo electronico"
                        inputWidth="90%"
                        password={false}
                        value={colabMail}
                        onChange={handleColabMail}
                    />
                    <InputField 
                        label="Nombre"
                        placeholder="Nombre"
                        inputWidth="90%"
                        password={false}
                        value={colabName}
                        onChange={handleColabName}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={() => setNewColaborateModal(false)}>Cancelar</Boton2>
                        <Boton onClick={() => addColab()}>Aceptar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

        </ProjectPageContainer>
    )
}

export default ProjectPage;







