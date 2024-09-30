import Link from "next/link";

export default function Home() {
  return (
    <div>
      <center>
        <h1>home</h1>
        <Link href="/login">
          <button>Faça o login aqui!</button>
        </Link>
      </center>
    </div>
  );
}
