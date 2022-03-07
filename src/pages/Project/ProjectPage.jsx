import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { ColaboratorsPanel, DeleteIcon, EditIcon, ExpandIcon, ExpandPanelButton, HeaderBtn, HeaderContent, HeaderTitle, ProjectCardsContainer, ProjectContentPanel, ProjectPageContainer, Tab, TabsContainer } from "./ProjectPageElements";

const ProjectPage = () => {
    
    const { id } = useParams();

    const [colabPanelExpanded, setColabPanelExpanded] = useState(false);

    const handleColabPanel = () => setColabPanelExpanded(!colabPanelExpanded);

    return (
        <ProjectPageContainer>
            <HeaderContent>
                <HeaderTitle>[Proyecto]</HeaderTitle>
                <HeaderBtn className="edit_btn"><EditIcon className="edit_icon"/></HeaderBtn>
                <HeaderBtn className="delete_btn"><DeleteIcon className="delete_icon"/></HeaderBtn>
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
                    <ExpandPanelButton onClick={handleColabPanel}><ExpandIcon expand={colabPanelExpanded}/></ExpandPanelButton>
                </ColaboratorsPanel>
            </ProjectContentPanel>
        </ProjectPageContainer>
    )
}

export default ProjectPage;







