const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tarefas = [
  { id: 1, titulo: "Aprender Docker", concluida: false },
  { id: 2, titulo: "Fazer deploy no Render", concluida: false }
];

app.get("/", (req, res) => {
  res.json({
    mensagem: "Minha API estÃ¡ funcionando!",
    status: "online"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

app.get("/tarefas/:id", (req, res) => {
  const tarefa = tarefas.find(
    t => t.id === Number(req.params.id)
  );

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa nÃ£o encontrada"
    });
  }

  res.json(tarefa);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (typeof titulo !== "string" || !titulo.trim()) {
    return res.status(400).json({
      erro: "Informe o tÃ­tulo da tarefa"
    });
  }

  const novaTarefa = {
    id: tarefas.length
      ? Math.max(...tarefas.map(t => t.id)) + 1
      : 1,
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = tarefas.some(t => t.id === id);

  if (!existe) {
    return res.status(404).json({
      erro: "Tarefa nÃ£o encontrada"
    });
  }

  tarefas = tarefas.filter(t => t.id !== id);

  res.json({
    mensagem: "Tarefa removida com sucesso"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
