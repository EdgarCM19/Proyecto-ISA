import React from "react";
import { useHistory } from "react-router-dom";
import { 
    Folder,
    FolderBack, 
    FolderFront, 
    FolderName, 
    Paper, 
    ProjectContent 
} from "./ProjectFolderElements";

const ProjectFolder = ( { projectName, id }) => {

    const history = useHistory();

    const openProject = () => {
        history.replace(`/projects/${id}`);
    }

    return (
        <ProjectContent onClick={ () => console.log(projectName)}>
            <Folder onClick={openProject}>
                <FolderBack>
                    <Paper />
                    <FolderFront />
                </FolderBack>
            </Folder>
            <FolderName>{projectName}</FolderName>
        </ProjectContent>
    );
}

export default ProjectFolder;