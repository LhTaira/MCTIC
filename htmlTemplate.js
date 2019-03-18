module.exports.geraHTMLDaEmenda = function(numero, dias) {
    let HTMLDaEmenda = 
    `
    <tr>
    <td>${numero}</td>
    <td>${dias}</td>

  </tr>
    `
    return HTMLDaEmenda.toString()
}

// module.exports.randaCor = function() {
//     var randa = Math.floor((Math.random() * 3) + 1);

//     switch( randa ) [
//         case 1
//     ]
// }

module.exports.geraHTMLDoEmail = function(dataDeHoje, proximaData, HTMLEmenda, diasRestantes, nomeData) {
    
    //azul MCTIC #028AC6
    //roxo #7656FF
    let HTMLString = 
    `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    }

    tr:nth-child(even) {
    background-color: #eff9ff;
    }
    h1 {
    color: white;
    font-family:  arial bold, sans-serif;
    background-color: #7656FF; 
    padding: 8px;
    }
    h2 {
    font-family: arial, sans-serif;
    color: #7656FF;
    }
    p {
    font-family: arial, sans-serif;
    }


    </style>
    </head>
    <body>
    <h1>MCTIC</h1>
    <h2>${dataDeHoje}</h2>
    <p>${proximaData}das seguintes emandas é em ${diasRestantes}</p>
    <table>
    <tr>
    <th>Codigo</th>
    <th>Dias restantes para o ${nomeData}</th>
    </tr>
    ${HTMLEmenda}
    </table>

    </body>
    </html>
    `
    /*
    (dataDeHoje) Ex: 13/03/2019
    (proximaData) Ex: A data de analise de proposta
    (diasRestantes) Ex1: 5 dias Ex2: 1 dia
    (HTMLEmenda[linha]) 
    Ex:
    <tr>
    <td>2019</td>
    <td>00001</td>
    <td>Luis</td>
    <td>5,000,000</td>
    </tr>
    */

    return HTMLString.toString();
}