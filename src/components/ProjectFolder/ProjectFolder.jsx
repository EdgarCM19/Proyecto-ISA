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

const ProjectFolder = ( { props }) => {

    const history = useHistory();

    const openProject = () => {
        history.replace(`/projects/${props.id}`, props);
    }
    return (
        <ProjectContent onClick={ () => console.log(props.name)}>
            <Folder onClick={openProject}>
                <FolderBack>
                    <Paper />
                    <FolderFront />
                </FolderBack>
            </Folder>
            <FolderName>{props.name}</FolderName>
        </ProjectContent>
    );
}

export default ProjectFolder;