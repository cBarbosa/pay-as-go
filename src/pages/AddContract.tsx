import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { HeaderNav } from '../components/HeaderNav';
import { BottonNav } from '../components/BottonNav';

import '../styles/add-contract.scss';

export default function AddContract() {
  const { theme } = useTheme();

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
                    <select>
                          <option>
                              Plano escolhido
                          </option>
                      </select>
                  </div>
                  <div>
                      <h3>R$ 1.000,00</h3>
                      <span>(3 X R$ 333,00)</span>
                  </div>
                  <div>
                      <h2>Dependentes</h2>
                      <div>
                          <div>
                            <label>Adicione os dependentes</label>
                            <select>
                                <option>Selecione</option>
                                <option>Dependente 1</option>
                                <option>Dependente 2</option>
                            </select>
                            <button>
                                Add
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
