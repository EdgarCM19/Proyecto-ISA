import styled from "styled-components";

export const Overlay = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
z-index: 9999;
top: 0;
left: 0;
background: ${props => props.mostrarOverlay ?  'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
backdrop-filter: blur(3px);
padding: 40px;
display: flex;
align-items: ${props => props.posicionModal ? props.posicionModal : 'center'};
justify-content: center;
`;

export const ContenedorModal = styled.div`
width: ${props => props.width ? props.width : ''};
min-height: ${props => props.width ? props.width : ''};
background: var(--bg-color);
position: relative;
border-radius: 5px;
border: 1px solid var(--fg-color);
box-shadow: rgba(100,100,111,0.2)0px 7px 29px 0px;
padding: ${props => props.padding ? props.padding : '20px'};

`;

export const EncabezadoModal = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 20px;
padding-bottom: 20px;
border-bottom: 1px solid #E8E8E8;

h3{
    font-weight: 500;
    font-size: 16px:
    color: #1766DC;
}
`;

export const BotonCerrar = styled.button`
position: absolute;
top: -20px;
right: -20px;

width: 40px;
height: 40px;
border: none;
background: var(--fg-color);
cursor: pointer;
transition: .3s ease all;
border-radius: 20px;
color: var(--bg-color);

&:hover {
    background: var(--secondary-color);
}

svg{
    width: 100%;
    height: 100%;
}
`;