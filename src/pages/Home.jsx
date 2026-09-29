import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import NovaNotificacaoForm from "../components/Formulario";
import NotificationList from "../components/NotificationList";
import Saudacao from "../components/Saudacao";
import { API_URL } from "../config";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { token } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  useEffect(() => {
    async function buscar() {
      try {
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const resposta = await fetch(`${API_URL}/notificacoes`, { headers });

        if (!resposta.ok) {
          throw new Error("Erro ao buscar notificações");
        }

        const dados = await resposta.json();
        setNotificacoes(Array.isArray(dados) ? dados : []);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }

    buscar();
  }, [token]);

  function adicionarNotificacao(nova) {
    setNotificacoes((atual) => [nova, ...atual]);
  }

  const notificacoesFiltradas = notificacoes.filter((n) => {
    if (filtro === "todas") return true;
    if (filtro === "push") return n.canal === "PUSH";
    if (filtro === "email") return n.canal === "EMAIL";
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Saudacao />
      <h1 className="text-2xl font-bold mb-4">Central de Notificações</h1>

      <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />
      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} />

      {carregando && <p className="text-gray-500 text-sm">Carregando...</p>}
      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      {!carregando && !erro && (
        <NotificationList notificacoes={notificacoesFiltradas} />
      )}
    </div>
  );
}

export default Home;
