const https = require('https');

const urls = [
    'https://gifdb.com/images/high/cute-bear-bubu-dudu-kissing-eheo521u6csuh1u8.gif', // 404
    'https://gifdb.com/images/high/milk-and-mocha-bear-blushing-3x16v8g9x4q02e2.gif', // let's try
    'https://gifdb.com/images/high/cute-kiss-bear-bubu-dudu-1896q194p21z31d0.gif', // let's try
    'https://gifdb.com/images/high/cute-cats-kissing-k555c42q4d5b24w0.gif',
    'https://raw.githubusercontent.com/DzarelDeveloper/Img/main/gifyou.gif', // from Dzarel
    'https://raw.githubusercontent.com/DzarelDeveloper/Img/main/gif.gif' // from Dzarel
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(url, res.statusCode);
    }).on('error', (e) => {
        console.error(url, 'error', e.message);
    });
});
