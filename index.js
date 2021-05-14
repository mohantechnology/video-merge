'use strict';
// require('dotenv').config(); 

const express = require('express');
const app = express();
// const jwt = require("jsonwebtoken"); 
// const mongoose = require("mongoose");
// const validator = require("validator");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const model_folder = "model";
const login = require(__dirname + "/" + model_folder + '/login');
const fileUpload = require('express-fileupload');
const { basename } = require('path');
var port = process.env.PORT || 3000;



var txt_to_voice = require('./controller/txt_to_voice');
var merge_img_aud = require('./controller/merge_img_aud');
var merge_vid_aud = require('./controller/merge_vid_aud');
var conv_mp4_ts = require('./controller/conv_mp4_ts');
var merge_all = require('./controller/merge_all');
// var merge_img_aud = require('./controller/merge_img_aud');




const { v4: uuidv4 } = require('uuid');

// console.log(uuidv4()); 




app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use('/public', express.static('public'));


app.use(fileUpload({
  limits: { fileSize: 100 * 1000000 },
}));









function pr(r1, r2, r3, r4) {

  if (r1) {
    console.log(r1)
  }

  if (r2) {
    console.log(r2)
  }
  if (r3) {
    console.log(r3)
  }
  if (r4) {
    console.log(r4)
  }
}



// const mp3Duration = require('mp3-duration');
// const getMP3Duration = require('get-mp3-duration')
// const buffer = fs.readFile('Voice2.mp3',(err,buffer)=>{
//   if(err){
//     console.log(err) ; 
//   }
//   const duration = getMP3Duration(buffer);
//   console.log(duration, 'ms') ;
// })

 



// const fs = require('fs');

// const folder = './mp3s/';

// fs.readdir(folder, (err, files) => {
//     if (err) {
//         return console.log(err.message);
//     }

//     for (let file of files) {
//         mp3Duration(folder + file, (err, duration) => {
//             if (err) {
//                 return console.log(err.message);
//             }

//             console.log(file + ' is ' + duration + ' seconds long');
//         });
//     }
// });


// app.get('/api', (req, res) => {
//   // res.json( {status:"ok" , message: "get"}); 
//   // res.json( req.params); 
//    login({ email: "mohan3@gmail.com ", name: "road" }).then(data => {

//     pr("returned data  main is: ", data);
//     res.json( {status:"ok" , message: data}); 

// }).catch(error => {
//     pr("error from main ", error);
// });

// });


// app.post ('/api', (req, res) => {
//   res.json( {status:"ok"  , message: req.body}); 
//   // res.json( ); 
// });



app.get('/down/:file_path', (req, res) => {

  // res.json( {status:"ok"  , message: req.body}); 

  
  
  if ((!req.params.file_path)  || !(req.cookies.li)) {
    return res.json({ status: "error", message: "Missing data" });
    
  }
  let file_path = __dirname + "/public/upload/"+ req.cookies.li+ "/" + req.params.file_path ; 
console.log(file_path); 
  if (!fs.existsSync(file_path)) {
    return res.json({ status: "error", message: "File Not Found" });

} 
  res.download(file_path)
});


console.log( __dirname + `/public/upload/${3434}`); 
console.log( __dirname ); 


app.get('/', (req, res) => {

  // res.json( {status:"ok"  , message: req.body}); 
  let token; 
  if ( !(req.cookies && req.cookies.li)){
     token = uuidv4();

    // fruits.join();
    res.cookie("li", token, { expires: new Date(Date.now() + 10000000000),sameSite:"strict"} );
}else{
  token = req.cookies.li; 
}
  

let path_link = __dirname + `/public/upload/${token}`;
// let path_link =__dirname + `/upload_file`;

if (!fs.existsSync(__dirname + `/public`)) {
  console.log( "creating dir " + __dirname + `/public`)
  fs.mkdirSync(path_link);
}
else{
  console.log( "already created dir " + __dirname + `/public`)
}



if (!fs.existsSync(__dirname + `/public/upload`)) {
  fs.mkdirSync(path_link);
  console.log( "creating dir " + __dirname + `/public/upload`)
}else{
  console.log( "already created dir " +  __dirname + `/public/upload`)
}

if (!fs.existsSync(path_link)) {
  fs.mkdirSync(path_link);
  console.log( "creating dir " + path_link)
}
else{
  console.log( "already created dir " + path_link)
}


  res.sendFile(__dirname + "/index.html")
});



