import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o Multer para lidar com o envio de arquivos (uploads)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções para lidar com os posts do controlador
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos usando o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos enviados (./uploads neste caso)
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração de armazenamento

// Define as rotas para a API
const routes = (app) => {
  // Habilita o parsing de dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para obter todos os posts
  app.get("/posts", listarPosts); // Chama a função listarPosts do controlador de posts

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost do controlador de posts

  // Rota POST para enviar uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem); // Utiliza o middleware do Multer (upload.single) para enviar uma única imagem com o nome do campo "imagem" e então chama a função uploadImagem do controlador de posts
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função de rotas para ser usada na aplicação principal