import { useState } from "react";
import FilterBar from "./components/FilterBar";
import NovaNotificacaoForm from "./components/Formulario";
import NotificationList from "./components/NotificationList";

const notificacoesExemplo = [
  {
    id: 1,
    canal: "PUSH",
    hora: "14:32",
    titulo: "Inscrição confirmada",
    texto: "Seu lugar está garantido.",
    lida: false,
  },
  {
    id: 2,
    canal: "EMAIL",
    hora: "13:10",
    titulo: "Evento amanhã",
    texto: "Não esqueça o notebook.",
    lida: true,
  },
];

function App() {
  const [notificacoes, setNotificacoes] = useState(notificacoesExemplo);
  const [filtro, setFiltro] = useState("todas");

  function adicionarNotificacao(nova) {
    setNotificacoes((atual) => [nova, ...atual]);
  }

  const notificacoesFiltradas = notificacoes.filter((n) => {
    if (filtro === "push") return n.canal.toLowerCase() === "push";
    if (filtro === "email") return n.canal.toLowerCase() === "email";
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Central de Notificações</h1>

      {/* Formulário para adicionar nova notificação */}
      <NovaNotificacaoForm onAdicionar={adicionarNotificacao} />

      {/* Barra de filtros com estado elevado */}
      <FilterBar filtroAtual={filtro} onFiltroChange={setFiltro} />

      {/* Lista de notificações filtradas */}
      <NotificationList notificacoes={notificacoesFiltradas} />
    </div>
  );
}

export default App;