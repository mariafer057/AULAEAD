'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies} from 'nookies';


export default function Home(){
const router = useRouter();


useEffect(() => {
  const {'restaurant-token' : token} = parseCookies()
  if (!token){
    router.push('/login')
  }
}, [])
return (
  <div>
    <center>
      <h1>Home</h1>
      <Link href="/login">
  <button>Faça o login aqui!</button>
</Link>
    </center>
  </div>
);
}