var spawn = require("child_process").spawn;

module.exports = async function downloader(image_links){
    console.log("Starting Python Downloader")
    var process = spawn("python3.7",["downloader.py",JSON.stringify(image_links)])
    process.stdout.on("data",(data)=>{
        console.log(data.toString())
        })
    process.stderr.on("data",(data)=>{
        console.log(data.toString())
        })
    }