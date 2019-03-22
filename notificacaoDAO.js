class NotificacaoDAO {
    constructor(connection) {
        this._connection = connection;

    }

    //1
    getNotificacao1(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_indicacao_beneficiario,NOW()) AS dias_indicacao_beneficiario,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_indicacao_beneficiario,NOW()) BETWEEN 0 AND notificacao.indicacao_beneficiario`,
        callback);
    }

    //2
    getNotificacao2(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_cadastramento_proposta,NOW()) AS dias_cadastramento_proposta,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_cadastramento_proposta,NOW()) BETWEEN 0 AND notificacao.cadastramento_proposta`,
        callback);
    }

    //3
    getNotificacao3(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_analise_proposta,NOW()) AS dias_analise_proposta,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_analise_proposta,NOW()) BETWEEN 0 AND notificacao.cadastramento_proposta`,
        callback);
    }

    //4
    getNotificacao4(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) AS dias_celebracao_convenio_baixa,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) = notificacao.celebracao_convenio_baixa`,
        callback);
    }

    //5
    getNotificacao5(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) AS dias_celebracao_convenio_media,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) = notificacao.celebracao_convenio_media`,
        callback);
    }

    //6
    getNotificacao6(callback) {
        this._connection.query(`SELECT  
        DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) AS dias_celebracao_convenio,
        emenda.num_emenda, notificacao.* FROM emenda
        INNER JOIN legislacao ON emenda.ano = legislacao.ano
        INNER JOIN notificacao ON legislacao.ano = notificacao.ano
        WHERE DATEDIFF(legislacao.dt_celebracao_convenio,NOW()) BETWEEN 0 AND notificacao.celebracao_convenio_alta`,
        callback);
    }

}

module.exports = () => {
	return NotificacaoDAO;
};



