const fs = require('fs');
const getMP3Duration = require('get-mp3-duration'); 
var videoShow = require("videoshow");






//tet




function main(data) {

    return new Promise((resolve, reject) => {

     
        console.log("merge img + aud")
        console.log(data);
        if ((!data) || !(data.f_id) || !(data.token) || !(data.f_ext)) {
            return reject({ status: "error", message: "Missing data" });

        }
        let s_arr = data.f_id.split("_");
        let token = data.token;
        if (s_arr.length != 3) {
            console.log("invalid leng");
            return reject({ status: "error", message: "Invalid  data format" });

        }


        // let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
        let img_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + "."+data.f_ext;
        let voice_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3";

       let new_vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4";




        console.log(img_file_path);
        if (!fs.existsSync(img_file_path)) {
            return reject({ status: "error", message: "File Not Found" });

        }

        console.log(voice_file_path);
        if (!fs.existsSync(voice_file_path)) {
            return reject({ status: "error", message: "File Not Found" });

        }

        console.log(new_vid_file_path);



// const mp3Duration = require('mp3-duration');

const buffer = fs.readFile(voice_file_path,(err,buffer)=>{
  if(err){
    console.log(err) ; 
    return reject({ status: "error", message: "something went wrong" });
  }
  let  duration ; 
 duration = Math.max( getMP3Duration(buffer),3000);
  console.log(duration/1000, 'ms') ;
  // console.log(parseInt(duration/1000), 'ms') ;





console.log("type of duration + ",duration , Number (duration) ); 

      //  return;  
var images = [
  {
    path: img_file_path,
    caption: "this video  is created using videoshow",
    loop: (parseInt(duration)/1000)+1
  }
];






var videoOptions = {
  loop: (parseInt(duration)/1000)+1,
  fps: 25,
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};



console.log(images)
console.log(videoOptions)






//kdjfls 
videoShow(images, videoOptions)
  .audio(voice_file_path)
  .save(new_vid_file_path)
  .on('start', function (command) {
    // res.write('<h1>' + "Conversion started" + command + '</h1>');
    console.log("Conversion started" + command)
    // res.setHeader('Content-Type', 'text/html');
  })
  .on('error', function (err, stdout, stderr) {
    // res.write('<h1>' + "Some  error occured" + err + '</h1>');
    // res.end();
    console.log("Some error occured" + err)
    return reject({ status: "error", message: err });
  })
  .on('end', function (output) {

    // res.write('<h1>Conversion completed #: ' + output + '</h1>');
    // res.end()
    // res.send({"status":"ok","message":  "output" + output}); 
    console.log("Conversion completed" + output)
    return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
  })




})  

        // var speech;
        // console.log(speech)
        // return; 



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