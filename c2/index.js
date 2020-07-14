const fs = require('fs');
// KREIRA NOV FILE
/* fs.writeFile('text.txt', 'Hello World 2', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Write succesfull');
}); */

//ZAPISUVA NOV BEZ DA PREBRISE
/* fs.appendFile('text.txt', 'data to append', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Write succesfull');
}); */

// CITA FILE
/* fs.readFile('text.txt', 'utf8', (err, data) => {
    if(err) {
        return console.error(err);
    }
    console.log(data);
}); */

//BRISENJE NA FILE-OVI
/* fs.unlink('text.txt', (err) => {
    if (err) {
        return console.error(err);
    };
}); */

const writeFIle = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};


const appendFile = (filename, data) => {
    return new Promise((success, fail) => {
        fs.appendFile(filename, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const readFile = (filename, data) => {
    return new Promise((success, fail) => {
        fs.readFile(filename, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const unlink = (filename, data) => {
    return new Promise((success, fail) => {
        fs.unlink(filename, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};


writeFIle('test.txt', 'Здраво Свету')
.then(() => {
    console.log('Write Succesfull');
    return fs.appendFile('test.txt', ' HelloZZZ');
})
.then(() => {
    console.log('Append Succesfull');
    return readFile('test.txt');
})
.then((data) => {
    console.log('Read Succesfull');
    console.log(data);
    return fs.unlink('File deleted');
})
.catch((err) => {
    console.error(err);
});