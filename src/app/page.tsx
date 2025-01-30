'use client';

import NavBar from './componentes/navbar'; // Importando o componente NavBar
import Image from 'next/image'; // Importando a Image do Next.js
import styles from './home.module.css'; // Verifique se o caminho está correto
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();

    if (!token) {
      router.push('/login'); // Redireciona para a página de login caso o token não exista
    }
  }, [router]);

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <center>
          <Image src="/mexican-restaurant.jpg" alt="Restaurante Mexicano" width={1400} height={800} />
        </center>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <Image
              src="/tacos.jpg"
              alt="Restaurante Mexicano"
              width={400}
              height={250}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>El Mariachi</h2>
              <p className={styles.cardDescription}>
                Venha desfrutar da verdadeira comida mexicana em um ambiente acolhedor e vibrante. 
                Aqui, você vai se sentir no México com nossas receitas autênticas.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <Image
              src="/burrito.jpg"
              alt="Prato típico mexicano"
              width={400}
              height={250}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Prato da Casa: Burrito</h2>
              <p className={styles.cardDescription}>
                Experimente o sabor autêntico do México com o nosso delicioso burrito, recheado com
                ingredientes frescos e temperos especiais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
