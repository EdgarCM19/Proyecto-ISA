import React from 'react'
import { useHistory } from 'react-router-dom/';
import { UserHistoryMiniContainer, UserhistoryMiniInfoText, UserHistoryMiniList, UserHistoryMiniSectionTitle, UserHistoryMiniTitle } from './UserHistoryMiniElements';

const UserHistoryMini = ({ id,key,fire, name, number, priority, time, date, doc_name}) => {
  
  const history = useHistory();
  const goToUserHistory = () => {
    history.push({
      pathname: `/user-history/${id}`, 
      state: {
          id: id,
          _new: false,
          doc_name:doc_name,
          fire:fire
      }
    });
  };


  return (
      <UserHistoryMiniContainer onClick={goToUserHistory}>
            <UserHistoryMiniTitle>{name}</UserHistoryMiniTitle>
            {/*<UserHistoryMiniSectionTitle>Superclases:</UserHistoryMiniSectionTitle>
            <UserHistoryMiniList>{superClasses.join(', ')}</UserHistoryMiniList>
            <UserHistoryMiniSectionTitle>Subclases:</UserHistoryMiniSectionTitle>
            <UserHistoryMiniList>{subClasses.join(', ')}</UserHistoryMiniList> */}
            <UserhistoryMiniInfoText className='start'>#: {number}</UserhistoryMiniInfoText>
            <UserhistoryMiniInfoText>Prioridad: {priority}</UserhistoryMiniInfoText>
            <UserhistoryMiniInfoText>Tiempo: {time}</UserhistoryMiniInfoText>
            <UserhistoryMiniInfoText>Fecha: {date}</UserhistoryMiniInfoText>
      </UserHistoryMiniContainer>
  )
} 

export default UserHistoryMini;