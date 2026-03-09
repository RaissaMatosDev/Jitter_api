-- Criação da tabela de Pedidos 
-- Utiliza orderid como VARCHAR para suportar diferentes formatos de identificadores
CREATE TABLE orders (
    orderid VARCHAR(50) PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    creationdate TIMESTAMP NOT NULL
);

-- Criação da tabela de Itens do Pedido
-- Inclui restrição de chave estrangeira com exclusão em cascata
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    orderid VARCHAR(50) NOT NULL,
    productid INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY(orderid) 
        REFERENCES orders(orderid)
        ON DELETE CASCADE
);