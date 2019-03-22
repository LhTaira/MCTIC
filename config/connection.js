//Carrega o modulo do mysql.
const mysql = require('mysql');

//Cria a conexão com o Banco de Dados.
const connectMYSQL = () => {
	return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'emenda_db' 
	});
};

//Retorna a conexão.
module.exports = () => {
	return connectMYSQL;
};