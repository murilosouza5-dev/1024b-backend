import mysql from 'mysql2/promise';
import express from 'express'
import MyqlErrorHandle from './mysql_error_handle.js';


import  connection  from './mysql_connection_handle.js'

const app = express()
app.use(express.json())




app.get("/pessoas", async (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`SELECT  FROM pessoa`)
        console.log(resultado)
        res.status(200).json(resultado)
    } catch (err) {
        const myqlErrorHandle = new MyqlErrorHandle(err, res)
        myqlErrorHandle.validar()

    }
})
// 1 Rota: Cadastro de Produto
app.post("/cadastro_produto", async (req, res) => {
    try {
        //const preparacao = await connection.prepare("select * from pessoa");
        const { id, nome, categoria, preco, data_criacao, data_modificacao } = req.body
        //Validação simples 

        if (!id || !nome || !categoria || !preco || !data_criacao || !data_modificacao) {
            return res.status(400).json({ mensagem: "Dados inválidos: preencha todos os campos!" });
        }
        const sql = `INSERT INTO produto (id, nome, categoria, preco, data_criacao, data_modificacao)
                     VALUES (?, ?, ?, ?, NOW(), NOW())`;

        await connection.execute(sql, [id, nome, categoria, preco]);
        res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });

        const [resultado, campos] =
            await connection.execute(`insert into pessoa values (?,?)`, [id, nome])
        console.log(resultado)
        res.status(201).json({ mensagem: "Sucesso" })
    } catch (err) {
        const myqlErrorHandle = new MyqlErrorHandle(err, res)
        myqlErrorHandle.validar()

    }
})//Inserir


//Criar o servidor
app.listen(8000, () => {
    console.log("Servidor iniciado na porta 8000")
})

