const express = require('express');

const app = express();
const port = 8081;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const dns = require('dns');

const servername = 'www.u91212.test-handyhost.ru';

// function verifyDNS(servername) {
//   return new Promise((resolve, reject) => {
//     dns.resolveTxt(servername, (dnserr, dnsres) => {
//       if (dnserr) return reject(dnserr);
//       resolve(dnsres);
//     });
//   });
// }

dns.resolveTxt(`${servername}`, (err, records) => {
  const ddd = records;
  console.log(ddd); // [ [ '0x5D9089Bd1f195BF34724A8e585C45Ecb1466AB5E' ] ]
});
