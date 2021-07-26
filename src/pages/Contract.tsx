import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BottonNav } from '../components/BottonNav';
import { HeaderNav } from '../components/HeaderNav';
import { useTheme } from '../hooks/useTheme';

import { ContractModel } from '../models/Contract';
import { get } from '../services/ContractService';

import imgUser from '../assets/images/user-regular.svg';
import imgEnvelope from '../assets/images/envelope-regular.svg';
import imgCalendar from '../assets/images/calendar-alt-regular.svg';
import imgUserFriend from '../assets/images/user-friends-solid.svg';
import imgMoney from '../assets/images/dollar-sign-solid.svg';
import imgCalendarRegular from '../assets/images/calendar-regular.svg';
// import imgCalendarCheck from '../assets/images/calendar-check-regular.svg';
// import imgCalendarTimes from '../assets/images/calendar-times-regular.svg';

import '../styles/contract.scss';

type RoomParams = {
  id: string;
};


export const numberFormat = (value:number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

export const dateFormat = (value:Date|undefined) =>
    new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short'
    }).format(value);

export default function Contract() {
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const contractId = params.id;
  const [contract, setContract] = useState<ContractModel>();

  useEffect(()=> {

    (async function() {
      const result = await get(contractId);
      console.debug('getContract', result);
      setContract(result);
    })();
    
  }, [contractId]);

  return (
    <div id="page-contract" className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Contrato</h2>
          <span>Situação</span>

          <div className="contract-detail">
            <h2>
              {contract?.plan.name}
              <span>({contract?.plan.code})</span>
            </h2>
            <h3>
              <img src={imgUser} alt='' />
              { contract?.person?.name }
            </h3>
            <h4>
              <img src={imgEnvelope} alt='' />
              { contract?.person?.email }
            </h4>
            <p>
              <img src={imgCalendar} alt='' />
              <span>
                {contract?.starts !== undefined
                ? dateFormat(new Date(contract?.starts))
                : ('-')}
              </span>
              &nbsp;a&nbsp;
              {contract?.ends !== undefined
                ? dateFormat(new Date(contract?.ends))
                : ('-')}
            </p>
            <p>
              <img src={imgMoney} alt='' />
              {numberFormat(contract?.amount ? contract?.amount : 0)}
              &nbsp;<span>({contract?.installments ? contract?.installments : 0} parcela(s) de {numberFormat(contract?.montlyAmount? contract?.montlyAmount : 0)})</span>
            </p>
          </div>

          <div className="contract-persons">
            <h3>Beneficiários</h3>
            <div className="person-list">
              {contract?.persons.map((person) => {
                return(
                  <p key={person.recordId}>
                    <img src={imgUserFriend} alt='' />
                    {person.name}
                    <span>{person.document}</span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="contract-payments">
            <h3>Parcelas</h3>
            {contract?.installmentList.map((installment) => {
                return(
                  <p key={installment.recordId}>
                    <img src={imgCalendarRegular} alt='' />
                    {numberFormat(installment.amount)}
                    &nbsp;
                    {dateFormat(new Date(installment.dueDate))}
                  </p>
                );
            })}
            
          </div>
        </div>
      </main>
      <BottonNav />
    </div>
  );
}
