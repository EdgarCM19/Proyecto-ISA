import React, { useState } from 'react'
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import { 
  CRCFullButtonsContainer,
  CRCFullContainer,
  CRCFullNewResponsabilitieButton,
  CRCFullPageContainer,
  CRCFullResponsabiliteContainer,
  CRCFullResponsabilitesSeparator,
  CRCFullResponsabilitieName,
  CRCFullResponsabilitiesScrollContainer,
  CRCFullSectionTitle,
  CRCFullTitle,
  RoundedButton 
} from './CRCFullElements';
import { FiEdit2, FiTrash, FiCheck, FiSave } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const fakeDataCRC = [
  {
    id: 0, 
    name: 'Responsabilidad 1',
    collaborators: [],
  },
  {
    id: 1, 
    name: 'Responsabilidad 2',
    collaborators: ['clase 2'],
  },
];



const CRCFull = () => {

  const location = useLocation();
  const history = useHistory();
  const {id, _new} = location.state;
  const [canEdit, setCanEdit] = useState(_new);
  const toggleEditMode = () => setCanEdit(!canEdit);

    //Cargar todas las clases registradas, menos la clase que se este modificando/agregando
    const superClassesOptions = ['superclase 1', 'superclase 2'];
    const subClassesOptions = ['subclase 1', 'subclase 2'];
    const colabOptions = ['clase 1', 'clase 2', 'clase 3'];
    //Creo que pueden ser el mismo objeto ya que siempre son todas las clases menos la actual


    //El nombre de la tarjeta CRC
    const [className, setClassName] = useState('Prueba 1');

    const [selectedSuperClasses, setSelectedSuperClasses] = useState([]);
    const [selectedSubClasses, setSelectedSubClasses] = useState([]);

    const handleSelectedSuperClasses = (selected) => setSelectedSuperClasses([...selected]);
    const handleSelectedSubClasses = (selected) => setSelectedSubClasses([...selected]);
    
    //Data de las responsabilidades y sus colaboradores mediante
    //un arreglo de objetos
    const [responsabilities, setResponsabilities] = useState(fakeDataCRC);   

    const handleResponsabilitiesName = (index, value) => {
      const temp = [...responsabilities];
      temp[index].name = value;
      setResponsabilities([...temp]);
    }

    const handleResponsabilitiesCollaborators = (index) => 
      (collabs) => {
        const temp = [...responsabilities];
        temp[index].collaborators = collabs;
        setResponsabilities([...temp]);
    }

    const loadCRC = () => {
      //Se cargan los datos de la tarjeta CRC mediante el id
    }

    const editCRC = () => {
      //Se actualizan los datos de la tarjeta CRC 
      toggleEditMode();
    }

    const saveCRC = () => {
      history.goBack();
    }

    const deleteCRC = () => {};

    const newResponsabilitie = () => {
      // const uid = some_uid_function();
      console.log('Si')
      const id = responsabilities.length;
      const temp = [...responsabilities];
      temp.push({id: id, name: '', collaborators: []});
      console.table(temp);
      setResponsabilities([...temp]);
    }

  return (
    <CRCFullPageContainer>
      <CRCFullContainer>
          <CRCFullTitle
            disabled={!canEdit}
            canEdit={canEdit}
            value={className}
            onChange={e => setClassName(e.target.value)}
          />
          <CRCFullSectionTitle>Superclases</CRCFullSectionTitle>
          <MultiSelect
            canEdit={canEdit}
            options={superClassesOptions}
            handleSelected={handleSelectedSuperClasses}
          />
          <CRCFullSectionTitle>Subclases</CRCFullSectionTitle>
          <MultiSelect
            canEdit={canEdit}
            options={subClassesOptions}
            handleSelected={handleSelectedSubClasses}
          />
          <CRCFullResponsabilitiesScrollContainer>
            {responsabilities.map( (e, index) =>
              <CRCFullResponsabiliteContainer key={index}>
                <CRCFullResponsabilitieName
                  disabled={!canEdit}
                  value={e.name}
                  onChange={ev => handleResponsabilitiesName(index, ev.target.value)}
                />
                <CRCFullResponsabilitesSeparator/>
                <MultiSelect handleSelected={handleResponsabilitiesCollaborators(index)} canEdit={canEdit} options={colabOptions}/>
              </CRCFullResponsabiliteContainer>
            )}
          </CRCFullResponsabilitiesScrollContainer>
          <CRCFullNewResponsabilitieButton canEdit={canEdit} onClick={newResponsabilitie}>Nueva responsabilidad</CRCFullNewResponsabilitieButton>
          {/* <CRCFullNewResponsabilitieButton onClick={() => localStorage.setItem('test', JSON.stringify(responsabilities))}>Guardar</CRCFullNewResponsabilitieButton> */}
      </CRCFullContainer>
      <CRCFullButtonsContainer>
        <RoundedButton onClick={editCRC} className='edit_btn' active={canEdit}>
          { _new ?
            <FiCheck />
          :
          <FiEdit2 /> }
          </RoundedButton>
        <RoundedButton onClick={saveCRC} className='save'><FiSave /></RoundedButton>
        <RoundedButton onClick={deleteCRC} className='delete_btn'><FiTrash /></RoundedButton>
      </CRCFullButtonsContainer>
    </CRCFullPageContainer>
  )
}

export default CRCFull;

