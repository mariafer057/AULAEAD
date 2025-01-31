'use server';

import { cookies } from 'next/headers';
import { ApiURL } from './config';
import { redirect } from 'next/navigation';

// Server actions
export async function signup(state: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);

    if (!email || !password) {
        return {
            error: true,
            email,
            mensagem: 'Valores faltando',
        };
    }

    try {
        const res = await fetch(`${ApiURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        const { erro, mensagem, token } = data;

        if (erro) return { erro, email, mensagem };
        
        const cookieStore = cookies();
        cookieStore.set('restaurant-token', token, {
            maxAge: 60 * 60 * 1, // 1 hora
        });

        redirect('/');
    } catch (error) {
        return {
            erro: true,
            email,
            mensagem: 'Erro ao processar a solicitação',
        };
    }
}

// Cadastro
export async function cadastro(state: any, formData: FormData) {
    const nome = formData.get('nome');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm_password = formData.get('confirm_password');
    console.log(email, password);

    if (!email || !password || !nome || !confirm_password) {
        return {
            error: true,
            email,
            mensagem: 'Valores faltando',
        };
    }

    if (password !== confirm_password) {
        return {
            erro: true,
            email,
            mensagem: 'As duas senhas devem ser iguais',
        };
    }

    try {
        const res = await fetch(`${ApiURL}/auth/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, password }),
        });

        const data = await res.json();
        const { erro, mensagem, token } = data;

        if (erro) return { erro, email, mensagem };
        
        const cookieStore = cookies();
        cookieStore.set('restaurant-token', token, {
            maxAge: 60 * 60 * 1, // 1 hora
        });

        redirect('/');
    } catch (error) {
        return {
            erro: true,
            email,
            mensagem: 'Erro ao processar a solicitação',
        };
    }
}

// Logout
export async function logout() {
    const cookieStore = cookies();
    cookieStore.delete('restaurant-token');
    redirect('/');
}
