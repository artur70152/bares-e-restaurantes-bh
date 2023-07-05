import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../funcionalidades/actions';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Navigate } from 'react-router-dom';
const Signup = () => {
    const token = localStorage.getItem('token');
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const [searchQueryName, setSearchQueryName] = useState('');
    const [searchQueryEndereco, setSearchQueryEndereco] = useState('');
    const [searchQueryPreços, setSearchQueryPreços] = useState('');
    const [searchQuerytipos, setSearchQuerytipos] = useState('');
    const[data,setdata]=useState([]);
  const dispatch = useDispatch();
  const styles = `
  .search-input {
    width: 200px;
    margin-bottom: 10px;
  }
    .table {
      border-collapse: collapse;
      width: 100%;
    }

    .table th,
    .table td {
      border: 1px solid black;
      padding: 8px;
    }

    .table th {
      background-color: #f2f2f2;
    }

    .table tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    .table tr:hover {
      background-color: #ddd;
    }
  `;
  useEffect(() => {
    async function fetchData() {
      const response = await api.get('dashboard2');
      const dataq = response.data;
      setdata(dataq);

    }
    fetchData();
  }, []);
  const sair = () => {
    dispatch(signout());
  };
  const pagina = () => {
  // history.push('/dashboard')
   //history.go('/dashboard')
   filterData().map((item) =>{(console.log(item))})
  };
  const filterData = () => {
    return data.filter((item) => {
      console.log(item)
      try{
        // o método includes() é usado para verificar se item.nome contém a substring searchQueryName. 
        //Esse método retorna true se a substring estiver presente e false caso contrário.
      const nameMatch = item.nome.toLowerCase().includes(searchQueryName.toLowerCase());
      const enderecoMatch = item.endereço.toLowerCase().includes(searchQueryEndereco.toLowerCase());
      const preçosMatch = item.preços.toLowerCase().includes(searchQueryPreços.toLowerCase());
      const tiposMatch = item.tipo.toLowerCase().includes(searchQuerytipos.toLowerCase());
      
      console.log(nameMatch)
      console.log(enderecoMatch)
      console.log(preçosMatch)
      console.log(tiposMatch)
      //console.log(filterData)
      return nameMatch && enderecoMatch && preçosMatch &&tiposMatch;
    }catch{return ('')}
    });
   
  };
  
 


  return (
    <div>
   <h1>dashboard2</h1>
   <button type="button" onClick={pagina}>
          pagina anterior
        </button>
   <style>{styles}</style>
   <div>
        <input
          type="text"
          className='search-input'
          value={searchQueryName}
          onChange={(event) => setSearchQueryName(event.target.value)}
          placeholder="Pesquisar por nome..."
        />
      </div>

      <div>
        <input
          type="text"
          className='search-input'
          value={searchQueryEndereco}
          onChange={(event) => setSearchQueryEndereco(event.target.value)}
          placeholder="Pesquisar por endereço..."
        />
      </div>

      <div>
        <input
          type="text"
          className='search-input'
          value={searchQueryPreços}
          onChange={(event) => setSearchQueryPreços(event.target.value)}
          placeholder="Pesquisar por preços..."
        />
      </div>
      <div>
        <input
          type="text"
          className='search-input'
          value={searchQuerytipos}
          onChange={(event) => setSearchQuerytipos(event.target.value)}
          placeholder="Pesquisar por tipo..."
        />
      </div>
   <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Preços</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
        {filterData().map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.endereço}</td>
              <td>{item.preços}</td>
              <td>{item.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={sair}>
          sair
        </button>




















   </div>
  );
};

export default Signup;