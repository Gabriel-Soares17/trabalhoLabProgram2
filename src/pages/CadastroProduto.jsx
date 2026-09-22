import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function CadastroProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidadeEstoque: "",
    categoria: "",
    marca: "",
    cor: "",
    codigoBarras: "",
    fabricante: "",
  });

  function alterarCampo(e) {
    const { name, value } = e.target;

    setProduto({
      ...produto,
      [name]: value,
    });
  }

  async function cadastrarProduto(e) {
    e.preventDefault();

    const produtoParaEnviar = {
      nome: `[SportStore] ${produto.nome}`,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      quantidadeEstoque: Number(produto.quantidadeEstoque),
      categoria: produto.categoria,
      marca: produto.marca,
      cor: produto.cor,

      
      peso: 0,
      altura: 0,
      largura: 0,
      profundidade: 0,

      codigoBarras: produto.codigoBarras,
      fabricante: produto.fabricante,
      ativo: true,
    };

    console.log("Dados enviados:", produtoParaEnviar);

    try {
      const resposta = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoParaEnviar),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        console.log("Produto criado:", dados);

        alert("Artigo esportivo cadastrado com sucesso!");

        navigate("/");
      } else {
        console.error("Erro retornado pela API:", dados);

        alert(
          `Erro ao cadastrar produto: ${
            dados.message || dados.error || "Dados inválidos."
          }`
        );
      }
    } catch (error) {
      console.error("Erro na requisição:", error);

      alert(`Erro de conexão: ${error.message}`);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Cadastro de Artigo Esportivo</h1>

      <form
        onSubmit={cadastrarProduto}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          name="nome"
          placeholder="Nome do produto "
          value={produto.nome}
          onChange={alterarCampo}
          required
        />

        <input
          name="descricao"
          placeholder="Descrição"
          value={produto.descricao}
          onChange={alterarCampo}
          required
        />

        <input
          name="preco"
          type="number"
          step="0.01"
          placeholder="Preço (R$)"
          value={produto.preco}
          onChange={alterarCampo}
          required
        />

        <input
          name="quantidadeEstoque"
          type="number"
          placeholder="Quantidade em estoque"
          value={produto.quantidadeEstoque}
          onChange={alterarCampo}
          required
        />

        <input
          name="categoria"
          placeholder="Categoria "
          value={produto.categoria}
          onChange={alterarCampo}
          required
        />

        <input
          name="marca"
          placeholder="Marca "
          value={produto.marca}
          onChange={alterarCampo}
          required
        />

        <input
          name="cor"
          placeholder="Cor"
          value={produto.cor}
          onChange={alterarCampo}
          required
        />

        <input
          name="codigoBarras"
          placeholder="Código de barras"
          value={produto.codigoBarras}
          onChange={alterarCampo}
          required
        />

        <input
          name="fabricante"
          placeholder="Fabricante"
          value={produto.fabricante}
          onChange={alterarCampo}
          required
        />

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Cadastrar
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroProduto;