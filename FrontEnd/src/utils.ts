
export const fileToBase64 = function (file: any) {
   return  new Promise (function(resolve: (val: string) => void , reject: (val: string) => void) {
    var fileReader = new FileReader();
    fileReader.onloadend = function() {
        resolve(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    });
};