app.post('/txt_to_voice', (req, res) => {

  req.body.token = req.cookies.li; 
  txt_to_voice(req.body)
  .then(data=>{
    console.log(data);
       res.json(data)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});




app.post('/merge_img_aud', (req, res) => {

  req.body.token = req.cookies.li; 
  console.log( "body-0--- start") ; 
  console.log(   req.body); 
  console.log( "body-0---end ") ;
  merge_img_aud(req.body)
  .then(data=>{
    console.log(data);
       res.json(data)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});






app.post('/merge_vid_aud', (req, res) => {

  req.body.token = req.cookies.li; 
  console.log( "body-0--- start") ; 
  console.log(   req.body); 
  console.log( "body-0---end ") ;
  merge_vid_aud(req.body)
  .then(data=>{
    console.log(data);
       res.json(data)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});






app.post('/conv_mp4_ts', (req, res) => {

  req.body.token = req.cookies.li; 
  console.log( "body-0--- start") ; 
  console.log(   req.body); 
  console.log( "body-0---end ") ;
  conv_mp4_ts(req.body)
  .then(data=>{
    console.log(data);
       res.json(data)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});






app.post('/merge_all', (req, res) => {

  req.body.token = req.cookies.li; 
  console.log( "body-0--- start") ; 
  console.log(   req.body); 
  console.log( "body-0---end ") ;
  merge_all(req.body)
  .then(data=>{
    console.log(data);
       res.json(data)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })

});










app.get('/cook', (req, res) => {

  res.json( {status:"ok"  , message: req.cookies}); 
// let token = "13434434"; 
//   res.cookie("li", token, { expires: new Date(Date.now() + 6000000),sameSite:"strict"} );
//   res.sendFile(__dirname + "/index.html")
});






app.post('/upload', (req, res) => {
  let up_file;

  // req.files.upload_file.data=null; 
  // res.json( {status:"ok"  , message: req.body,file_detail: req.files }); 
  // if file is present then  update the file in database also and delete prev file 
  if (req.files && req.files.upload_file) {

console.log(  req.body ) ;
console.log(  req.params ) ;
console.log(  req.files ) ;
console.log(req.query);
// return; 
req.params.f_id= req.query.f_id; 
console.log(req.params);
    // res.send({status:"ok",file_link: r_data.curr_file_name,file_name:r_data.file_name,mime_type:sampleFile.mimetype,folder_name: r_data.folder_name }); 

  //check cookie to create folder 

  let token; 

  if ( !(req.cookies && req.cookies.li)){
    // res.redirect(__dirname +   "/index.html")
    res.json( {status:"error"  , message: "Not a valid request try reloading" }); 
}else{
    token = req.cookies.li
}


// if ( !( req.params.f_id )){
//   res.json( {status:"error"  , message: "Not a valid file" }); 
// }



    let sampleFile = req.files.upload_file;
    
    let s_arr = basename(sampleFile.name).split('.'); 
   let extn =  s_arr[s_arr.length-1]; 
   
   let org_name = req.params.f_id  +"."+  extn   ;


console.log( "splitted file ext "); 


    //create folder if not exist 
    let path_link = __dirname + `/public/upload/${token}`;
    // let path_link =__dirname + `/upload_file`;

    if (!fs.existsSync(__dirname + `/public`)) {
      console.log( "creating dir " + __dirname + `/public`)
      fs.mkdirSync(__dirname + `/public`);
    }
    if (!fs.existsSync(__dirname + `/public/upload`)) {
      fs.mkdirSync(__dirname + `/public/upload`);
      console.log( "creating dir " + __dirname + `/public/upload`)
    }

    if (!fs.existsSync(path_link)) {
      fs.mkdirSync(path_link);
      console.log( "creating dir " + path_link)
    }
    else{
      console.log( "already created dir " + path_link)
    }
    sampleFile.mv(path_link + "/" + org_name, function (err) {
      if (err) {
        console.log("erro is: ", err.message)
        res.json({ status: "error", message: err.message });
      }
      else {
        res.json({ status: "ok", file_link: token + "/" + org_name });
      }

    });


  } else {
    res.json({ status: "error", message: "File is not sended successfully" });
  }

})



app.post('/up', (req, res) => {
  let up_file;

  // req.files.upload_file.data=null; 
  // res.json( {status:"ok"  , message: req.body,file_detail: req.files }); 
  // if file is present then  update the file in database also and delete prev file 
  if (req.files && req.files.upload_file) {



    let sampleFile = req.files.upload_file;
    
    let s_arr = basename(sampleFile.name).split('.'); 
   let extn =  s_arr[s_arr.length-1]; 
   
   let org_name = req.params.f_id  +"."+  extn   ;


    let path_link = __dirname + `/public/upload`;
    // let path_link =__dirname + `/upload_file`;
    console.log( "path is  ")

    sampleFile.mv(path_link + "/" + org_name, function (err) {
      if (err) {
        console.log("erro is: ", err.message)
        res.json({ status: "error", message: err.message });
      }
      else {
        res.json({ status: "ok", file_link:  "/" + org_name });
      }

    });


  } else {
    res.json({ status: "error", message: "File is not sended successfully" });
  }

}); 




app.get('/comp/:name', (req, res) => {






  console.log(req.params.name);


  var videoShow = require("videoshow");
  var images = [
    {
      path: "./public/img/image12.jpg",
      caption: req.params.name,
      loop: 3
    }
  
  ];


  var videoOptions = {
    loop: 5,
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





  //tet


  //kdjfls 
  videoShow(images, videoOptions)
    .audio("voice2.mp3")
    .save("slideshow.mp4")
    .on('start', function (command) {
      res.write('<h1>' + "Conversion started" + command + '</h1>');
      console.log("Conversion started" + command)
      // res.setHeader('Content-Type', 'text/html');
    })
    .on('error', function (err, stdout, stderr) {
      res.write('<h1>' + "Some  error occured" + err + '</h1>');
      res.end();
      console.log("Some error occured" + err)
    })
    .on('end', function (output) {

      res.write('<h1>Conversion completed #: ' + output + '</h1>');
      res.end()
      // res.send({"status":"ok","message":  "output" + output}); 
      // console.log("Conversion completed" + output)
    })



})




app.get('/run', (req, res) => {

  // res.send("dsljfj")

  res.sendFile(__dirname + "/index.html");
  // F:\nodejsproject\backend_digital_investo\app\index.js



  // res.render("find_friend"); 
  //  res.sendFile("find_friend"); 
});


app.get('/slideshow.mp4', (req, res) => {

  // res.send("dsljfj")
  res.sendFile(__dirname + "/slideshow.mp4");
  // F:\nodejsproject\backend_digital_investo\app\index.js



  // res.render("find_friend"); 
  //  res.sendFile("find_friend"); 
});

app.get('/output.mp4', (req, res) => {

  // res.send("dsljfj")
  res.sendFile(__dirname + "/output.mp4");
  // F:\nodejsproject\backend_digital_investo\app\index.js



  // res.render("find_friend"); 
  //  res.sendFile("find_friend"); 
});

app.get('/output100.mp4', (req, res) => {

  // res.send("dsljfj")
  res.sendFile(__dirname + "/output100.mp4");
  // F:\nodejsproject\backend_digital_investo\app\index.js



  // res.render("find_friend"); 
  //  res.sendFile("find_friend"); 
});



app.get('/merge', (req, res) => {

  const { spawn } = require('child_process');
  // NOTE: Windows Users, this command appears to be differ for a few users.
  // You can think of this as using Node to execute things in your Command Prompt.
  // If `cmd` works there, it should work here.
  // If you have an issue, try `dir`:
  // const dir = spawn( 'dir', [ '.' ] );
  try {
    const dir = spawn('./cmd', ['/c', 'ffmpeg -i slideshow.mp4 -i Voice.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4']);

    dir.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
      res.write('<h1>' + "datat is " + data + '</h1>');

    });

    dir.stdout.on('error', (error) => {
      console.log(`stdout: ${error}`)
      res.write('<h1>' + "error  is " + error + '</h1>');

    });

    dir.stderr.on('data', (data) => console.log(`stderr: ${data}`));
    dir.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      res.write('<h1>' + " last line " + code + '</h1>');
      res.end();
    });
  } catch (error) {
    console.log(error);
  }


});



app.get('/exe', (req, res) => {
  console.log("called  exe ");
  const { spawn } = require('child_process');
  // NOTE: Windows Users, this command appears to be differ for a few users.
  // You can think of this as using Node to execute things in your Command Prompt.
  // If `cmd` works there, it should work here.
  // If you have an issue, try `dir`:
  // const dir = spawn( 'dir', [ '.' ] );



  const { exec } = require('child_process');

  const ls = exec('ffmpeg -i slideshow.mp4 -i Voice.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();
  }); 

  ls.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);
    res.write('<h1>' + " last line " + code + '</h1>');
    // res.end();
  });


});
























app.get('/path', (req, res) => {


  const os = require('os');

  // Printing os.platform() value
  console.log(os.platform());


  res.send(os.platform());
  // res.sendFile( __dirname +  "/slideshow.mp4"); 
  // F:\nodejsproject\backend_digital_investo\app\index.js



  // res.render("find_friend"); 
  //  res.sendFile("find_friend"); 
});








app.get('/do', (req, res) => {



  const { spawn } = require('child_process');
  // NOTE: Windows Users, this command appears to be differ for a few users.
  // You can think of this as using Node to execute things in your Command Prompt.
  // If `cmd` works there, it should work here.
  // If you have an issue, try `dir`:
  // const dir = spawn( 'dir', [ '.' ] );


  let dir, dir1, dir2;

  dir = spawn('cmd', ['/c', 'ffmpeg -i slideshow.mp4 -vn -ac 2 out.mp3']);

  dir.stdout.on('data', (data) => console.log(`stdout: ${data}`));
  dir.stderr.on('data', (data) => console.log(`stderr: ${data}`));
  dir.on('close', (code) => {
    console.log(`child process exited with code ${code}`)

    console.log("__------------------------ seperated song  ---- out.mp3 ")


    dir1 = spawn('cmd', ['/c', 'ffmpeg -i out.mp3  -i  input3.mp3  -filter_complex amix=inputs=2:duration=longest output.mp3']);

    dir1.stdout.on('data', (data) => console.log(`stdout: ${data}`));
    dir1.stderr.on('data', (data) => console.log(`stderr: ${data}`));
    dir1.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      console.log("__------------------------ merge  song  ---- output .mp3 ")




      dir2 = spawn('cmd', ['/c', 'ffmpeg -i  slideshow.mp4  -i output.mp3  -c:v copy -c:a copy   -map 0:v:0 -map 1:a:0  output.mp4']);

      dir2.stdout.on('data', (data) => console.log(`stdout: ${data}`));
      dir2.stderr.on('data', (data) => console.log(`stderr: ${data}`));
      dir2.on('close', (code) => console.log(`child process exited with code ${code}`));

      console.log("__------------------------ merge song and video   ---- out.mp4444 ")
      console.log("__------------------------ merge song and video   ---- out.mp4444 ")
      res.end("path is : " + __dirname + "output.mp4");
    });


  });







});









