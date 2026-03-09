console.log("!!! O CONTROLLER FOI CARREGADO COM SUCESSO !!!");

// Importa a conexão com o banco de dados PostgreSQL
const db = require("../database/connection");

// Cria pedido no bd
exports.createOrder = async (req, res) => {
    const data = req.body;

    if (!data || !data.numeroPedido || !data.valorTotal || !data.items) {
        return res.status(400).json({ message: "JSON inválido ou incompleto" });
    }

    const client = await db.connect();

    try {
        await client.query("BEGIN");
        const dbName = await client.query("SELECT current_database()");
        console.log("Conectado ao banco real:", dbName.rows[0].current_database);

        const orderId = data.numeroPedido.toString(); // sempre string
        const value = parseFloat(data.valorTotal);
        const creationDate = new Date(data.dataCriacao).toISOString();

        console.log("Criando pedido:", orderId, value, creationDate);

    const orderResult = await client.query(
    "INSERT INTO orders (orderid, value, creationdate) VALUES ($1, $2, $3) RETURNING *",
    [orderId, value, creationDate]
    );

    console.log("Pedido inserido:", orderResult.rows[0]);
    //Aqui ocorre a corversão pedida no desafio proposto
        for (const item of data.items) {
    const productId = parseInt(item.idItem);
    const quantity = parseInt(item.quantidadeItem);
    const price = parseFloat(item.valorItem);

    const itemResult = await client.query(
        "INSERT INTO items (orderid, productid, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [orderId, productId, quantity, price]
    );

    console.log("Item inserido:", itemResult.rows[0]);
}
        await client.query("COMMIT");
        res.status(201).json({ message: "Pedido criado com sucesso!" });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({
            message: "Erro interno ao criar pedido",
            error: error.message
        });
    } finally {
        client.release();
    }
};

// busca pedido
exports.getOrder = async (req, res) => {
    const id = req.params.id; // string, igual ao tipo varchar do banco

    try {
        const order = await db.query(
            "SELECT * FROM orders WHERE orderid = $1",
            [id]
        );

        if (order.rows.length === 0) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        const items = await db.query(
            "SELECT * FROM items WHERE orderid = $1",
            [id]
        );

        res.json({
        message: `Pedido ${id} encontrado`,
        order: order.rows[0], // Dados do pedido
        items: items.rows     // Lista de itens encontrados
});
    

    } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        res.status(500).json({
            message: "Erro ao buscar pedido",
            error: error.message
        });
    }

};

// Atualiza o pedido
// Se não existir cria o pedido
exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const data = req.body;
  const client = await db.connect(); // Abre conexão para realizar as queries

  try {
    await client.query('BEGIN'); // Inicia transação para garantir segurança

    // Upsert direto na tabela orders (Cria ou Atualiza)
    await client.query(
      `INSERT INTO orders (orderid, value, creationdate) 
       VALUES ($1, $2, $3)
       ON CONFLICT (orderid) DO UPDATE 
       SET value = $2, creationdate = $3`,
      [orderId, data.valorTotal, new Date(data.dataCriacao).toISOString()]
    );

    // Atualiza os itens na tabela items
    for (const item of data.items) {
      const productId = parseInt(item.idItem); // Conversão para número
      
      await client.query(
        `INSERT INTO items (orderid, productid, quantity, price)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (orderid, productid) DO UPDATE
         SET quantity = $3, price = $4`,
        [orderId, productId, item.quantidadeItem, item.valorItem]
      );
    }

    await client.query('COMMIT'); // Salva todas as alterações no banco
    res.status(200).json({ message: "Pedido processado com sucesso!" });

  } catch (err) {
    await client.query('ROLLBACK'); // Desfaz tudo se der erro em qualquer lugar do código
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar ou criar o pedido" });
  } finally {
    client.release(); // Libera a conexão para o banco não travar
  }
};

// deleta pedido
exports.deleteOrder = async (req, res) => {
  
    const id = req.params.id; // string

    try {
        await db.query("DELETE FROM items WHERE orderid = $1", [id]);
        await db.query("DELETE FROM orders WHERE orderid = $1", [id]);

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar pedido:", error);
        res.status(500).json({
            message: "Erro ao deletar pedido",
            error: error.message
        });
    }
};
