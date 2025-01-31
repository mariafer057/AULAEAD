'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '@/app/config';
import { setCookie } from 'nookies';
import Link from 'next/link';
import Usuario from '../../app/Interfaces/usuario';

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
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Página de Cadastro</h1>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
                <div style={styles.card}>
                    <p style={styles.label}>Nome:</p>
                    <input
                        type="text"
                        id="nome"
                        placeholder="Digite seu nome"
                        value={usuario.nome}
                        onChange={(e) => mudarNome(e.target.value)}
                        style={styles.input}
                    />
                    <p style={styles.label}>
                        <label htmlFor="email">Email:</label>
                    </p>
                    <input
                        type="text"
                        id="email"
                        placeholder="Digite seu email"
                        value={usuario.email}
                        onChange={(e) => mudarEmail(e.target.value)}
                        style={styles.input}
                    />
                    <p style={styles.label}>
                        <label htmlFor="senha">Senha:</label>
                    </p>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        value={usuario.password}
                        onChange={(e) => mudarSenha(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Cadastrar
                    </button>
                    {erroCadastro && <p style={styles.errorText}>{erroCadastro}</p>}
                </div>
            </form>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#000'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
    },
    label: {
        marginBottom: '0.5rem',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        color: 'black',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#0070f3',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
    errorText: {
        color: 'red',
        marginTop: '1rem',
    },
};
