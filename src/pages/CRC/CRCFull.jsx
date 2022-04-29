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
import Modal from "../../components/Modal/Modal";
import {
    ContenedorBotones,
    Boton,
    Boton2,
    Boton3,
    Contenido
} from "../../components/Modal/ModalContenidoElements";
import InputField from "../../components/InputField/InputField";
import { FiEdit2, FiTrash, FiCheck, FiSave } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import {  addDoc, collection, getDocs, deleteDoc, doc, where, updateDoc } from "firebase/firestore";
import db from '../../firebaseConfig'

const fakeDataCRC = [
  {
    id: 0, 
    name: 'Responsabilidad 1',
    collaborators: [],
  }
];



const CRCFull = () => {

  const usertype = localStorage.getItem('user-type');

  const location = useLocation();
  const history = useHistory();
  const {id, _new, doc_name, fire} = location.state;
  const [canEdit, setCanEdit] = useState(_new);
  const toggleEditMode = () => setCanEdit(!canEdit);

  const deleteConfirmCRC = `borrar-tarjeta`; //Se obtiene el nombre de la tarjeta CRC de la base de datos y se pone como "borrar-[nombre]""


    //Cargar todas las clases registradas, menos la clase que se este modificando/agregando
    const [superClassesOptions, setSuperClassesOptions] = useState([]);
    const [subClassesOptions, setSubClassesOptions] = useState([]);
    const [colabOptions, setcolabOptions] = useState([]);
    
    //Creo que pueden ser el mismo objeto ya que siempre son todas las clases menos la actual

  
    // Modal states
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [confirmDeleteModalState, setConfirmDeleteModalState] = useState(false);
    //Inputs states
    const [crcName, setCrcName] = useState('');
    const [deleteCrcName, setDeleteCrcName] = useState('');

    
    const openDeleteModal = () => setDeleteModalState(true);
    const closeDeleteModal = () => setDeleteModalState(false);

    const openconfirmDeleteModal = () => setConfirmDeleteModalState(true);
    const closeConfirmDeleteModal = () => setConfirmDeleteModalState(false);

    //El nombre de la tarjeta CRC
    const [className, setClassName] = useState('');

    const [selectedSuperClasses, setSelectedSuperClasses] = useState('');
    const [selectedSubClasses, setSelectedSubClasses] = useState('');


    const [selectedClasses, setSelectedClasses] = useState([]);
    const [projectCollabs, setProjectCollabs] = useState([]);
    const [selectedProjectColabs, setSelectedProjectCollabs] = useState([]);
    const [colabs, setColabs] = useState([]);

    const [responsabilities, setResponsabilities] = useState(fakeDataCRC);   
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      loadClases().then(()=>{
        getData()
      })
    },[])
  const getData =  async ()=>{
      let ref = collection(db, 'projects', doc_name, "CRC")
      const data = await getDocs(ref, where('id', '==', id))
      data.forEach(res=>{
          if(res.data().historyNum===id){
              setResponsabilities(res.data().responsabilities);
              setSelectedSubClasses(res.data().selectedSubClasses);
              setSelectedSuperClasses(res.data().selectedSuperClasses);
              setClassName(res.data().crcName);
              setSelectedProjectCollabs(res.data().collabs)
          }
      })
      const dataCol = await getDocs(collection(db, 'projects', doc_name, "colaborators"))
        dataCol.forEach(element=>{
            setProjectCollabs( (prevData)=>[...prevData, element.data().name])
            setColabs((prevData) => [...prevData, {name: element.data().name, id: element.data().uid}])
        })
        setLoading(false);
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

    const handleSelectedSuperClasses = (selected) => setSelectedSuperClasses(selected);
    const handleSelectedSubClasses = (selected) => setSelectedSubClasses(selected);
    const handleSelectedProjectCollabs= (selected) => setSelectedProjectCollabs([...selected]);
    const handleDeleteCrcName = (name) => setDeleteCrcName(name);
    
    //Data de las responsabilidades y sus colaboradores mediante
    //un arreglo de objetos
    

    const handleResponsabilitiesName = (index, value) => {
      const temp = [...responsabilities];
      temp[index].name = value;
      setResponsabilities([...temp]);
    }
    
    const handleResponsabilitiesCollabs = (index, value) => {
      const temp = [...responsabilities];
      temp[index].collaborators = value;
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
      let selectedAux = []
        selectedProjectColabs.forEach(element=>{
            let res = colabs.find(co=> co.name === element)
            if(!!res) selectedAux.push(res)
        })
      let aux = {
            id: new Date().getTime(), 
            crcName: className,
            selectedSuperClasses: selectedSuperClasses, 
            selectedSubClasses: selectedSubClasses,
            responsabilities:responsabilities,
            collabs: selectedAux,
        }
        if( selectedSuperClasses !== '' &&   selectedSubClasses !== '' && responsabilities !== ''){
          if(_new){
              await addDoc(collection(db, 'projects', doc_name, 'CRC'), aux).then(()=>{})
          }else{
            const ref = doc(db, 'projects', doc_name, 'CRC', fire);

            // Set the "capital" field of the city 'DC'
            await updateDoc(ref, {
              crcName: className,
              selectedSuperClasses: selectedSuperClasses, 
              selectedSubClasses: selectedSubClasses,
              responsabilities:responsabilities,
              collabs: selectedAux,
            });
          }
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
          {/* <MultiSelect
            canEdit={canEdit}
            options={superClassesOptions}
            value={selectedSuperClasses}
            handleSelected={handleSelectedSuperClasses}
          /> */}
          <CRCFullResponsabilitieName
            disabled={!canEdit}
            value={selectedSuperClasses}
            onChange={ev => handleSelectedSuperClasses(ev.target.value)}
          />
          <CRCFullSectionTitle>Subclases</CRCFullSectionTitle>
          {/* <MultiSelect
            canEdit={canEdit}
            options={subClassesOptions}
            value={selectedSubClasses}
            handleSelected={handleSelectedSubClasses}
          /> */}
          <CRCFullResponsabilitieName
            disabled={!canEdit}
            value={selectedSubClasses}
            onChange={ev => handleSelectedSubClasses(ev.target.value)}
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
                {/* <MultiSelect handleSelected={handleResponsabilitiesCollaborators(index)} value={e.collaborators} canEdit={canEdit} options={colabOptions}/> */}
                 <CRCFullResponsabilitieName
                  disabled={!canEdit}
                  value={e.collaborators}
                  onChange={ev => handleResponsabilitiesCollabs(index, ev.target.value)}
                />
              </CRCFullResponsabiliteContainer>
            )}
          </CRCFullResponsabilitiesScrollContainer>
          <CRCFullNewResponsabilitieButton canEdit={canEdit} onClick={newResponsabilitie}>Nueva responsabilidad</CRCFullNewResponsabilitieButton>
          {/* <CRCFullNewResponsabilitieButton onClick={() => localStorage.setItem('test', JSON.stringify(responsabilities))}>Guardar</CRCFullNewResponsabilitieButton> */}
      </CRCFullContainer>
      <CRCFullButtonsContainer>
        { usertype === 'L' ? 
        <>
        <RoundedButton onClick={editCRC} className='edit_btn' active={canEdit}>
          { _new ?
            <FiCheck />
          :
          <FiEdit2 /> }
          </RoundedButton>
        <RoundedButton onClick={saveCRC} className='save'><FiSave /></RoundedButton>
        {!_new ? <RoundedButton onClick={openDeleteModal} className='delete_btn'><FiTrash /></RoundedButton> : ""}
        {/* ------------------------------ */}
        <MultiSelect 
          canEdit={canEdit}
          options={projectCollabs}
          value={selectedProjectColabs}
          handleSelected={handleSelectedProjectCollabs}
          reverse={true}
          placeholder="Colaboradores:"
          max={2}
        />
        </> : 
        <RoundedButton onClick={saveCRC} className='edit_btn'><FiCheck /></RoundedButton>
        }
      </CRCFullButtonsContainer>
      {/* Modal delete */}
      <Modal
                estado={deleteModalState}
                cambiarEstado={setDeleteModalState}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>Ingrese "borrar-{className}" para eliminar</msg>
                    <InputField 
                        label=""
                        placeholder= {"borrar-"+className}
                        inputWidth="90%"
                        password={false}
                        value={deleteCrcName}
                        onChange={handleDeleteCrcName}
                    />
                    <ContenedorBotones>
                        <Boton2 onClick={closeDeleteModal}>Cancelar</Boton2>
                        <Boton 
                            disabled={ !(deleteCrcName === "borrar-"+className) }
                            onClick={() => {
                                    closeDeleteModal();
                                    openconfirmDeleteModal();}
                        }>Eliminar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>

            <Modal
                estado={confirmDeleteModalState}
                cambiarEstado={setConfirmDeleteModalState}
                titulo="Titulo"
                mostrarHeader={false}
                mostrarOverlay={true}
                posicionModal={'center'}
                padding={'20px'}
            >
                <Contenido>
                    <msg>¿Esta seguro que desea eliminar [Tarjeta Crc]?
                        <br></br>Esta accion es irreversible.
                    </msg>
                    <ContenedorBotones>
                        <Boton3 onClick={deleteCRC}>Eliminar</Boton3>
                        <Boton onClick={closeConfirmDeleteModal}>Cancelar</Boton>
                    </ContenedorBotones>
                </Contenido>
            </Modal>
    </CRCFullPageContainer>
  )
}

export default CRCFull;

