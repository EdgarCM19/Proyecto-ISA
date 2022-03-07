import React from 'react';
import {Overlay, ContenedorModal, EncabezadoModal, BotonCerrar} from "./ModalElements";;

const Modal = ({children, estado, cambiarEstado, titulo = 'Mensaje de confirmacion', mostrarHeader, mostrarOverlay,posicionModal, padding, width, height}) => {
    return (
        <>
            {estado &&
                <Overlay mostrarOverlay={mostrarOverlay} posicionModal={posicionModal}> 
                    <ContenedorModal padding={padding} width={width} height={height}>
                        {mostrarHeader &&
                            <EncabezadoModal>
                                <h3>{titulo}</h3>
                            </EncabezadoModal>
                        }
                        <BotonCerrar onClick={() => cambiarEstado(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </BotonCerrar>

                        {children}
                    </ContenedorModal>
                    
                </Overlay>
            }
        </>
    );
}

export default Modal;