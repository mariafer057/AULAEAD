'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '@/config';
import { setCookie } from 'nookies';
import Link from 'next/link';

import './login.css';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errologin, setErrologin] = useState('');

    interface ResponseSignin {
        erro: boolean;
        mensagem: string;
        token?: string;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response) {
                const data: ResponseSignin = await response.json();
                const { erro, mensagem, token = '' } = data;

                if (erro) {
                    setErrologin(mensagem);  
                } else {
                    setCookie(undefined, 'restaurant-token', token, {
                        maxAge: 60 * 60 * 1, // 1 hora
                    });
                    router.push('/');
                }
            }
        } catch (error) {
            console.error('Erro na requisição', error);
            setErrologin('Erro, tente mais tarde')
        }
    };

    return (
        <div>
            <center>
                <h1>Página de login</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <button type="submit">Login</button>
                    {errologin && <p style={{ color: 'red' }}>{errologin}</p>}
                    <br />
                </form>
                <Link href="/cadastro"> <p>Faça o cadastro aqui</p>
                </Link>
            </center>
        </div>
    );
}
