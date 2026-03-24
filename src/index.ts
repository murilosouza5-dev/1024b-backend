import mysql from 'mysql2/promise';
import express from 'express'
const app = express()
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aula1'
});
app.get("/pessoas", (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`SELECT * FROM pessoa`)
        console.log(resultado)
        await connection.end();
    } catch (err) {
        console.log(err);
    }
})//listar
app.post("/pessoas", (req, res) => {
    try {
        //const preparacao = await connection.prepare("select * from pessoa");
        const id = 6
        const nome = "Algum nome"
        const [resultado, campos] =
            await connection.execute(`insert into pessoa values (?,?)`, [id, nome])
        console.log(resultado)
        await connection.end();
    } catch (err) {
        console.log(err);
    }
})//Inserir

//Criar o servidor
app.listen(8000, () => {
    console.log("Servidor iniciado na porta 8000")
})