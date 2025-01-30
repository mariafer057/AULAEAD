'use server';

import { cookies } from "next/headers";
import { ApiURL } from "./config";
import { Reserva } from "../interfaces/interfaces";


export async function fetchReserva(data: string): Promise<Reserva[] | null> {
    console.log(data);
    if (!data) {
        return null;
    }
    try {
        const cookieStored = await cookies();
        const token = cookieStored.get('restaurant-token');
        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data })
        });

        const dataRes = await res.json();
        console.log(dataRes);
        return dataRes.reservas;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<{ erro: boolean, mensagem: string }> {
    const cookieStored = await cookies();
    const token = cookieStored.get('restaurant-token');
    console.log(data);
    if (!data || !n_pessoas || !mesaId || !token) {
        return { erro: true, mensagem: 'Dados inválidos' };
    }
    try {
        const res = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data, mesaId, n_pessoas })
        });

        const dataRes = await res.json();
        const { erro, mensagem } = dataRes;
        return {
            erro,
            mensagem
        };
    } catch (error) {
        console.log(error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}
