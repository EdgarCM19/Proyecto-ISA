import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProjectFolder from "../../components/ProjectFolder/ProjectFolder";

import { addDoc, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import db from '../../firebaseConfig'

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
    Title,
    UserIcon,
    UserMenu
} from "./ProjectsPageElements";
import Modal from "../../components/Modal/Modal";
import InputField from "../../components/InputField/InputField";
import {ContenedorBotones, Boton, Boton2, Contenido} from "../../components/Modal/ModalContenidoElements";


const ProjectsPage = () => {

    const usertype = localStorage.getItem('user-type');
    const name =localStorage.getItem('name')
    const uid = localStorage.getItem('uid')
    const [data, setData] = useState([]);
    const [isMenuShow, setMenuShow] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [newProjectModalShowing, setNewProjectModalState] = useState(false); 

    const toggleNewProjectModal = () => {
        setNewProjectModalState(!newProjectModalShowing);
    }

    useEffect(() => {

        loadProjects();
        
    }, [])

    const handleNewProjectNameInput = (name) => setProjectName(name); 

    const history = useHistory();

    const addNewProject = async (projectName) => {
        let projectId = new Date().getTime()
        setData((prevData) => [
            ...prevData,
            { id: projectId, name: projectName}
        ]);
        let dataProject = {
            name: projectName,
            id: projectId
        }
        await addDoc(collection(db, 'projects'), dataProject);
        loadProjects();
        toggleNewProjectModal();
    }

    const loadProjects = async () =>{
        console.log("load", usertype)
        setData([]);
        if(usertype === 'L'){
            console.log("l", uid)
            let ref = collection(db, 'projects');
            const q =  query(ref, where('uid','==', uid))
            const data = await getDocs(q)
            data.forEach(element=>{ 
                setData( (prevData)=>[...prevData, {id:element.data().id, name:element.data().name, key:element.id}])
            })
        }else{
            const keys = await getDocs(collection(db, 'users',uid,'project'));
            keys.forEach(async (element)=>{
                console.log(element.data().key)
                const data = await getDoc(doc(db, 'projects', element.data().key))
                console.log(data.data())
                if(!!data.data()){
                    setData( (prevData)=>[...prevData, {id:data.data().id, name:data.data().name, key:data.id}])
                }
            })
        }
    }
    const loggedOut = () => {
        history.replace("/");
        localStorage.setItem('logged', false);
        localStorage.setItem('uid',"");
    }

    const toggleMenu = () => {
        setMenuShow(!isMenuShow);
    }

    return (
        <ProjectsPageContent>
            <ProjectPageHeader>
                <ProjectPageHeaderTextContainer>
                    <Title>Bienvenido</Title>
                    <Title fs="28px">[{name}]</Title>
                </ProjectPageHeaderTextContainer>
                <UserIcon onClick={toggleMenu}/>
                { isMenuShow && (
                <UserMenu>
                    {/* <Button>Configuracion</Button> */}
                    <Button onClick={loggedOut}>Cerrar Sesion</Button>
                </UserMenu>
                ) }
            </ProjectPageHeader>
            <ButtonContainer>
                { usertype === 'L' && (
                <Button onClick={toggleNewProjectModal} mr="5em">Nuevo proyecto<FolderIcon/></Button>
                )}
            </ButtonContainer>
            <ProjectsSection>
                { data.length === 0 ? (
                <NoProjetsContainer>
                    <AuxText>Sin proyectos</AuxText>
                    <NoProjectsImg />
                </NoProjetsContainer> 
                ) : (
                // Projectos
                <ProjectsContainer>
                    { data.map(e => 
                        <ProjectFolder
                            props={e}
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
                    <Boton onClick={() => addNewProject(projectName)}>Crear</Boton>
                </ContenedorBotones>
            </Contenido>
        </Modal>

        </ProjectsPageContent>
    )
}

export default ProjectsPage;