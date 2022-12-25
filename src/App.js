import './App.css';
import React, { Component} from 'react';
import api from './Api';

export default class App extends Component {
  state = {
    transferencias:[]
  };

    

      async componentDidMount(){

        const form = document.querySelector('#formulario');
        
      
        form.addEventListener('click',  async (event) => {

         event.preventDefault();
         
         const DI = document.getElementById('DataStart');
         const DE = document.getElementById('Dataend');
         const NO = document.getElementById('nome');
         
         const DataInicio = DI.value;
         const DataEnd = DE.value;
         const Nome = NO.value;
     
     
         let url = '';
     
         if(Nome || DataInicio){
           if(DataInicio && Nome){
             url = `/${DataInicio}/${DataEnd}/${Nome}`;
           }
           if(Nome){
            url = `/${Nome}`;
           }
           if(!Nome) url = `/${DataInicio}/${DataEnd}`;
         }
         else url='';


         const response =  await api.get(url).then(res => {
          this.setState({transferencias:res.data})
          console.log(res.data);
         }).catch(console.error());
        }
     )}
    

render(){
     return (
            <div>
              <form id="formulario" action=''>
                <div>
                  <label for="DataStart">Data de Início:</label>
                  <input type="text" id="DataStart" placeholder='2004-01-21' />
                </div>
                <div>
                  <label for="Dataend">Data Final:</label>
                  <input type="text" id="Dataend" placeholder='2004-01-30' />
                </div>
                <div>
                  <label for="mnome">Nome do Operador da Transação:</label>
                  <textarea type="text" id="nome"></textarea>
                </div>
                <div class="button">
                  <button type="submit">Pesquisar</button>
                </div>
              </form>
      
              <div>
                <li>
                  {this.state.transferencias.map(transferencia => (
                    <li>
                      <b>Data:</b>{transferencia.data_transferencia}<br/>
                      <b>Valor:</b>{transferencia.valor}<br/>
                      <b>Tipo:</b>{transferencia.tipo}<br/>
                      <b>Nome do Operador:</b>{transferencia.nome_operador_transacao}<br/>
                    </li>
                  ))}
                </li>
              </div>
            </div>
          );

                  }



      }

