var templater = require('./htmlTemplate.js')
var nodemailer = require("nodemailer");
var app = require('express')();
var util = require('./utils.js')

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
        from: '<lol@lol.com>',
        to: destiatario,
        subject: 'E-mail',
        //text: HTMLDoEmail,
        html: HTMLDoEmail
        //cc: '' //Email para quem será enviado como cópia.
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response + '\tData: ' + util.getTimeString(date) );
            res.status(200).send('Email enviado com sucesso.');
        }
    });

}

function main() {

    //const knexo = util.connectKnex()

    app.get('/db', (req, res) => {
        const knex = util.connectKnex();
    
        knex.select('*').from('emenda')
            .then(resultado => {
                knex.destroy();
                res.status(200).json(resultado);
                console.log(resultado)
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.sendStatus(500);
            })
    });
   

    arrayDeHTMLDeEmendas = []

    for( var i=1; i<6; i++){
        arrayDeHTMLDeEmendas.push(templater.geraHTMLDaEmenda('2019', `${i}`.toString(), 'Luis', `${i*4587}`.toString()))//cria tabela fake
    }

    HTMLDasEmendas = arrayDeHTMLDeEmendas.toString().replace(/,/g, '')//transforma o array em uma string 

    var HTMLString = templater.geraHTMLDoEmail(util.getDateString() + ' ' + new Date().toLocaleTimeString(), 'A data de analise de proposta', HTMLDasEmendas.toString(), '3 dias').toString();  //recebe (dataDeHohe, proximaData, HTMLEmenda, diasRestantes)
    //console.log(HTMLString)

    app.listen(3000, () => {
        console.log("Servidor Rodando...");
    })
    
    //sendEMail('luis.taira@mctic.gov.br', HTMLString.toString())

    app.get('/email', async  (req, res) => {
        sendEMail('luis.taira@mctic.gov.br', HTMLString.toString())
            
    })
   util.wait()

}
main()