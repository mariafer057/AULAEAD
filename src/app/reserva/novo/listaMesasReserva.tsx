'use client';

import Mesa from "@/app/interfaces/mesa";
import ModalMap from "@/app/componentes/modalMap";
import { useState, FormEvent } from "react";

type Reserva = {
    mesaId: number;
    nomeCliente?: string;
    horario?: string;
};

type ListMesasReservaProps = {
    mesas: Mesa[];
};

export function ListMesasReserva({ mesas }: ListMesasReservaProps) {
    const [data, setData] = useState('');
    const [reservas, setReservas] = useState<Reserva[] | null>(null);
    const [loadReservas, setLoadReservas] = useState(false);
    const [mesaS, setMesaS] = useState<Mesa | null>(null);
    const [erroData, setErroData] = useState(false); // Estado para controlar erro

    // Função para buscar as reservas
    async function fetchReserva(data: string) {
        try {
            // Simulação de resposta de reservas
            const reservasFake: Reserva[] = [
                { mesaId: 1, nomeCliente: "João", horario: "12:00" },
                { mesaId: 2, nomeCliente: "Maria", horario: "13:00" },
            ];
            return reservasFake;
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
            return [];
        }
    }

    // Função para fazer uma nova reserva
    async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string) {
        try {
            // Simulação de resposta de nova reserva
            const novaReserva = { mesaId, n_pessoas, data };
            console.log("Reserva feita:", novaReserva);
            return novaReserva;
        } catch (error) {
            console.error("Erro ao fazer reserva:", error);
        }
    }

    // Função para buscar as reservas
    async function fetchReserva(data: string) {
        try {
            // Aqui você faria a requisição para buscar as reservas.
            // Exemplo de simulação com dados fictícios:
            const reservasFake: Reserva[] = [
                { mesaId: 1, nomeCliente: "João", horario: "12:00" },
                { mesaId: 2, nomeCliente: "Maria", horario: "13:00" },
            ];
            return reservasFake;
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
            return [];
        }
    }

    // Função para fazer uma nova reserva
    async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string) {
        try {
            // Aqui você faria a requisição para fazer a nova reserva.
            // Exemplo de simulação de resposta:
            const novaReserva = { mesaId, n_pessoas, data };
            console.log("Reserva feita:", novaReserva);
            return novaReserva;
        } catch (error) {
            console.error("Erro ao fazer reserva:", error);
        }
    }

    async function handleFetchData() {
        setLoadReservas(true);
        await new Promise(resolve => setTimeout(resolve, 8000));
<<<<<<< HEAD

=======
        
>>>>>>> 7131dfb16a412e9cb13e00e868f6437d7dd21fae
        const res = await fetchReserva(data);
        
        // Verifica se não há reservas para a data
        if (res.length === 0) {
            setErroData(true); // Exibe o erro se não houver mesas
        } else {
            setErroData(false); // Reseta o erro caso haja mesas
            setReservas(res); // Define as reservas para a data
        }
        
        setLoadReservas(false);
    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const mesaId = parseInt(formData.get('mesaId') as string);
        const n_pessoas = parseInt(formData.get('n_pessoas') as string);

        const res = await fetchNovaReserva(mesaId, n_pessoas, data);
        console.log("Reserva realizada:", res);
    }

    return (
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row p-4 rounded-lg overflow-hidden">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Mapa Restaurante:</h2>
                <ModalMap />
                <h2 className="text-xl font-bold mb-4">Fazer reserva:</h2>
                <div className="flex w-full gap-4">
                    <input
                        type="date"
                        value={data}
                        onChange={e => setData(e.target.value)}
                        className="p-2 border rounded w-5/6"
                    />
                    <button
                        type="button"
                        onClick={handleFetchData}
                        className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700 w-1/6"
                    >
                        Buscar
                    </button>
                </div>
                {loadReservas && <p className="text-center mt-4">Carregando Mesas...</p>}
                {erroData && (
                    <p className="text-center mt-4 text-red-500">Nenhuma mesa disponível para a data selecionada.</p>
                )}
                <div className="grid grid-cols-4 lg:grid-cols-12 gap-4 mt-4">
                    {reservas && !loadReservas &&
                        mesas.map(mesa => {
                            if (reservas.find(reserva => reserva.mesaId === mesa.id)) {
                                return (
                                    <button
                                        key={mesa.id}
                                        className="p-4 text-white bg-indigo-500 rounded-lg"
                                    >
                                        <p>{mesa.codigo}</p>
                                    </button>
                                );
                            }
                            return (
                                <button
                                    key={mesa.id}
                                    className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                                >
                                    <p>{mesa.codigo}</p>
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            {mesaS && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-xl font-bold mb-4">Confirmar Reserva:</h3>
                        <form action="" className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
                            <label className="flex flex-col space-y-1">
                                <input type="date" readOnly value={data} className="p-2 border rounded" name="data" />
                            </label>
                            <label className="flex flex-col space-y-1">
                                Mesa:
                                <input type="number" readOnly value={mesaS.id} className="p-2 border rounded" name="mesaId" />
                            </label>
                            <label className="flex flex-col space-y-1">
                                Mesa selecionada:
                                <input type="number" readOnly value={mesaS.codigo} className="p-2 border rounded" name="codigo" />
                            </label>
                            <label className="flex flex-col space-y-1">
                                Numero de pessoas:
                                <input type="number" max={mesaS.n_lugares} min={1} className="p-2 border rounded" name="n_pessoas" />
                            </label>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                    onClick={() => setMesaS(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
