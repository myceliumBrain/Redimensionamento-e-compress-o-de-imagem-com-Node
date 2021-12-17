const sharp = require('sharp')
const compressImage = require('compress-images')
const fs = require('fs')


let img = process.argv[2]
let size = Number(process.argv[3])
let rotate = Number(process.argv[4]);

function redimensionar(inputImage, outputImage, redimention, rotation)
{
    sharp(inputImage).rotate(rotation).resize({width: redimention})
        .toFile(outputImage, (err)=>{
            if (err){
                console.log(err)
            }else{
                console.log("imagem redimesionada com sucesso!");
                comprimir(outputImage, "./compressed/");
            }
    })
}

function comprimir(inputImage, outputImage){

    compressImage(inputImage, outputImage, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

function (error, completed, statistic) {
console.log("-------------");
console.log(error);
console.log(completed);
console.log(statistic);
console.log("-------------");

fs.unlink(inputImage, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("arquivo comprimido com sucesso")
    }
    })

});

}

redimensionar(img, "./temp/image.jpg", size, rotate)
