const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

//const url1 = 'http://nodeprogram.com';
const downloadPage = (url = 'http://nodeprogram.com') => {
    console.log('downloading ', url);

    const fetchPage = (urlF, callback) =>{
        http.get(urlF , (res) => {
            let buffer = '';
            res.on('data', (chunk) => {
                buffer += chunk;
            });
            res.on('end', ()=>{
                callback(null, buffer);
            });
        }).on('error', (error)=>{
            console.log(`Got Error: ${error.message}`);
            callback(error);
        });
    }

    const folderName = uuidv1();
    fs.mkdirSync(folderName);
    fetchPage(url , (error , data )=>{
        if(error) return console.log(error);
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
        fs.writeFileSync(path.join(__dirname , folderName , 'file.html'),data);
        console.log('Downloading is done in folder', folderName);
    });
}

downloadPage(process.argv[2]);
/*
const downloadPage = http.get(url , (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });
    res.on('end', ()=>{

    });
}).on('error', (error)=>{
    console.log(`Got Error: ${error.message}`);
});
*/