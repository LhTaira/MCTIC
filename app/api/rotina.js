var templater = require('./htmlTemplate.js')
var nodemailer = require("nodemailer");
var app = require('express')();

var util = require('./utils.js')
const NotificacaoDAO = require('../infra/notificacaoDAO.js')()
const connection = require('../../config/connection.js')()

function sendEMail( destiatario, emailsDeCopia, HTMLDoEmail ){
    date = new Date();
    const transporter = nodemailer.createTransport({
        host: "correio.mctic.gov.br",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "luis.taira@mctic.gov.br", //Login do email que será utilizado para enviar a mensagem.
            pass: "Mctic@123" //Senha do email.
        },
        tls: { rejectUnauthorized: false }
    });

    var mailOptions = {
        from: 'noreply@mctic.gov.br',
        to: destiatario,
        subject: 'Emendas Parlamentares',
        //text: HTMLDoEmail,
        html: HTMLDoEmail,
        cc: emailsDeCopia //Email para quem será enviado como cópia.
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response + '\tData: ' + util.getTimeString(date) );
        }
    });
}

async function main( resultado, num ) {
    
    arrayDeHTMLDeEmendas = []
    let nomeData
    let diasRestantes

    //Gera o html da emenda com base na data em questao
    switch( num ) {
        case 1:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_indicacao_beneficiario ))
        }
        nomeData = 'Indicação De Beneficiário'
        diasRestantes = resultado[0].dias_indicacao_beneficiario
        break;

        case 2:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_cadastramento_proposta ))
        }
        nomeData = 'Cadastrameto De Proposta'
        diasRestantes = resultado[0].dias_cadastramento_proposta
        break;

        case 3:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_analise_proposta ))
        }
        nomeData = 'Análise De Proposta'
        diasRestantes = resultado[0].dias_analise_proposta
        break;

        case 4:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio ))
        }
        nomeData = 'Celebração De Convenio'
        diasRestantes = resultado[0].dias_celebracao_convenio
        break;

        case 5:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio ))
        }
        nomeData = 'Celebração de Convenio'
        diasRestantes = resultado[0].dias_celebracao_convenio
        break;

        case 6:
        for( var i=0; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio ))
        }
        nomeData = 'Celebração de Convenio'
        diasRestantes = resultado[0].dias_celebracao_convenio
        break;
        
        default:
        console.log('lol')
    }

    HTMLDasEmendas = arrayDeHTMLDeEmendas.toString().replace(/,/g, '')//transforma o array em uma string e apaga virgulas

    var HTMLString = templater.geraHTMLDoEmail( 
        util.getDateString(),
        nomeData,
        HTMLDasEmendas.toString(),
        diasRestantes,
        nomeData ).toString();

    var server = app.listen(3000, () => {
        console.log("Servidor Rodando...");
    })
    
    sendEMail( resultado[0].email, resultado[0].email_cc, HTMLString.toString() )
    server.close();
}

async function damn(){
    while( true ){

        const con = connection()
        const notificacao = new NotificacaoDAO(con);

        //roda todas as 6 queries e chama a main() somente se receber algum resultado
        notificacao.getNotificacao1( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 1 ) } } )
        notificacao.getNotificacao2( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 2 ) } } )
        notificacao.getNotificacao3( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 3 ) } } )
        notificacao.getNotificacao4( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 4 ) } } )
        notificacao.getNotificacao5( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 5 ) } } )
        notificacao.getNotificacao6( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 6 ) } } )

        //espera até que seja 11 horas
        console.log(new Date().toLocaleTimeString() + ": Esperando 4 horas");
        await util.sleep( 1000*60*60*4 )
        while ( new Date().getHours() != 11) {
            while ( new Date().getHours() > 11 || new Date().getHours() <= 5  ) {
                console.log(new Date().toLocaleTimeString() + ": Esperando 4 horas"); await util.sleep( 1000*60*60*4 );
            }
            while ( new Date().getHours() > 6 && new Date().getHours() < 10) {
                console.log(new Date().toLocaleTimeString() + ": Esperando 30 minutos");
                await util.sleep( 1000*60*30 ); console.log(new Date().toLocaleTimeString() + ": Esperando 30 minutos")
            }
            console.log(new Date().toLocaleTimeString() + ": Esperando 1 minuto");
            await util.sleep ( 1000*60 ); console.log(new Date().toLocaleTimeString() + ": Esperando 1 minuto")
        }
    }
}

damn()

