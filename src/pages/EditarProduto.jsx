import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function EditarProduto() {
  const { id } = useParams();
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
    peso: 0,
    altura: 0,
    largura: 0,
    profundidade: 0,
    ativo: true,
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`);

        if (!resposta.ok) {
          throw new Error("Produto não encontrado");
        }

        const dados = await resposta.json();

        setProduto({
          nome: dados.nome
            ? dados.nome.replace("[SportStore] ", "")
            : "",
          descricao: dados.descricao || "",
          preco: dados.preco ?? "",
          quantidadeEstoque: dados.quantidadeEstoque ?? "",
          categoria: dados.categoria || "",
          marca: dados.marca || "",
          cor: dados.cor || "",
          codigoBarras: dados.codigoBarras || "",
          fabricante: dados.fabricante || "",
          peso: dados.peso ?? 0,
          altura: dados.altura ?? 0,
          largura: dados.largura ?? 0,
          profundidade: dados.profundidade ?? 0,
          ativo: dados.ativo ?? true,
        });
      } catch (error) {
        console.log("Erro ao carregar produto:", error);
        alert("Erro ao carregar os dados do artigo.");
      } finally {
        setCarregando(false);
      }
    }

    buscarProduto();
  }, [id]);

  function alterarCampo(e) {
    const { name, value } = e.target;

    setProduto((produtoAtual) => ({
      ...produtoAtual,
      [name]: value,
    }));
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    const produtoParaAtualizar = {
      nome: `[SportStore] ${produto.nome}`,
      descricao: produto.descricao,
      preco: Number(produto.preco),
      quantidadeEstoque: Number(produto.quantidadeEstoque),
      categoria: produto.categoria,
      marca: produto.marca,
      cor: produto.cor,
      peso: Number(produto.peso),
      altura: Number(produto.altura),
      largura: Number(produto.largura),
      profundidade: Number(produto.profundidade),
      codigoBarras: produto.codigoBarras,
      fabricante: produto.fabricante,
      ativo: produto.ativo,
    };

    console.log("Dados enviados no PUT:", produtoParaAtualizar);

    try {
      const resposta = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoParaAtualizar),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Artigo esportivo atualizado com sucesso!");
        navigate("/");
      } else {
        console.log("Erro retornado pela API:", dados);

        alert(
          `Erro ao atualizar: ${
            dados.message ||
            dados.error ||
            "Dados inválidos enviados para a API."
          }`
        );
      }
    } catch (error) {
      console.log("Erro ao salvar edição:", error);
      alert("Falha de conexão ao tentar atualizar.");
    }
  }

  if (carregando) {
    return (
      <p style={{ padding: "20px" }}>
         Carregando dados do produto...
      </p>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Editar Artigo Esportivo</h1>

      <p style={{ color: "#666" }}>
        ID do artigo: {id}
      </p>

      <form
        onSubmit={salvarEdicao}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "450px",
        }}
      >
        <label>
          Nome do Produto:
          <input
            name="nome"
            type="text"
            value={produto.nome}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Descrição:
          <input
            name="descricao"
            type="text"
            value={produto.descricao}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Preço (R$):
          <input
            name="preco"
            type="number"
            step="0.01"
            value={produto.preco}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Quantidade em Estoque:
          <input
            name="quantidadeEstoque"
            type="number"
            value={produto.quantidadeEstoque}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Categoria:
          <input
            name="categoria"
            type="text"
            value={produto.categoria}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Marca:
          <input
            name="marca"
            type="text"
            value={produto.marca}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Cor:
          <input
            name="cor"
            type="text"
            value={produto.cor}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Código de Barras:
          <input
            name="codigoBarras"
            type="text"
            value={produto.codigoBarras}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Fabricante:
          <input
            name="fabricante"
            type="text"
            value={produto.fabricante}
            onChange={alterarCampo}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              boxSizing: "border-box",
            }}
          />
        </label>

        <div
          style={{
            marginTop: "15px",
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
            💾 Salvar Alterações
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

export default EditarProduto;