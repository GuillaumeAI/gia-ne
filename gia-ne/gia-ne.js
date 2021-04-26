#!/usr/bin/env node

/** Guillaume Isabelle, 2021 (GIA-NE)
 * Vision: A containerized Neural Image Enhancement wrapped for multiplatform by nodeJS
 
 * Current Reality: 
 */
var container_tag = "docker.io/guillaumeai/ne";
var mount_in = "/ne/input";
var mount_out = "/out";

//@STCGoal  what comes next is up for GIA-NE
//@STCSTatus A copy of GIS-CSM

var path = require('path');
const { exit } = require('process');
var resolve = path.resolve;

var tlid = require('tlid');
var nowtlid = tlid.get();
var containerName = `gia-ne__${nowtlid}`;

var os = process.platform;

// var script_dir = path.dirname( process.argv[1]);
// var pVersion = require( path.join(script_dir,'package.json')).version;

console.log(`---------------------------------
GuillaumeAI Neural Enhancement for Images 
by Guillaume Descoteaux-Isabelle(2021)
---------------------------------
`);
// Version ${pVersion}

//process.exit(1);
var myArgs = process.argv.slice(2);

var target_file ="";
if (myArgs[0])target_file = myArgs[0].replace(".\\","");
else {
  console.log(`
  Must specify argument file and optionally zoom factor
  gia-ne [file] ([zoomFactor:2,4])
  gia-ne sample.jpg
  gia-ne sample.jpg 4
  `);
  exit(1);
}

var quieterMode = false;
//----ZOOM FACTOR
var zoomFactor = 2;
if (myArgs[1] && myArgs[1] == 4) zoomFactor= myArgs[1];
if (myArgs[1] && (myArgs[1] == "--quiet" || myArgs[2] == "--quiet" )) quieterMode = true;

var ne2xScript = "/ne/ne2x.sh";
var ne4xScript = "/ne/ne4x.sh";
var currentScript = ne2xScript;
if (zoomFactor == 4) 
  currentScript = ne4xScript;
consoleIfNOTQuieter("Zoom Factor: " + zoomFactor);

var target_file_name_only = path.basename(target_file);
var target_dir = path.dirname(target_file);
//console.log(target_dir);
//console.log(target_file);
//console.log(target_file_name_only);
//process.exit(0);

if (os == "win32") {
  //running context will use Powershell to run docker
  const Shell = require('node-powershell');

  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  ps.addCommand(`$in = \${PWD}.path;$out = Resolve-Path ${target_dir};echo "$in";"$out"`);

  ps.invoke()
    .then(output => {
      //console.log(output);

      make_docker_cmd(output);
    })
    .catch(err => {
      console.log(err);
    });
}
else {
  //we assume linux
  var cmd = require('node-cmd');

  //*nix supports multiline commands

  // cwd = cmd.runSync('echo "$(pwd)"');
  // outputting(cwd);
  cmd.run(
    `export indir=$(pwd);export outdir="$(realpath ${target_dir})";echo "$indir\n$outdir"`,
    function (err, data, stderr) {
      // console.log(data);
      make_docker_cmd(data);
    }
  );

}


function make_docker_cmd(output) {
  var arr = output.split("\n");
  var inPath = arr[0];
  var outPath = arr[1];

  var cmdToRun =
    `docker run -d -t --rm  --name  gia_ne ${containerName} ` +
    `-v ${inPath.trim()}:${mount_in} ` +
    `-v ${outPath.trim()}:${mount_out}  ` +
    `${container_tag}  ` +
    `${target_file_name_only} ` +
    `${zoomFactor}`;

    //console.log(cmdToRun);

  platform_run(cmdToRun);

}

function platform_run(cmdToRun) {
//exit(1);
consoleIfNOTQuieter(`
-----------------
Running: " + ${cmdToRun}
  on platform: " + ${os}
`);

  if (os == "win32") {
    //running context will use Powershell to run docker
    const Shell = require('node-powershell');

    const ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });

    ps.addCommand(cmdToRun);
    ps.invoke()
      .then(output => {
        console.log(output);
        console.log("--Win32 Issue:  You can press CTRL+C to break back to terminal at any time");

        console.log(`Process was launch is background successfully.`);
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    //we assume linux
    var cmd = require('node-cmd');

    cmd.run(
      cmdToRun,
      function (err, data, stderr) {
        if (err) console.log(err);
        else {
          console.log(data);
          console.log(`Process was launch is background successfully.`);

        }

      }
    );

  }

  consoleIfNOTQuieter(`---------------------------
  Container is working in background and will stop when done :)`);
  consoleIfNOTQuieter(` your result will be : ${target_file}
  ---------------------------------------`);
}



function consoleIfNOTQuieter(msg)
{
  if (!quieterMode)console.log(msg);
}