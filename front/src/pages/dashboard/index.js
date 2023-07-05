import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../funcionalidades/actions';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Navigate } from 'react-router-dom';

export default function Signin() {
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

  const [data, setdata] = useState([]);
  const [editMode, setEditMode] = useState([]);
  const [addMode, setaddmode] = useState(false);
  const [newname, setnewname] = useState('');
  const [newendereço, setnewendereço] = useState('');
  const [newpreços, setnewpreços] = useState('');
  const [newtipo, setnewtipo] = useState('');
  const [dat,setdat]=useState([])
  const [searchQueryName, setSearchQueryName] = useState('');
  const [searchQueryEndereco, setSearchQueryEndereco] = useState('');
  const [searchQueryPreços, setSearchQueryPreços] = useState('');
  const [searchQuerytipos, setSearchQuerytipos] = useState('');
  const token = localStorage.getItem('token');
  api.defaults.headers.Authorization = `Bearer ${token}`;

  const dispatch = useDispatch();

  const sair = () => {
    dispatch(signout());
  };

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('dashboard');
      const dataq = response.data;
      setdata(dataq);
      setEditMode(new Array(dataq.length).fill(false));
    }
    fetchData();
  }, [ ,dat]);

  const handleEnderecoChange = (itemId, event) => {
    const { value } = event.target;
    setdata((prevData) =>
      prevData.map((item, index) => {
        if (index === itemId) {
          return {
            ...item,
            endereço: value
          };
        }
        return item;
      })
    );
  };

  const handlePrecoChange = (itemId, event) => {
    const { value } = event.target;
    setdata((prevData) =>
      prevData.map((item, index) => {
        if (index === itemId) {
          return {
            ...item,
            preços: value
          };
        }
        return item;
      })
    );
  };

  const handleTipoChange = (itemId, event) => {
    const { value } = event.target;
    setdata((prevData) =>
      prevData.map((item, index) => {
        if (index === itemId) {
          return {
            ...item,
            tipo: value
          };
        }
        return item;
      })
    );
  };

  const salvarEdicao = async (itemId) => {
    try {
      await api.put('dashboard', {
        id: data[itemId].id,
        nome: data[itemId].nome,
        endereço: data[itemId].endereço,
        preços: data[itemId].preços,
        tipo: data[itemId].tipo
      });
      setEditMode((prevMode) =>
        prevMode.map((mode, index) => (index === itemId ? false : mode))
      );
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const cancelarEdicao = (itemId) => {
    setEditMode((prevMode) =>
      prevMode.map((mode, index) => (index === itemId ? false : mode))
    );
  };

  const editar = (itemId) => {
    setEditMode((prevMode) =>
      prevMode.map((mode, index) => (index === itemId ? true : mode))
    );
  };

  const handleNameChange = (event) => {
    setnewname(event.target.value);
  };

  const handleEnderecoNewChange = (event) => {
    setnewendereço(event.target.value);
  };

  const handlePrecoNewChange = (event) => {
    setnewpreços(event.target.value);
  };

  const handleTipoNewChange = (event) => {
    setnewtipo(event.target.value);
  };

  const salvarNew = async () => {
    try {
      const response = await api.post('dashboard', {
        nome: newname,
        endereço: newendereço,
        preços: newpreços,
        tipo: newtipo
      });

      setaddmode(false);
      setdata((prevData) => [...prevData, response]);
      setnewendereço('');
      setnewpreços('');
      setnewname('');
      setnewtipo('');
      setdat((prevData) => [...prevData, 1]);
    } catch (error) {
      console.error('Failed to save new item:', error);
    }
  };

  const cancelarNew = () => {
    setaddmode(false);
  };
  const proximap = () => {
  history.push('/dashboard2')
  history.go('/dashboard2')
  };

  const adicionar = () => {
    setaddmode(true);
  };

  const filterData = () => {
    return data.filter((item) => {
      try{
      const nameMatch = item.nome.toLowerCase().includes(searchQueryName.toLowerCase());
      const enderecoMatch = item.endereço.toLowerCase().includes(searchQueryEndereco.toLowerCase());
      const preçosMatch = item.preços.toLowerCase().includes(searchQueryPreços.toLowerCase());
      const tiposMatch = item.tipo.toLowerCase().includes(searchQuerytipos.toLowerCase());
      
      console.log(nameMatch)
      console.log(enderecoMatch)
      console.log(preçosMatch)
      console.log(tiposMatch)
      return nameMatch && enderecoMatch && preçosMatch &&tiposMatch;
    }catch{return ('')}
    });

  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={proximap}>
                      proxima pagina
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
          {filterData().map((item, index) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              {editMode[index] ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={item.endereço}
                      onChange={(event) => handleEnderecoChange(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.preços}
                      onChange={(event) => handlePrecoChange(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.tipo}
                      onChange={(event) => handleTipoChange(index, event)}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => salvarEdicao(index)}>
                      Salvar
                    </button>
                    <button type="button" onClick={() => cancelarEdicao(index)}>
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ textAlign: 'center' }}>{item.endereço}</td>
                  <td>{item.preços}</td>
                  <td>{item.tipo}</td>
                  <td>
                    <button type="button" onClick={() => editar(index)}>
                      Editar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {addMode ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Preços</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" value={newname} onChange={handleNameChange} />
              </td>
              <td>
                <input type="text" value={newendereço} onChange={handleEnderecoNewChange} />
              </td>
              <td>
                <input type="text" value={newpreços} onChange={handlePrecoNewChange} />
              </td>
              <td>
                <input type="text" value={newtipo} onChange={handleTipoNewChange} />
              </td>
              <td>
                <button type="button" onClick={salvarNew}>
                  Salvar
                </button>
                <button type="button" onClick={cancelarNew}>
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <button type="button" onClick={adicionar}>
          Adicionar Item
        </button>
      )}

<button type="button" onClick={sair}>
          sair
        </button>


    </div>
  );
}