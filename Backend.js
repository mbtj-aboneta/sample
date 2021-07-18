var express = require('express');
var app = express();
var bp = require('body-parser');
var cheerio = require("cheerio")
app.use(bp.urlencoded({extended:true}));

var scraper = require('./scraper')
var downloader = require('./callDownloader')

app.use('/',express.static('./'));

app.use("/download",async (req,res)=>{
	if (req.query.downloading){
		console.log("Downloading Images")
		let image_links = await scraper(req.query.link)
		downloader(image_links)
		res.json({"text":"downloading na wait lang","link":req.query.link})
	}
});

app.use("/scraper",async (req,res)=>{
	console.log(req.query.link)
	let url = req.query.link
	let image_links = await scraper(url)
	console.log(image_links)
	res.json(image_links)
	return image_links
	})

app.use("/",(req,res)=>{
	res.sendFile(__dirname+"/Scrape_page.html")
	})
app.listen(3000, () => {
	console.log("Server up");
	});
