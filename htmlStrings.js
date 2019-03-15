module.exports.HTMLString1 = 
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
    background-color: #3CAC30;
    padding: 8px;
}
h2 {
    font-family: arial, sans-serif;
}
p {
    font-family: arial, sans-serif;
}


</style>
</head>
<body>
<h1>MCTIC</h1>
<h2>
` 
//(data de hoje)  Ex: 13/03/2019 ${data}

module.exports.HTMLString2=
`

</h2>
<p>
`
//(data que se aproxima) Ex: A data de analise de proposta 
module.exports.HTMLString3=
`das seguintes emandas é em`
//(dias restantes)  Ex1: 5 dias  Ex2: 1 dia
module.exports.HTMLString4=
`</p>
<table>
  <tr>
    <th>Ano</th>
    <th>Número</th>
    <th>Autor</th>
    <th>Valor</th>
  </tr>`
/*(HTML de cada emenda[linha]) 
Ex:
  <tr>
    <td>2019</td>
    <td>00001</td>
    <td>Luis</td>
    <td>5,000,000</td>
  </tr>
*/
module.exports.HTMLString5=
`
</table>

</body>
</html>
`
