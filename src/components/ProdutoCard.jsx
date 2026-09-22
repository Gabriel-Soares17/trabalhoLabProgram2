import { Link } from "react-router-dom";

function ProdutoCard({ produto, onDelete }) {
  // Remove a tag [SportStore] apenas na hora de mostrar o nome na tela
  const nomeExibicao = produto.nome ? produto.nome.replace("[SportStore] ", "") : "Sem nome";

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "220px",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>⚽ {nomeExibicao}</h3>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <Link to={`/editar/${produto.id}`}>
          <button style={{ padding: "5px 10px", cursor: "pointer" }}>✏️ Editar</button>
        </Link>

        <button
          onClick={() => onDelete(produto.id)}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}

export default ProdutoCard;