app.get('/do_exe', (req, res) => {










  const { exec } = require('child_process');

  const ls = exec('ffmpeg -i slideshow.mp4 -vn -ac 2 out.mp3', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    // res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();
  });

  ls.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);
    res.write('<h1>' + " last line " + code + '</h1>');

    res.end("_------------------------ seperate song and video   ---- out.mp3")
    console.log("__------------------------ seperate song and video   ---- out.mp3 ")









  });






  // res.end();
});






app.get('/do_exe1', (req, res) => {










  const { exec } = require('child_process');

  const ls1 = exec('ffmpeg -i out.mp3  -i  input3.mp3  -filter_complex amix=inputs=2:duration=longest output.mp3', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

      // res.end("__------------------------  combine audio    ---- output.mp3 ");
    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    // res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end("_------------------------ merge both audio    ---- out.mp4");
  });

  ls1.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);
    // res.write('<h1>' + " last line " + code + '</h1>');

    console.log("__------------------------  combine audio    ---- output.mp3 ")





  });




  // res.end();
});


















// merge two newly created audio to video 
app.get('/do_exe2', (req, res) => {


  const { exec } = require('child_process');
  const ls2 = exec('ffmpeg -i  slideshow.mp4  -i output.mp3  -c:v copy -c:a copy   -map 0:v:0 -map 1:a:0  output.mp4', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

    res.end("completed " + "path is : " + __dirname + "output.mp4");
  });

  ls2.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);


    2
  });




  // res.end();
});






