import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    CRCMiniContainer,
    CRCMiniList,
    CRCMiniSectionTitle,
    CRCMiniTitle
} from './CRCMiniElements';

const CRCMini = ({ id, name, superClasses, subClasses }) => {

  const history = useHistory();
  const goToCRC = () => {
    console.log('Hola')
    history.push({
      pathname: `/crc-card/${id}`, 
      state: {
          id: id,
          _new: false
      }
    });
  };

  return (
      <CRCMiniContainer onClick={goToCRC}>
            <CRCMiniTitle>{name}</CRCMiniTitle>
            <CRCMiniSectionTitle>Superclases:</CRCMiniSectionTitle>
            <CRCMiniList>{superClasses.join(', ')}</CRCMiniList>
            <CRCMiniSectionTitle>Subclases:</CRCMiniSectionTitle>
            <CRCMiniList>{subClasses.join(', ')}</CRCMiniList>
      </CRCMiniContainer>
  )
} 

export default CRCMini;