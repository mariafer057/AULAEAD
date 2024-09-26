import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <center>
        <h1>home</h1>
      <button>
        <Link href={"/login/"}></Link>
        <p>Faça o login aqui!</p>
      </button>
      </center>
    </div>
  );
}
