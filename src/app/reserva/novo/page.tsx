import { getUser } from '../../utils/serverActions';
import Menu from "../../componentes/menu";
import { redirect } from "next/navigation";
import { ListMesasReserva } from "./listaMesasReserva";
import { getMesa } from "../../utils/mesas";

export default async function NovaReserva() {
    let user;
    let mesas;

    try {
        user = await getUser();
        if (!user) {
            redirect('/login');
            return;
        }
        
        mesas = await getMesa();
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        redirect('/error');
        return;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <Menu user={user} />
            <ListMesasReserva mesas={mesas} />
        </div>
    );
}