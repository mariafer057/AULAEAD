'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../config';
import Link from 'next/link';
import { setCookie } from 'nookies';
import NavBar from '../componentes/navbar';  // Importando o componente NavBar

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
  token?: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errologin, setErroLogin] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setErroLogin('Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      setErroLogin('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha na requisição. Verifique o servidor.');
      }

      const data: ResponseSignin = await response.json();
      const { erro, mensagem, token = '' } = data;

      if (erro) {
        setErroLogin(mensagem);
      } else {
        setCookie(undefined, 'restaurant-token', token, {
          maxAge: 60 * 60 * 1, // 1 hora
          path: '/',
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErroLogin('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.pageContainer}>
        <h1 style={styles.title}>PÁGINA PARA LOGIN</h1>
        <br />
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.card}>
            <center>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErroLogin('');
                }}
                style={styles.input}
              />
              <br /><br />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErroLogin('');
                }}
                style={styles.input}
              />
              <br /><br />
              <button type="submit" style={styles.button}>Entrar</button>
              {errologin && <p style={styles.errorText}>{errologin}</p>}
              <br />
              <Link href="/cadastro">
                <button style={styles.button}>Fazer Cadastro!</button>
              </Link>
            </center>
          </div>
        </form>
      </div>
    </>
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
