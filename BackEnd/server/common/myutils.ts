import * as base64Img from  'base64-img'
import * as path from 'path';

export const  getURL = function (req, params) {

    return process.env.PORT ? `${req.hostname}:${process.env.PORT}${params}` :  
    `${req.hostname}${params}`
}

export const fileUpload = function ( file , dest, name) {
    return new Promise(function(resolve, reject) {
        base64Img.img(file , 'public' + dest, name, function(err, filepath) {
            if(err) return reject(err);
            resolve(filepath)
          })
    });
}