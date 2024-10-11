interface Usuario{
    id: number;
    nome: string;
    idade: number;
    email?: string;
    password: string;
    tipo: string;
}
const PerfilDoUsuario: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
    return (
      <div>
        <h1>Id: {usuario.id}</h1>
        <p>Nome: {usuario.nome}</p>
        <p>Idade: {usuario.idade}</p>
        {usuario.email && <p>Email: {usuario.email}</p>}
        <p>Tipo de usuário: {usuario.tipo}</p>
      </div>
    );
  };
  
  export default PerfilDoUsuario;