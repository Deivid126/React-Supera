import './App.css';
import React, { Component } from 'react';
import api from './Api';
import { Table } from 'reactstrap';

export default class App extends Component {
  state = {
    transferencias: []
  };



  async componentDidMount() {

    const form = document.querySelector('#formulario');


    form.addEventListener('click', async (event) => {

      event.preventDefault();

      const DI = document.getElementById('DataStart');
      const DE = document.getElementById('Dataend');
      const NO = document.getElementById('nome');

      const DataInicio = DI.value;
      const DataEnd = DE.value;
      const Nome = NO.value;


      let url = '';

      if (Nome || DataInicio) {
        if (DataInicio && Nome) {
          url = `/${DataInicio}/${DataEnd}/${Nome}`;
        }
        if (Nome) {
          url = `/${Nome}`;
        }
        if (!Nome) url = `/${DataInicio}/${DataEnd}`;
      }
      else url = '';


      const response = await api.get(url).then(res => {
        this.setState({ transferencias: res.data })
        console.log(res.data);
      }).catch(console.error());
    }
    )
  }


  render() {
    return (
      <div id='body'>
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
            <input type="text" id="nome"></input>
          </div>
          <div class="button">
            <button type="submit">Pesquisar</button>
          </div>
        </form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
          {this.state.transferencias.map(transferencia => (
        <tr>
          <td>{transferencia.data_transferencia}</td>
          <td>{transferencia.valor}</td>
          <td>{transferencia.tipo}</td>
          <td>{transferencia.nome_operador_transacao || transferencia.id_conta.nome_responsavel}</td>
        </tr>
          ))}
        </tbody>
        </Table>
      </div>
    );

  }



}

