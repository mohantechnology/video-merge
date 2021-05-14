const fs = require('fs');
// const getMP3Duration = require('get-mp3-duration'); 
// var videoShow = require("videoshow");
var  { exec } = require('child_process');













// const ls2 = exec('ffmpeg -i video.mp4 -c copy -bsf:a aac_adtstoasc  vid1.ts  -y', function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: ' + error.code);
//     console.log('Signal received: ' + error.signal);
//     // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
//     // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

//   }
//   console.log('Child Process STDOUT: ' + stdout);
//   console.log('Child Process STDERR: ' + stderr);
//   res.write('<h1>' + " Signal received: " + stdout + '</h1>');
//   // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

//   res.end("completed " + "path is : " + __dirname + "output.mp4");
// });

// ls2.on('exit', function (code) {
//   console.log('Child process exited with exit code ' + code);



// });











function main(data) {

    return new Promise((resolve, reject) => {

     
        console.log("merge img + aud")
        console.log(data);
        if ((!data) || !(data.f_id) || !(data.token) || !(data.f_f_type)) {
            return reject({ status: "error", message: "Missing data" });

        }
        let s_arr = data.f_id.split("_");
        let token = data.token;
        if (s_arr.length != 3) {
            console.log("invalid leng");
            return reject({ status: "error", message: "Invalid  data format" });

        }

 
        // let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
        let vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4";
        // let voice_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3";

       let new_vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_cvideo_" + s_arr[2] + ".ts";




        console.log(vid_file_path);
        if (!fs.existsSync(vid_file_path)) {
            return reject({ status: "error", message: "File Not Found" });

        }

        // console.log(voice_file_path);
        // if (!fs.existsSync(voice_file_path)) {
        //     return reject({ status: "error", message: "File Not Found" });

        // }

        console.log(new_vid_file_path);



        // `ffmpeg -i ${vid_file_path} -c copy -bsf:a aac_adtstoasc  ${new_vid_file_path}  -y`
        let ls = exec(`ffmpeg -i ${vid_file_path} -c copy -bsf:a aac_adtstoasc  ${new_vid_file_path}  -y`, function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: ' + error.code);
              console.log('Signal received: ' + error.signal);
              return reject({ status: "error", message: error.code });
            //   res.write('<h1>' + " Signal received: " + error.code + '</h1>');
            //   res.write('<h1>' + " Signal received: " + error.signal + '</h1>');
          
            }
            console.log('Child Process STDOUT: ' + stdout);
            console.log('Child Process STDERR: ' + stderr);
            return resolve({ status: "ok", message:  " video converted to ts"  ,link:new_vid_file_path});
            // res.write('<h1>' + " Signal received: " + stdout + '</h1>');
            // res.end();
            // return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
          }); 
          
          ls.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code);
            // return reject({ status: "error", message: 'Child process exited with exit code ' + code });
            // res.write('<h1>' + " last line " + code + '</h1>');
            // res.end(<h1>' + " last line " + code + '</h1>);
          });
        //   res.end();


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