import express from "express";
import dotenv from "dotenv";

dotenv.config({ override: true });

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
