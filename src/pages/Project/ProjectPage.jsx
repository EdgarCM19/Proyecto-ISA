import React from "react";
import { useState } from "react";
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
    ProjectContentPanel,
    ProjectPageContainer,
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

let colaborators = {
    name:"",
    id:""
}

const ProjectPage = () => {

    const { id } = useParams();
    const location  = useLocation();
    const history = useHistory();

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

    const openconfirmDeleteModal = () => setConfirmDeleteModalState(true);
    const closeConfirmDeleteModal = () => setConfirmDeleteModalState(false);
    //Inputs states
    const [projectName, setProjectName] = useState('');
    const [deleteProjectName, setDeleteProjectName] = useState('');

    const handleProjectName = (name) => setProjectName(name);
    const handleDeleteProjectName = (name) => setDeleteProjectName(name);
    const doc_name = location.state.key;

    // const addColab = (id, name) => {
    //     setData([
    //         ...data,
    //         { id: id, name: name}
    //     ]);
    // }

    // const deleteColab = (id) => {
    //     setData(data.filter(e =>  e.id != id));
    // }
    React.useEffect(() => {
        setProjectName(location.state.name)
        const getColaborators = async () =>{
            

            const subColRef = collection(db, "projects", doc_name, "colaborators");

            const qSnap =await getDocs(subColRef)

            qSnap.docs.map(d => setData(prev => [...prev,{name:d.data().name, key:d.id}]))

        }
        console.log("colab")
        getColaborators()
    }, [])

    const editProject = () => {
        let data = {id:location.state.id,name:projectName}
        setDoc(doc(db, 'projects', location.state.key), data, { merge: true});
        setEditModalState(false);
        
        //Hacer el update a la base de datos

    }

    const deleteProject = async () => {
        const taskDocRef = doc(db, 'projects', location.state.key)
        console.log("borrar")
        try{
            await deleteDoc(taskDocRef).then(()=>{
                history.replace("/projects");
            }).catch(()=>{
                alert("Error al elminar el proyecto")
            })
          } catch (err) {
              console.log(err)
            alert(err)
          }
        setConfirmDeleteModalState(false);
        //Se borra de la base de datos
    }

    const handleColabPanel = () => setColabPanelExpanded(!colabPanelExpanded);

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
                {/* Tabs y Cards */}
                    {/* <TabsContainer>
                        <Tab>Historias de Usuario</Tab>
                        <Tab>Tarjetas CRC</Tab>
                    </TabsContainer> */}
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
                            <ColabName className="c_name">{e.name} </ColabName>
                            <DeleteIconC className="delete_iconC"/>
                        </ColabContent>
                        ) }
                    </ColabsList>
                    <NewColabBtn>Agregar<NewUserIcon />
                    </NewColabBtn>
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


        </ProjectPageContainer>
    )
}

export default ProjectPage;







