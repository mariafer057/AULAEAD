import Link from "next/link";

export default function Home() {
  return (
    <div>
      <center>
        <h1>home</h1>
        <Link href="/login">
          <button>Faça o login aqui!</button>
        </Link>
        <Link href="/cadastro">
          <button>Faça o seu cadastro aqui!</button>
        </Link>
      </center>
    </div>
  );
}
