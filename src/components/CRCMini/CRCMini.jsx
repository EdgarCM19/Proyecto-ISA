import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {
    CRCMiniContainer,
    CRCMiniList,
    CRCMiniSectionTitle,
    CRCMiniTitle
} from './CRCMiniElements';

const CRCMini = ({ id, name, superClasses, subClasses }) => {
console.log("superClases")
  console.log(superClasses)
  const history = useHistory();
  const [superClasesArr, setSuperClasesArr] = useState([])
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

  useEffect(() => {
    superClasses.map((res)=>{
      setSuperClasesArr(prev=>[...prev, res])
    })
  }, [])
  
  return (
      <CRCMiniContainer onClick={goToCRC}>
            <CRCMiniTitle>{name}</CRCMiniTitle>
            <CRCMiniSectionTitle>Superclases:</CRCMiniSectionTitle>
            <CRCMiniList>{superClasesArr}</CRCMiniList>
            <CRCMiniSectionTitle>Subclases:</CRCMiniSectionTitle>
            <CRCMiniList>{subClasses}</CRCMiniList>
      </CRCMiniContainer>
  )
} 

export default CRCMini;