import React, { useState, useEffect } from 'react'
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
import {  addDoc, collection, getDocs, deleteDoc, doc, where } from "firebase/firestore";
import db from '../../firebaseConfig'

const fakeDataCRC = [
  {
    id: 0, 
    name: 'Responsabilidad 1',
    collaborators: [],
  }
];



const CRCFull = () => {

  const location = useLocation();
  const history = useHistory();
  const {id, _new, doc_name, fire} = location.state;
  const [canEdit, setCanEdit] = useState(_new);
  const toggleEditMode = () => setCanEdit(!canEdit);

    //Cargar todas las clases registradas, menos la clase que se este modificando/agregando
    const [superClassesOptions, setSuperClassesOptions] = useState([]);
    const [subClassesOptions, setSubClassesOptions] = useState([]);
    const [colabOptions, setcolabOptions] = useState([]);
    const [loading, setLoading]= useState(true);
    
    //Creo que pueden ser el mismo objeto ya que siempre son todas las clases menos la actual

  
    //El nombre de la tarjeta CRC
    const [className, setClassName] = useState('');

    const [selectedSuperClasses, setSelectedSuperClasses] = useState([]);
    const [selectedSubClasses, setSelectedSubClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const [responsabilities, setResponsabilities] = useState(fakeDataCRC);   

    useEffect(()=>{
      loadClases().then(()=>{
        setLoading(false);
      })
      console.log(fire, "el fire")
      if(fire!==null && fire !== undefined){
        getData()
    }
    },[])
  const getData =  async ()=>{
      let ref = collection(db, 'projects', doc_name, "CRC")
      const data = await getDocs(ref, where('id', '==', id))
      data.forEach(res=>{
          if(res.data().historyNum===id){
              console.log(res.data().historyNum, id);
              setResponsabilities(res.data().responsabilities);
              setSelectedSubClasses(res.data().selectedSubClasses);
              setSelectedSuperClasses(res.data().selectedSuperClasses);
              setClassName(res.data().crcName);
              console.log("entro")
          }
      })
  }
    const loadClases =async()=>{
      setSuperClassesOptions([])
      setSubClassesOptions([])
      setcolabOptions([])
      return new Promise(async (resolve, reject)=>{
        try{
          const subColRef = collection(db, "superClases");
          const qSnap =await getDocs(subColRef)
          qSnap.docs.map(d =>{
              setSuperClassesOptions(prev =>
              [...prev, d.data().name ])})
          const subColRef2 = collection(db, "subClases");
          const qSnap2 =await getDocs(subColRef2)
          qSnap2.docs.map(d =>{
              setSubClassesOptions(prev =>
              [...prev, d.data().name
          ])})
          const subColRef3 = collection(db, "subClases");
          const qSnap3 =await getDocs(subColRef3)
          qSnap3.docs.map(d =>{ 
              setcolabOptions(prev =>
              [...prev,d.data().name])})
          resolve(true)
        }catch(err){
          reject(err);
        }
       
      })
      
    }

    const handleSelectedSuperClasses = (selected) => setSelectedSuperClasses([...selected]);
    const handleSelectedSubClasses = (selected) => setSelectedSubClasses([...selected]);
    
    //Data de las responsabilidades y sus colaboradores mediante
    //un arreglo de objetos
    

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


    const editCRC = () => {
      //Se actualizan los datos de la tarjeta CRC 
      toggleEditMode();
    }

    const saveCRC = async () => {

      let aux = {
            id: new Date().getTime(), 
            crcName: className,
            selectedSuperClasses: selectedSuperClasses, 
            selectedSubClasses: selectedSubClasses,
            responsabilities:responsabilities,
        }
        if( selectedSuperClasses !== [] &&   selectedSubClasses !== [] && responsabilities !== []){
                await addDoc(collection(db, 'projects', doc_name, 'CRC'), aux).then(()=>{
                })
              history.goBack();
            }else{
                alert("Existen campos vacios");
            }
    }

    const deleteCRC = async () => {
      await deleteDoc(doc(db, 'projects', doc_name, 'CRC', fire));
        history.goBack();
    };

    const newResponsabilitie = () => {
      // const uid = some_uid_function();
      const id = responsabilities.length;
      const temp = [...responsabilities];
      temp.push({id: id, name: '', collaborators: []});
      setResponsabilities([...temp]);
    }

    

    if(loading){
      return (
        <CRCFullPageContainer>
          <CRCFullContainer>
          Loading
          </CRCFullContainer>
        </CRCFullPageContainer>
      )
    }

  return (
    <CRCFullPageContainer>
      <CRCFullContainer>
          <CRCFullTitle
            disabled={!canEdit}
            canEdit={canEdit}
            value={className}
            placeholder={"Nombre"}
            onChange={e => setClassName(e.target.value)}
          />
          <CRCFullSectionTitle>Superclases</CRCFullSectionTitle>
          <MultiSelect
            canEdit={canEdit}
            options={superClassesOptions}
            value={selectedSuperClasses}
            handleSelected={handleSelectedSuperClasses}
          />
          <CRCFullSectionTitle>Subclases</CRCFullSectionTitle>
          <MultiSelect
            canEdit={canEdit}
            options={subClassesOptions}
            value={selectedSubClasses}
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
                <MultiSelect handleSelected={handleResponsabilitiesCollaborators(index)} value={e.collaborators} canEdit={canEdit} options={colabOptions}/>
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
        {!_new ? <RoundedButton onClick={deleteCRC} className='delete_btn'><FiTrash /></RoundedButton> : ""}
      </CRCFullButtonsContainer>
    </CRCFullPageContainer>
  )
}

export default CRCFull;

