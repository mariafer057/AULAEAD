'use client';

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import NavBar from "../componentes/navbar";
import styles from "./reserva.module.css";
import Menu from "../componentes/menu";
import { getUser } from "../utils/serverActions";
import ListMinhasReservas from "./listMinhasReservas"; // Certifique-se de que o caminho esteja correto

export default function Reservas() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const usuario = await getUser();
      if (!usuario) {
        window.location.href = "/"; // Redireciona se não estiver logado
      } else {
        setUser(usuario);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <Menu user={user} />
        <div className="w-full p-4 lg:p-8">
          <h2 className="text-2xl font-bold mb-4">Suas Reservas:</h2>
          <ListMinhasReservas /> {}
        </div>
      </div>
    </>
  );
}
