import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ProjectFolder from "../../components/ProjectFolder/ProjectFolder";
import { 
    AuxText,
    Button,
    ButtonContainer,
    FolderIcon,
    NoProjectsImg,
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

const fakeData = [
    { id: 0, name: 'Projecto 1'},
    { id: 2, name: 'Projecto 2'},
    { id: 3, name: 'Projecto 3'},
    { id: 4, name: 'Projecto 4'},
];

// const fakeData = [];

const ProjectsPage = () => {

    const [data,setData] = useState(fakeData);
    const [isMenuShow, setMenuShow] = useState(false);

    const history = useHistory();

    const addNewProject = (projectId, projectName) => {
        setData((prevData) => [
            ...prevData,
            { id: projectId, name: projectName}
        ]);
    }

    const loggedOut = () => {
        history.replace("/");
    }

    const toggleMenu = () => {
        console.log('Que pasa');
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
                <Button mr="5em">Nuevo proyecto<FolderIcon/></Button>
            </ButtonContainer>
            <ProjectsSection>
                { fakeData.length === 0 ? (
                <>
                    <AuxText>Sin proyectos</AuxText>
                    <NoProjectsImg />
                </> 
                ) : (
                // Projectos
                <ProjectsContainer>
                    { data.map(e => 
                        <ProjectFolder
                            id={e.id}
                            projectName={e.name}
                        />
                    )}
                </ProjectsContainer> 
                )}

            </ProjectsSection>

        </ProjectsPageContent>
    )
}

export default ProjectsPage;