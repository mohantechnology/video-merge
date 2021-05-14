const gTTS = require('gtts');
const fs = require('fs');



// var speech = 'maa yahaa hu tum kaha ho , gupchup khaye ckya hum. kal hamlog ghar jayenge  हम घर वापस जाएँगे' ;
// var gtts = new gTTS(speech, 'hi');

// gtts.save('Voice.mp3', function (err, result){
//     if(err) { throw new Error(err); }
//     console.log("Text to speech converted!");
// });

// async function main(data) {
//     console.log("हम घर वापस जाएँगे"[9])
//     console.log(data);
//     if ((!data) || !(data.f_id) || !(data.token)) {
//         return { status: "error", message: "Missing data" };
//     }
//     let s_arr = data.f_id.split("_");
//     let token = data.token;
//     if (s_arr.length != 3) {
//         console.log("invalid leng");
//         return { status: "error", message: "Invalid  data format" };
//     }


//     let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
//     let voice_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3";
//     console.log(file_path);
//     if (!fs.existsSync(file_path)) {
//         return { status: "error", message: "File Not Found" };
//     }

//     fs.readFile(file_path, "utf8", (err, data) => {
//         if (err) {
//             console.error(err)
//             return { status: "error", message: "something went wrong" };
//         }
//         console.log(data)
//         var speech = data;
//         var gtts = new gTTS(speech, 'en');

//         gtts.save(voice_file_path, function (err, result) {
//             if (err) { throw new Error(err); }
//             console.log("Text to speech converted!");
//         });
//     })
// }



















function main(data) {

    return new Promise((resolve, reject) => {
        console.log("हम घर वापस जाएँगे"[9])
        console.log(data);
        if ((!data) || !(data.f_id) || !(data.token)) {
            return reject({ status: "error", message: "Missing data" });

        }
        let s_arr = data.f_id.split("_");
        let token = data.token;
        if (s_arr.length != 3) {
            console.log("invalid leng");
            return reject({ status: "error", message: "Invalid  data format" });

        }


        let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
        let voice_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3";

        console.log(file_path);
        if (!fs.existsSync(file_path)) {
            return reject({ status: "error", message: "File Not Found" });

        }
        console.log("till here");

        // var speech;
        // console.log(speech)
        // return; 


        fs.readFile(file_path, "utf8", (err, data) => {
            if (err) {
                console.error(err)
                return reject({ status: "error", message: err });
            }
            console.log(data)
            var speech = data;
          
            try {
                var gtts = new gTTS(speech, 'en');
                gtts.save(voice_file_path, function (err, result) {
                    if (err) { return reject({ status: "error", message: err }); }

                    console.log("Text to speech converted!\n", voice_file_path);
                    return resolve({ status: "ok", message: "text to speech converted", link: "public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3" });
                });
            } catch (error) {
                return reject({ status: "error", message: err });
            }

        })

    });
}











//     var gtts = new gTTS(speech, 'hi');

//     gtts.save(voice_file_path, function (err, result) {
//         if (err) {
//             return reject({ status: "error", message: err });
//         }
//         return resolve({ status: "ok", message: "text to speech converted" });
//     });




module.exports = main;