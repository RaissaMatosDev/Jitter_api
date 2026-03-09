# Jitter API

API desenvolvida em Node.js para gerenciamento de pedidos e itens, com integração ao banco de dados PostgreSQL e documentação via Swagger.

## Tecnologias Utilizadas

* Runtime: Node.js
* Framework: Express
* Banco de Dados: PostgreSQL (driver pg)
* Documentação: Swagger (swagger-jsdoc e swagger-ui-express)
* Ferramenta de Testes: Insomnia / Swagger UI

## Funcionalidades

* Transações SQL: Processamento de pedidos e itens utilizando blocos BEGIN, COMMIT e ROLLBACK para assegurar a integridade dos dados.
* Conversão de Dados: A API realiza o tratamento de tipos, aceitando identificadores alfanuméricos e convertendo valores numéricos e datas para o formato adequado do banco de dados.
* Documentação Interativa: Interface para testes de endpoints diretamente pelo navegador.



## Estrutura do Banco de Dados

Para a correta persistência dos dados, o banco de dados deve ser configurado com as seguintes tabelas:

```sql
CREATE TABLE orders (
    orderid VARCHAR(50) PRIMARY KEY,
    value NUMERIC(10, 2),
    createdat TIMESTAMP
);

CREATE TABLE items (
    itemid VARCHAR(50) PRIMARY KEY,
    orderid VARCHAR(50) REFERENCES orders(orderid) ON DELETE CASCADE,
    quantity INTEGER,
    value NUMERIC(10, 2)
);
```Agradeço a oportunidade, este teste agregou conhecimentos concretos em node.js.