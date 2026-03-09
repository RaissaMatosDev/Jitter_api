const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitter API",
      version: "1.0.0",
      description: "API com conversão de tipos para gerenciamento de pedidos e itens"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ],
    paths: {
      "/order": {
        post: {
          summary: "Criar um novo pedido",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order"
                }
              }
            }
          },
          responses: {
            201: { description: "Pedido criado e dados convertidos com sucesso" },
            400: { description: "Erro de validação ou conversão de tipos" },
            500: { description: "Erro interno no servidor ou banco de dados" }
          }
        }
      },
      "/order/{id}": {
        get: {
          summary: "Buscar pedido por ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: { description: "Pedido retornado com sucesso" },
            404: { description: "Pedido não encontrado" }
          }
        },
        put: {
          summary: "Atualizar pedido",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order"
                }
              }
            }
          },
          responses: {
            200: { description: "Pedido atualizado com sucesso" }
          }
        },
        delete: {
          summary: "Excluir pedido",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            204: { description: "Pedido removido com sucesso" }
          }
        }
      }
    },
    components: {
      schemas: {
        Order: {
          type: "object",
          required: ["numeroPedido", "valorTotal", "items"],
          properties: {
            numeroPedido: { 
              type: "string", 
              example: "v10089015vdb-01" 
            },
            valorTotal: { 
              type: "number", 
              example: 10000 
            },
            dataCriacao: { 
              type: "string", 
              example: "2023-07-19T12:24:11.5299601+00:00" 
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  idItem: { 
                    type: "string", 
                    example: "2434" 
                  },
                  quantidadeItem: { 
                    type: "integer", 
                    example: 1 
                  },
                  valorItem: { 
                    type: "number", 
                    example: 1000 
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
