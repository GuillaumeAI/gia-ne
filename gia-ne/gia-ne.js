#!/usr/bin/env node

/** Guillaume Isabelle, 2021 (GIA-NE)
 * Vision: A containerized Neural Image Enhancement wrapped for multiplatform by nodeJS
 
 * Current Reality: 
 */
var container_tag = "guillaumeai/ne:210419";
var mount_in = "/ne/input";
var mount_out = "/out";

//@STCGoal  what comes next is up for GIA-NE
//@STCSTatus A copy of GIS-CSM
console.log("This programm will receive one argument and enhance the image or the whole folder if that is a folder.");


var os = process.platform;

var myArgs = process.argv.slice(2);

var target_file = myArgs[0];


//----ZOOM FACTOR
var zoomFactor = 2;
if (myArgs[1]) zoomFactor= myArgs[1];
var ne2xScript = "/ne/ne2x.sh";
var ne4xScript = "/ne/ne4x.sh";
var currentScript = ne2xScript;
if (zoomFactor == 4) 
  currentScript = ne4xScript;
console.log("Zoom Factor: " + zoomFactor);

var path = require('path');
const { exit } = require('process');
var resolve = path.resolve;
var target_file_name_only = path.basename(target_file);
var target_dir = path.dirname(target_file);
console.log(target_dir);
console.log(target_file);
console.log(target_file_name_only);
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
    `docker run -d -t --rm ` +
    `-v ${inPath.trim()}:${mount_in} ` +
    `-v ${outPath.trim()}:${mount_out}  ` +
    `${container_tag}  ` +
    `${target_file_name_only}`;

    console.log(cmdToRun);

  platform_run(cmdToRun);

}

function platform_run(cmdToRun) {
exit(1);
  console.log("Running: " + cmdToRun);
  console.log("  on platform: " + os);

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
        console.log(data);

      }
    );

  }

  console.log(`---------------------------
  Container is working in background and will stop when done :)`);
  console.log(` your result will be : ${target_file}
  ---------------------------------------`);
}