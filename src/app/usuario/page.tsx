import PerfilDoUsuario from '../Interfaces/usuario';

const PaginaUsuario = () => {
  const usuario = {
    id: 1,
    nome: 'João Silva',
    idade: 28,
    email: 'joao.silva@example.com',
    password: 'senha123',
    tipo: 'adm',
  };

  return (
    <div>
      <h1>Página do Usuário</h1>
      <PerfilDoUsuario usuario={usuario} />
    </div>
  );
};

export default PaginaUsuario;
