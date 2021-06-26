const server = require('express').Router();
const path = require('path')
var multer = require('multer'); 
var sharp = require('sharp'); 


/***********Configurar Multer*******************/
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../client/public/images/product_image'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
});

/*****Se le puede configurar un limite de tamaño aún no definido******* */
const uploadImage = multer({
    storage,
}).single('image'); //Hasta el momento un solo archivo -->image lo que va en el formulario

server.post('/', async (req, res) => {

    let destino = path.join(__dirname, '../../../client/public/images/card_image/')
    let pathProduct = '/images/product_image/'
    let pathCard = '/images/card_image/'
  

    uploadImage(req, res, async(err) => {

        console.log('PATH',req.file.path);
        const fileOriginalPath = req.file.path;
        let imageName = req.file.originalname;

        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        /**Cambiando el tamaño de la imagen */
        await sharp(fileOriginalPath).resize(500,574) 
            .png({quality : 90}).toFile(destino  + req.file.originalname);

        console.log(req.file);
        return res.send( { dataImage: imageName } ); // está va a ser mi respuesta no la del modelo
    });

    
});


module.exports = server;