app.get('/con1', (req, res) => {


  const { exec } = require('child_process');
  const ls2 = exec('ffmpeg -i video.mp4 -c copy -bsf:a aac_adtstoasc  vid1.ts  -y', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

    res.end("completed " + "path is : " + __dirname + "output.mp4");
  });

  ls2.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);



  });




  // res.end();
});






app.get('/con2', (req, res) => {


  const { exec } = require('child_process');
  const ls2 = exec('ffmpeg -i slideshow.mp4 -c copy -bsf:a aac_adtstoasc  vid2.ts -y', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

    res.end("completed " + "path is : " + __dirname + "output.mp4");
  });

  ls2.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);



  });




  // res.end();
});






app.get('/con3', (req, res) => {


  const { exec } = require('child_process');
  const ls2 = exec('ffmpeg -i "concat:vid1.ts|vid2.ts" -c copy output100.mp4   -y', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
      // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
      // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

    }
    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
    res.write('<h1>' + " Signal received: " + stdout + '</h1>');
    // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

    res.end("completed " + "path is : " + __dirname + "output.mp4");
  });

  ls2.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);



  });




  // res.end();
});





// const os = require('os');

// // Printing os.platform() value
// console.log(os.platform());


// res.send(os.platform());
// // res.sendFile( __dirname +  "/slideshow.mp4"); 
// // F:\nodejsproject\backend_digital_investo\app\index.js



