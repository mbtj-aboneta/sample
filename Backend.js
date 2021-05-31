var express = require('express');
var app = express();
var bp = require('body-parser');
app.use(bp.urlencoded({extended:true}));
var axios = require("axios");
var cheerio = require("cheerio");
var spawn = require("child_process").spawn;

app.use('/',express.static('./'));
function scraper(url){
	return new Promise((resolve,reject)=>{
	axios.get(url)
		.then(response=>{
			console.log("Got the html")
			return response.data
			})
		.then((data,err)=>{
			console.log("Filtering on cheerio")
			
			if (err) reject(err)
			var $ = cheerio.load(data)
			image_links = []
			$("img").each((holder,link)=>{
				if ($(link).hasClass('post_media_photo image')) {
					image_links.push($(link).attr("src"))
					}
				})
			resolve(image_links)
			});
	});
}
app.use("/download",(req,res)=>{
	if (req.query.downloading){
		console.log("Time to download")
		async function downloader(){
			let image_links = await scraper(req.query.link)
			console.log("Starting Python Downloader")
			var process = spawn("python3.7",["downloader.py",JSON.stringify(image_links)])
			process.stdout.on("data",(data)=>{
				console.log(data.toString())
				})
			process.stderr.on("data",(data)=>{
				console.log(data.toString())
				})
			}
		downloader()
		res.json({"text":"downloading na wait lang","link":req.query.link})
	}
});
app.use("/scraper",(req,res)=>{
	console.log(req.query.link)
	async function sender(url){ 
		let image_links = await scraper(url)
		console.log(image_links)
		res.json(image_links)
		return image_links
	}
	sender(req.query.link)
		});

app.use("/",(req,res)=>{
	res.sendFile(__dirname+"/Scrape_page.html")
	})
app.listen(3000, () => {
	console.log("Server up");
	});
