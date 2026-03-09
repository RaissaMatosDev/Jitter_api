// Aqui indicamos as dependências principais da aplicação,
// incluindo o framework Express, as rotas de pedidos e a documentação da API com Swagger.
const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const swaggerUi = require("swagger-ui-express"); 
const swaggerSpec = require("./docs/swagger");

const app = express(); 


app.use(express.json());


app.use("/order", orderRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});