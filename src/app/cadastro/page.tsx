
'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '@/config';
import { setCookie } from 'nookies';
import Link from 'next/link';
import Usuario from '../Interfaces/usuario';

interface ResponseCadastro {
    erro: boolean;
    mensagem: string;
}

export default function Cadastro() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>({
        nome: '',
        email: '',
        password: '',
        tipo: 'cliente',
    });
    const [erroCadastro, setErroCadastro] = useState<string>('');

    const mudarNome = (novoNome: string) => {
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            nome: novoNome,
        }));
    };

    const mudarEmail = (novoEmail: string) => {
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            email: novoEmail,
        }));
    };

    const mudarSenha = (novaSenha: string) => {
        setUsuario((usuarioAnterior) => ({
            ...usuarioAnterior,
            password: novaSenha,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!usuario.nome || !usuario.email || !usuario.password) {
            setErroCadastro('Preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`${ApiURL}/auth/cadastro`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (response) {
            const data: ResponseCadastro = await response.json();
            const { erro, mensagem } = data;

            if (erro) {
                setErroCadastro(mensagem);
            } else {
                router.push('/login');
            }
        }
        } catch (error) {
            console.error('Erro requisição:', error);
            setErroCadastro('Erro, tente novamente mais tarde.');
        }
    };


    return (
        <div>
            <h1>Página de cadastro</h1>
            <form onSubmit={handleSubmit}>
                <p>Nome:</p>
                <input
                    type="text"
                    id="nome"
                    placeholder="Digite seu nome"
                    value={usuario.nome}
                    onChange={(e) => mudarNome(e.target.value)}
                />
                <p>
                    <label htmlFor="email">Email:</label>
                </p>
                <input
                    type="text"
                    id="email"
                    placeholder="Digite seu email"
                    value={usuario.email}
                    onChange={(e) => mudarEmail(e.target.value)}
                />
                <p>
                    <label htmlFor="senha">Senha:</label>
                </p>
                <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    value={usuario.password}
                    onChange={(e) => mudarSenha(e.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
                {erroCadastro && <p> {erroCadastro}</p>}
            </form>
        </div>
    );
}
