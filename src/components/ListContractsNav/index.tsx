import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import imgEnvelope from '../../assets/images/envelope-regular.svg';
import imgAddressCard from '../../assets/images/address-card-regular.svg';
import { ContractModel } from '../../models/Contract';
import { getAllContracts } from '../../services/ContractService';

import './styles.scss';

type ListContractsProps = {
    personId: string;
}

export const numberFormat = (value:number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

export const dateFormat = (value:Date|undefined) =>
    new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short'
    }).format(value);


export function ListContractsNav(props: ListContractsProps) {
    const [contracts, setContracts] = useState<ContractModel[]>([]);
    const history = useHistory();

    useEffect(()=> {

        (async function() {
          const result = await getAllContracts(props.personId);
          console.debug('getAllContracts', result);
          setContracts(result);
        })();
        
    }, [props.personId]);

    return (
        <>
          <div className="separator">Resultado - { contracts.length } registros</div>
            {contracts.map(contract => {
              return (
                <div className="list-contract" key={contract.recordId}>
                    <div className="contract-card">
                      <div className="contract-info">
                        <h3>{contract.plan.name}</h3>
                        <span>{contract.plan.code}</span>
                        <p>
                            <img src={imgEnvelope} alt='' />
                            {numberFormat(contract?.amount ? contract?.amount : 0)}
                            &nbsp;<span>({contract?.installments ? contract?.installments : 0} parcela(s) de {numberFormat(contract?.montlyAmount? contract?.montlyAmount : 0)})</span>
                        </p>
                        <p>
                          <img src={imgEnvelope} alt='' />
                          {contract.person.name}
                          <span>{contract.person.document}</span>
                        </p>
                        <p>
                        <img src={imgEnvelope} alt='' />
                          {contract.persons.length} beneficiários
                        </p>
                        
                      </div>
                      <div className="action">
                          <button onClick={() => history.push(`/contract/${contract.recordId}`)}>
                            <img src={imgAddressCard} alt='Dados' />
                            Dados
                          </button>
                      </div>
                    </div>
                </div>
              );
            })}
        </>
    );
}
