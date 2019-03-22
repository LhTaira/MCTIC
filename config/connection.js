//Carrega o modulo do mysql.
const mysql = require('mysql');

//Cria a conexão com o Banco de Dados.
const connectMYSQL = () => {
	return mysql.createConnection({
			host: '172.25.116.18',
			user: 'eduardo',
			password: 'eduardo',
			database: 'emenda_db' 
	});
};

//Retorna a conexão.
module.exports = () => {
	return connectMYSQL;
};