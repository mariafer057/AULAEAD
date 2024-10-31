'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import './login.css';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errologin, setErrologin] = useState('');

    const login = () => {
        if (email.endsWith('admin@gmail.com') && senha === 'admin') {
            router.push('/');
        } else {
            setErrologin('Email e/ou senha incorretos :(');
        }
    };

    return (
        <div>
            <center>
                <h1>PÁGINA DE LOGIN</h1>
                <br />
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
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)}
                />
                <br />
                <br />
                <button onClick={login}>Login</button>       
                {errologin && <p style={{ color: 'red' }}>{errologin}</p>}
                <br />
                <button>
                    <Link href={"/cadastro/"}>
                    <p>Faça o cadastro aqui</p>
                    </Link>
                </button>
            </center>
        </div>
    );
}
