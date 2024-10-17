'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from "../Interfaces/usuario";

export default function Cadastro() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [erroCadastro, setErroCadastro] = useState('');

    const cadastrar = () => {
        if (email && senha && cpf && nome) {
            router.push('/');
        } else {
            setErroCadastro('Preencha todos os campos corretamente!');
        }
    };

    return (
        <div>
            <center>
                <h1>PÁGINA DE CADASTRO</h1>
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
                <input 
                    type="text" 
                    placeholder="Digite seu CPF" 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)}
                />
                <br />
                <br />
                <input 
                    type="text" 
                    placeholder="Digite seu nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                />
                <br />
                <br />
                <button onClick={cadastrar}>Cadastrar</button>       
                {erroCadastro && <p style={{ color: 'red' }}>{erroCadastro}</p>}
            </center>
        </div>
    );
}
