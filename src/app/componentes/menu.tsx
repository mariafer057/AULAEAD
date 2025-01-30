import Image from "next/image";
import Usuario from "../Interfaces/usuario";
import Link from "next/link";
import { ChefHat, ClipboardList, User } from "lucide-react";

type MenuProps = {
    user?: Usuario | null; // Permite que user seja opcional ou nulo
};

export default function Menu({ user }: MenuProps) {
    return (
        <div className="w-full lg:w-1/4 text-white p-4 flex items-center flex-col">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm">
                <Image
                    src="/usuario.png"
                    alt="Imagem do usuário"
                    className="w-24 h-24 mx-auto rounded-full border-2 border-indigo-500"
                    width={80}
                    height={80}
                />

                {/* Verifica se user existe antes de acessar suas propriedades */}
                <h2 className="text-center text-lg font-bold mt-4 uppercase">
                    {user ? user.nome : "Usuário Desconhecido"}
                </h2>

                {/* Se user existir, exibe user.tipo, senão exibe "Tipo não informado" */}
                <p className="text-center text-gray-600 uppercase">
                    {user?.tipo ? user.tipo : "Tipo não informado"}
                </p>
            </div>

            {/* Verifica se user existe antes de acessar user.tipo */}
            {user?.tipo === 'adm' ? (
                <div className="mt-4 space-y-2 w-full flex flex-wrap gap-2">
                    <Link href={'/reservas'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <ClipboardList className="w-5 h-5 mr-2"/>
                        Todas as Reservas
                    </Link>
                    <Link href={'/mesas'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <ChefHat className="w-5 h-5 mr-2"/>
                        Mesas
                    </Link>
                    <Link href={'/perfil'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <User className="w-5 h-5 mr-2"/>
                        Perfil
                    </Link>
                </div>
            ) : (
                <div className="mt-4 space-y-2 w-full flex flex-wrap gap-2">
                    <Link href={'/reserva/novo'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <ClipboardList className="w-5 h-5 mr-2"/>
                        Nova Reserva
                    </Link>
                    <Link href={'/reserva'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <ClipboardList className="w-5 h-5 mr-2"/>
                        Minhas Reservas
                    </Link>
                    <Link href={'/mesas'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <ChefHat className="w-5 h-5 mr-2"/>
                        Mesas
                    </Link>
                    <Link href={'/perfil'} className="flex items-center bg-white text-gray-800 w-full py-2 px-4 shadow-md rounded-lg hover:bg-slate-300 transition-colors">
                        <User className="w-5 h-5 mr-2"/>
                        Perfil
                    </Link>
                </div>
            )}
        </div>
    );
}