

export const  getURL = function (req, params) {

    return process.env.PORT !== '80' ?  `${req.hostname}:${process.env.PORT}${params}` :  
    `${req.hostname}${params}`
}