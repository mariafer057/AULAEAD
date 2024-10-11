interface Reserva{
    id: number;
    usuario_id: number;
    mesa_id: number;
    data: string;
    n_pessoas: number;
    status: boolean;
}
const DetalhesReserva: React.FC<{ reserva: Reserva }> = ({ reserva }) => {
    return (
      <div>
        <h1>Reserva ID: {reserva.id}</h1>
        <p>ID do Usuário: {reserva.usuario_id}</p>
        <p>ID da Mesa: {reserva.mesa_id}</p>
        <p>Data: {reserva.data}</p>
        <p>Número de Pessoas: {reserva.n_pessoas}</p>
        <p>Status: {reserva.status ? "Ativa" : "Cancelada"}</p>
      </div>
    );
  };
  
  export default DetalhesReserva;