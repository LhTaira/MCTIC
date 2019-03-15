let app = require('express')();
let nodemailer = require('nodemailer');

function sleeper(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getTimeString(date){
    timeString = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
    return timeString;
}

function sendEMail(destiatario, i){
    date = new Date();
    //Criação do objeto.
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
        from: '<lol@lol.com>', //Email de quem está enviando a mensagem.
        to: destiatario, //Email de quem vai receber a mensagem.
        subject: 'E-mail numero ' + i.toString(), //Título da mensagem
        text: 'E-mail enviado em: ' + getTimeString(date), //Mensagem.
        //html: "<b> Bem fácil, não? ;) </b>", //Menagem em formato HTML.
        //cc: '' //Email para quem será enviado como cópia.
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response + '\tData: ' + getTimeString(date) );
            res.status(200).send('Email enviado com sucesso.');
        }
    });

}

app.get('/email', async  (req, res) => {
    

    let i=0;
   //while(new Date().getSeconds() != 0){ await sleeper(100) }

    //while(true){
        //i++;
        sendEMail('luishptaira@gmail.com',i);
        //await sleeper(10000);
    //}
})
 
//Sobe o servidor na porta 3000.
app.listen(3000, () => {
    console.log("Servidor Rodando...");
})