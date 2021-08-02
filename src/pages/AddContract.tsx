import React, { ChangeEvent, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { HeaderNav } from '../components/HeaderNav';
import { BottonNav } from '../components/BottonNav';

import '../styles/add-contract.scss';
import { Plan } from '../models/Plan';
import { useEffect } from 'react';
import { get } from '../services/PlanService';
import { Person } from '../models/Person';

export const numberFormat = (value:number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

export default function AddContract() {
  const { theme } = useTheme();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanRecordId, setSelectedPlanRecordId] = useState<string|undefined>('');
  const [selectedPlanValue, setSelectedPlanValue] = useState<number|undefined>(0);
  const [selectedPlanInstallments, setSelectedPlanInstallments] = useState<number>(1);
  const [selectedPlanInstallmentValue, setSelectedPlanInstallmentValue] = useState<number>(0);
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(()=> {

    (async function() {
      const result = await get();
      console.debug('getPlans', result);
      setPlans(result);
    })();
    
  }, []);

  function handePlanConfig(event:ChangeEvent<HTMLSelectElement>) {
    const item = plans.find(x => x.recordId === event.target.value);
    const value = (item?.classes.map(obj => obj.value).reduce((acc, item) => acc + item ) as number) * (persons.length + 1);
    const installment = item === undefined ? 1 :
      item.code.indexOf('Trimestral') === 0 ? 3 : 
      item.code.indexOf('Semestral') === 0 ? 6 : 
      item.code.indexOf('Anual') === 0 ? 12 : 1;

    setSelectedPlanRecordId(item?.recordId);
    setSelectedPlanValue(value);
    setSelectedPlanInstallments(installment);
    // setSelectedPlanInstallmentValue(value ? (value / installment) : 0 );
    setSelectedPlanInstallmentValue(value);
  }

  function handlePersonsAdd() {
    setPersons([]);
  }

  return (

    <div id='page-contract-add' className={theme}>
      <HeaderNav />
      <main className={theme}>
        <div className="content">
          <h2>Novo Contrato</h2>

          <div>
              <div>
                  <h3>Nome do contratante</h3>
                  <span>000000000000000</span>
              </div>
              <form>
                  <div>
                    <label>
                        Selecione o plano
                    </label>
                    <select
                      onChange={event => handePlanConfig(event)}
                      value={selectedPlanRecordId}
                      >
                        <option>Selecione</option>
                      {plans.map(plan=> {
                        return(
                          <option key={plan.recordId} value={plan.recordId}>
                            {plan.name} - {plan.code}
                          </option>
                        );
                      })}
                    </select>

                    <label>
                        Selecione o dia de vencimento
                    </label>
                    <select>
                      <option>Selecione</option>
                      <option>Dia 1</option>
                      <option>Dia 10</option>
                    </select>
                  </div>
                  <div>
                      <h3>{numberFormat(selectedPlanValue ? selectedPlanValue : 0)}</h3>
                      <span>({selectedPlanInstallments} X {numberFormat(selectedPlanInstallmentValue)})</span>
                  </div>
                  <div>
                      <h2>Dependentes</h2>
                      <div>
                          <div>
                            <label>Adicione os dependentes</label>
                            <input type='number' maxLength={15} />
                            <button>
                                Procurar
                            </button>
                          </div>
                          <div>
                            <div>
                                <h3>Nome do dependente 1</h3>
                                <span>11111111111</span>
                                <div>
                                    <button>
                                        Rem
                                    </button>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </form>
          </div>
          
        </div>
      </main>
      <BottonNav />
    </div>
  );
}
