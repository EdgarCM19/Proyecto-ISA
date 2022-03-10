import React from "react";
import { useState } from "react";

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

const fakeDataColabs = [
    { id: 0, name: 'Colaborador 1'},
    { id: 1, name: 'Colaborador 2'},
    { id: 2, name: 'Colaborador 3'},
    { id: 2, name: 'Colaborador 3'},
    { id: 2, name: 'Colaborador 3'},
    { id: 2, name: 'Colaborador 3'},
    { id: 2, name: 'Colaborador 3'},
    { id: 2, name: 'Colaborador 4'},
    { id: 2, name: 'Colaborador 4'},
    { id: 2, name: 'Colaborador 4'},
    { id: 2, name: 'Colaborador 4'},
    { id: 2, name: 'Colaborador 4'},
];

const ProjectPage = () => {

    const { id } = useParams();

    const [data, setData] = useState(fakeDataColabs);
    const deleteConfirmText = `borrar-proyecto`; //Se obtiene el nombre del proyecto de la base de datos y se pone como "borrar-[nombre]""

    const [colabPanelExpanded, setColabPanelExpanded] = useState(false);

    // Modal states
    const [editModalState, setEditModalState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [confirmDeleteModalState, setConfirmDeleteModalState] = useState(false);
    const [deleteColaborateModal, setDeleteColaborateModal] = useState(false);
    const [newColaborateModal, setNewColaborateModal] = useState(false);

    const openEditModal = () => setEditModalState(true);
    const closeEditModal = () => setEditModalState(false);

    const openDeleteModal = () => setDeleteModalState(true);
    const closeDeleteModal = () => setDeleteModalState(false);

    const openconfirmDeleteModal = () => setConfirmDeleteModalState(true);
    const closeConfirmDeleteModal = () => setConfirmDeleteModalState(false);

    const openDeleteColab = () => setDeleteColaborateModal(true);
    const openNewColab = () => setNewColaborateModal(true);
    //Inputs states
    const [projectName, setProjectName] = useState('');
    const [deleteProjectName, setDeleteProjectName] = useState('');
    const [colabMail, setColabMail] = useState('');

    const handleProjectName = (name) => setProjectName(name);
    const handleDeleteProjectName = (name) => setDeleteProjectName(name);
    const handleColabMail = (mail) =>  setColabMail(mail);

    // const addColab = (id, name) => {
    //     setData([
    //         ...data,
    //         { id: id, name: name}
    //     ]);
    // }

    // const deleteColab = (id) => {
    //     setData(data.filter(e =>  e.id != id));
    // }

    const editProject = () => {
        setEditModalState(false);
        const newProjectName = projectName;
        //Hacer el update a la base de datos

    }

    const deleteProject = () => {
        setConfirmDeleteModalState(false);
        //Se borra de la base de datos
    }

    const addColab = () => {
        setNewColaborateModal(false);
        //Se agrega el colaborador
    }

    const deleteColab = () => {
        setDeleteColaborateModal(false);
        //Se elimina el colaborador
    }

    const handleColabPanel = () => setColabPanelExpanded(!colabPanelExpanded);

    return (
        <ProjectPageContainer>
            <HeaderContent>
                <HeaderTitle className="header_title">[Proyecto]</HeaderTitle>
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
                            <ColabName className="c_name">{e.name}</ColabName>
                            <DeleteIconC onClick={openDeleteColab} className="delete_iconC"/>
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
                    <msg>Ingrese "borrar-[nombreProyecto]" para eliminar</msg>
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
                            disabled={ !(deleteConfirmText === deleteProjectName) }
                            onClick={() => {
                                    closeDeleteModal();
                                    openconfirmDeleteModal();}
                        }>Eliminar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

            {/*  Modal confirm delete*/}
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
                        <Boton3 onClick={closeConfirmDeleteModal}>Eliminar</Boton3>
                        <Boton onClick={deleteProject}>Cancelar</Boton>
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
                    <msg>¿Esta seguro que desea eliminar al colaborador [Nombre]?
                        <br></br>Esta accion es Permanente.
                    </msg>
                    <ContenedorBotones>
                        <Boton3 onClick={() => setDeleteColaborateModal(!deleteColaborateModal)}>Eliminar</Boton3>
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
                    <msg>Ingrese el correo del colaborador <br></br>que desea dar de alta</msg>
                    <InputField 
                        label="Correo electronico"
                        placeholder="Correo electronico"
                        inputWidth="90%"
                        password={false}
                        value={colabMail}
                        onChange={handleColabMail}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={() => setNewColaborateModal(false)}>Cancelar</Boton2>
                        <Boton onClick={() => setNewColaborateModal(!newColaborateModal)}>Aceptar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>


        </ProjectPageContainer>
    )
}

export default ProjectPage;







