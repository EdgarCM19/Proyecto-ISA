import React from "react";
import { Folder, FolderBack, FolderFront, FolderName, Paper, ProjectContent } from "./ProjectFolderElements";

import { ReactComponent as Logo } from '../../assets/projects.svg'

const ProjectFolder = ( { projectName, id }) => {
    return (
        <ProjectContent onClick={ () => console.log(projectName)}>
            <Folder>
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