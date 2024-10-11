import DetalhesReserva from '../Interfaces/reserva';

const PaginaReserva = () => {
  const reserva = {
    id: 1,
    usuario_id: 1,
    mesa_id: 1,
    data: '2024-10-10',
    n_pessoas: 3,
    status: true,
  };

  return (
    <div>
      <h1>Página da Reserva</h1>
      <DetalhesReserva reserva={reserva} />
    </div>
  );
};

export default PaginaReserva;