// res.render("find_friend"); 
//  res.sendFile("find_friend"); 
















app.post("/*", (req, res) => {
  res.status(404).send({ "status": "error", message: "page not found from 1" })
})

app.get("/*", (req, res) => {
  res.status(404).send({ "status": "error", message: "page not found from 1" })
})



// require('crypto').randomBytes(48, function(err, buffer) {
//   var token = buffer.toString('hex');
// });
// var token = crypto.randomBytes(64).toString('hex');
app.listen(port, () => {
  console.log("listening at " + port);
});





// focusing   on Backend area 

// using  google text to speech for text to  voice conversion 
// using  videoshow to merge img + audio 
// using Node.js 'child_process' for remaining  operation to execute the ffmpeg commands

// getting error when merging two mp4 files with different height and width
// fixed the error 

// complete within few days




/*



app.post('/transfer_file/:curr_f_id/:file_mess?', function (req, res) {
  console.log(req.files);

  let up_file;


  // if file is present then  update the file in database also and delete prev file
  if (req.files && req.files.transfer_file ) {

 let cookie_data = jwt.decode(req.cookies.li);
 cookie_data.file_name = req.files.transfer_file.name;
 cookie_data.file_mess = req.params.file_mess;
 cookie_data.curr_f_id =  req.params.curr_f_id;
 cookie_data.mime_type = req.files.transfer_file.mimetype;


    axios({
      method: 'post',
      url: process.env.API_URL + "/transfer_file",
      data: cookie_data
    }).then(function (response) {
      console.log("response data is: ");
      console.log(response.data);
      if (response.data.status == "ok") {
        let r_data = (response.data);


        let sampleFile = req.files.transfer_file;
        //create folder if not exist
        let path_link =__dirname + `/public/transfer_file/${r_data.folder_name}`;
        // let path_link =__dirname + `/transfer_file`;

        if (!fs.existsSync(path_link)) {
          fs.mkdirSync(path_link);
        }
        sampleFile.mv(path_link+"/"+r_data.curr_file_name, function (err) {
          if (err) {
            console.log("erro is: ", err.message)
            res.send({ status: "error", message: err.message });
          }
          else{
            res.send({status:"ok",file_link: r_data.curr_file_name,file_name:r_data.file_name,mime_type:sampleFile.mimetype,folder_name: r_data.folder_name });
          }

        });


        } else {
        res.send({ status: "error", message: "File is not sended successfully" });
      }
    }).catch(err => {
      console.log("error is: ");
      console.log(err);
      // ### ca
      res.status(500).send({ "status": "Internal server error",error:err });

    });
  }else{
    res.send({status:"error",message:"File not present" });
  }

  });


  // transfer_file

app.get('/download/:folder/:file/:file_name?', function (req, res) {
  console.log(req.params);




        let path_link =__dirname + `/public/transfer_file/${req.params.folder}/${req.params.file}`;
        // let path_link =__dirname + `/transfer_file`;

          if(req.params.file_name)
         {
        res.download(path_link,req.params.file_name)
           }
       else{
          res.download(path_link)
       }


          //  console.log("File not present ")
          //   res.send({status:"error",message:"File not present" });





  });

*/

/*

create a sample layout for  user interaction 

user's  can add  img and transcript and convert to video 
user's  can add video  and transcript  and  convert to video with merge audio 
user's  can merge all uploaded  convert video to one single video 

user's  can preview the final video  
*/