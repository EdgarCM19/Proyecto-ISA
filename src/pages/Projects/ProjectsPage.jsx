import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ProjectFolder from "../../components/ProjectFolder/ProjectFolder";
import { 
    AuxText,
    Button,
    ButtonContainer,
    FolderIcon,
    NoProjectsImg,
    NoProjetsContainer,
    ProjectPageHeader,
    ProjectPageHeaderTextContainer,
    ProjectsContainer,
    ProjectsPageContent,
    ProjectsSection,
    TestBox,
    Title,
    UserIcon,
    UserMenu
} from "./ProjectsPageElements";
import Modal from "../../components/Modal/Modal";
import InputField from "../../components/InputField/InputField";
import {ContenedorBotones, Boton, Boton2, Contenido} from "../../components/Modal/ModalContenidoElements";

const fakeData = [
    { id: 0, name: 'Projecto 1'},
    { id: 2, name: 'Projecto 2'},
    { id: 3, name: 'Projecto 3'},
    { id: 4, name: 'Projecto 4'},
];

// const fakeData = [];

const ProjectsPage = () => {

    const [data, setData] = useState(fakeData);
    const [isMenuShow, setMenuShow] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [newProjectModalShowing, setNewProjectModalState] = useState(false);

    const toggleNewProjectModal = () => {
        setNewProjectModalState(!newProjectModalShowing);
    }

    const handleNewProjectNameInput = (name) => setProjectName(name); 

    const history = useHistory();

    const addNewProject = (projectId, projectName) => {
        setData((prevData) => [
            ...prevData,
            { id: projectId, name: projectName}
        ]);
        toggleNewProjectModal();
    }

    const loggedOut = () => {
        history.replace("/");
    }

    const toggleMenu = () => {
        setMenuShow(!isMenuShow);
    }

    return (
        <ProjectsPageContent>
            <ProjectPageHeader>
                <ProjectPageHeaderTextContainer>
                    <Title>Bienvenido</Title>
                    <Title fs="28px">[Usuario]</Title>
                </ProjectPageHeaderTextContainer>
                <UserIcon onClick={toggleMenu}/>
                { isMenuShow && (
                <UserMenu>
                    <Button>Configuracion</Button>
                    <Button onClick={loggedOut}>Cerrar Sesion</Button>
                </UserMenu>
                ) }
            </ProjectPageHeader>
            <ButtonContainer>
                <Button onClick={toggleNewProjectModal} mr="5em">Nuevo proyecto<FolderIcon/></Button>
            </ButtonContainer>
            <ProjectsSection>
                { fakeData.length === 0 ? (
                <NoProjetsContainer>
                    <AuxText>Sin proyectos</AuxText>
                    <NoProjectsImg />
                </NoProjetsContainer> 
                ) : (
                // Projectos
                <ProjectsContainer>
                    { data.map(e => 
                        <ProjectFolder
                            id={e.id}
                            projectName={e.name}
                            // onClick={ (e) => openProject(e.id) }
                        />
                    )}
                </ProjectsContainer> 
                )}

            </ProjectsSection>

        {/* Modals */}

        <Modal
            estado={newProjectModalShowing}
            cambiarEstado={setNewProjectModalState}
            titulo="Titulo"
            mostrarHeader={false}
            mostrarOverlay={true}
            posicionModal={'center'}
            padding={'20px'}
        >
            <Contenido>
                <msg>Ingrese el nombre del proyecto </msg>
                <InputField 
                    label="Nombre del Proyecto"
                    placeholder="Nombre del Proyecto"
                    inputWidth="90%"
                    password={false}
                    value={projectName}
                    onChange={handleNewProjectNameInput}
                />
                <ContenedorBotones>
                    <Boton2 onClick={toggleNewProjectModal}>Cancelar</Boton2>
                    <Boton onClick={() => addNewProject(0, projectName)}>Crear</Boton>
                </ContenedorBotones>
            </Contenido>
        </Modal>

        </ProjectsPageContent>
    )
}

export default ProjectsPage;