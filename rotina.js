var templater = require('./htmlTemplate.js')
var nodemailer = require("nodemailer");
var app = require('express')();

// let express = require('express');
// let app = express()

var util = require('./utils.js')
const NotificacaoDAO = require('./notificacaoDAO.js')()

const connection = require('./connection.js')()





//Rotina do e mail
//verificar quais emendas precisam que e mails sejam enviados hoje
//enviar e mail
//esperar 24 horas
//rodar novamente

function sendEMail(destiatario, HTMLDoEmail){
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
        subject: 'E-mail',
        //text: HTMLDoEmail,
        html: HTMLDoEmail
        //cc: '' //Email para quem será enviado como cópia.
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            //res.status(500).send('Erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response + '\tData: ' + util.getTimeString(date) );
            //res.status(200).send('Email enviado com sucesso.');
        }
    });
}

async function main( resultado, num ) {
    
    arrayDeHTMLDeEmendas = []
    let nomeData

    switch( num ) {
        case 1:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_indicacao_beneficiario ))
        }
        nomeData = 'indicacao beneficiario'
        break;

        case 2:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_cadastramento_proposta ))
        }
        nomeData = 'Cadastrameto da proposta'
        break;

        case 3:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_analise_proposta ))
        }
        nomeData = 'Analise da proposta'
        break;

        case 4:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio_baixa ))
        }
        nomeData = 'celebracao convenio'
        break;

        case 5:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio_media ))
        }
        nomeData = 'celebracao convenio'
        break;

        case 6:
        for( var i=1; i<resultado.length; i++ ) {
            arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda( resultado[i].num_emenda, resultado[i].dias_celebracao_convenio_alta ))
        }
        nomeData = 'celebracao convenio'
        break;
        
        default:
        console.log('lol')
    }


    HTMLDasEmendas = arrayDeHTMLDeEmendas.toString().replace(/,/g, '')//transforma o array em uma string 

    var HTMLString = templater.geraHTMLDoEmail(util.getDateString() + ' ' + new Date().toLocaleTimeString(), 'A data de analise de proposta', HTMLDasEmendas.toString(), '3 dias', nomeData ).toString();  //recebe (dataDeHohe, proximaData, HTMLEmenda, diasRestantes, nomeData)
    //console.log(HTMLString)

    var server = app.listen(3000, () => {
        console.log("Servidor Rodando...");
    })
    
    //sendEMail('luis.taira@mctic.gov.br', HTMLString.toString())
    
    sendEMail('luis.taira@mctic.gov.br', HTMLString.toString())
    app.get('/email', async  (req, res) => {
        sendEMail('luis.taira@mctic.gov.br', HTMLString.toString())
            
    })

    //wait
    // await util.sleep( 1000*60*60*4 )

    // while ( new Date().getHours() != 11) {
    //     while ( new Date().getHours() > 11 || new Date().getHours() < 6  ) {

    //         await util.sleep( 1000*60*60*4 )
    //     }

    //     while ( new Date().getHours() > 6 && new Date().getHours() < 10) {

    //         await util.sleep( 1000*60*30 )
    //     }

    //     await util.sleep ( 1000*60 )
    // }
    server.close();
}

async function damn(){
    //main()
    const con = connection()
    const notificacao = new NotificacaoDAO(con);

    notificacao.getNotificacao1( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 1 ) } } )
    notificacao.getNotificacao2( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 2 ) } } )
    notificacao.getNotificacao3( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 3 ) } } )
    notificacao.getNotificacao4( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 4 ) } } )
    notificacao.getNotificacao5( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 5 ) } } )
    notificacao.getNotificacao6( async ( erro, resultado )  => { if( resultado.length != 0 ) { await main( resultado, 6 ) } } )

}

damn()

