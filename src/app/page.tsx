import Link from "next/link";
import { useEffect } from "react";
import { parseCookie} from 'nookies';

const router = useRouter();
useEffect(() => {
  const {'restaurant-token' : token} = parseCookies()
  if (!token){
    router.push('/login')
  }
}, [])
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
