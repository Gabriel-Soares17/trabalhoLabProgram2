import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProdutoCard from "../components/ProdutoCard";
import API_URL from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [consulta, setConsulta] = useState("");

  useEffect(() => {
    buscarTodosProdutos();
  }, []);

  async function buscarTodosProdutos() {
    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/produtos`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const dados = await resposta.json();

      const meusProdutos = dados.filter((item) =>
        item.nome ? item.nome.includes("[SportStore]") : false
      );

      setProdutos(meusProdutos);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
      alert("Erro ao carregar os artigos.");
    } finally {
      setCarregando(false);
    }
  }

  async function consultarProduto() {
    const valor = consulta.trim();

    if (!valor) {
      alert("Digite um nome ou ID para consultar.");
      return;
    }

    try {
      setCarregando(true);

     
      const respostaId = await fetch(
        `${API_URL}/produtos/${encodeURIComponent(valor)}`
      );

      if (respostaId.ok) {
        const produto = await respostaId.json();

        if (produto.nome?.includes("[SportStore]")) {
          setProdutos([produto]);
          return;
        }
      }

      
      const respostaNome = await fetch(
        `${API_URL}/produtos?nome=${encodeURIComponent(valor)}`
      );

      if (!respostaNome.ok) {
        throw new Error("Erro ao consultar produto");
      }

      const dados = await respostaNome.json();

      const meusProdutos = dados.filter((item) =>
        item.nome ? item.nome.includes("[SportStore]") : false
      );

      setProdutos(meusProdutos);

      if (meusProdutos.length === 0) {
        alert("Nenhum artigo encontrado.");
      }
    } catch (error) {
      console.log("Erro ao consultar produto:", error);
      alert("Erro ao realizar a consulta.");
    } finally {
      setCarregando(false);
    }
  }

  function limparConsulta() {
    setConsulta("");
    buscarTodosProdutos();
  }

  async function deletarProduto(id) {
    if (
      window.confirm(
        "Deseja realmente excluir este artigo esportivo?"
      )
    ) {
      try {
        const resposta = await fetch(
          `${API_URL}/produtos/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro ao excluir produto");
        }

        alert("Artigo excluído com sucesso!");

        buscarTodosProdutos();
      } catch (error) {
        console.log("Erro ao deletar produto:", error);
        alert("Erro ao excluir o artigo.");
      }
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>SportStore</h1>

      <h2>Artigos Esportivos</h2>

      <Link to="/cadastro">
        <button
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
           Novo Artigo
        </button>
      </Link>

      <hr style={{ margin: "20px 0" }} />

      {/* CONSULTA */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          maxWidth: "650px",
        }}
      >
        <h3> Consultar Artigo</h3>

        <p>
          Digite o <strong>nome</strong> ou o <strong>ID</strong> do
          artigo:
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                consultarProduto();
              }
            }}
            placeholder="Digite o nome ou ID do artigo..."
            style={{
              padding: "9px",
              flex: 1,
            }}
          />

          <button
            onClick={consultarProduto}
            style={{
              padding: "9px 15px",
              cursor: "pointer",
            }}
          >
             Consultar
          </button>

          <button
            onClick={limparConsulta}
            style={{
              padding: "9px 15px",
              cursor: "pointer",
            }}
          >
            Limpar
          </button>
        </div>
      </div>

      {}
      {carregando ? (
        <p>⌛ Carregando artigos esportivos...</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum artigo esportivo encontrado.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onDelete={deletarProduto}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Produtos;