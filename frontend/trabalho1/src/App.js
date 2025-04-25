import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    cpf: '',
    email: '',
    endereco: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Busca usuários ao carregar
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8800/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:8800', formData);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      idade: '',
      cpf: '',
      email: '',
      endereco: ''
    });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingId(user.idusuarios);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Sistema de Usuários</h1>
        <p className="developer-name">Desenvolvido por Bruno Rodolfo da Silveira</p>
      </header>

      <div className="form-section">
        <h2>{editingId ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="000.000.000-00"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Endereço:</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              {editingId ? 'Atualizar' : 'Salvar'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-cancel">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="users-list">
        <h2>Lista de Usuários</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.idusuarios}>
                  <td>{user.nome}</td>
                  <td>{user.idade}</td>
                  <td>{user.cpf}</td>
                  <td className="actions">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="btn-edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.idusuarios)}
                      className="btn-delete"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;