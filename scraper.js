var axios = require("axios")
var cheerio = require("cheerio")
//const comparator = require("./comparator.js")
var comparator =require('./testing_scripts/comparator.js')

module.exports = async function scraper(url){
	return new Promise((resolve,reject)=>{
	axios.get(url)
		.then(response=>{
			console.log("Got the html")
			return response.data
			})
		.then((data,err)=>{
			console.log("Filtering on cheerio")
			
			if (err) reject(err)
			const imageAttributes = new Promise((resolve,reject)=>{
				const arrayHolder = []
				var $ = async()=>{await cheerio.load(data)}
				console.log($)
				$("img").each((indexHolder,link)=>{
				arrayHolder.push(link.attribs)
				})
				resolve(arrayHolder)
			})
			return imageAttributes
		})
		.then((data,err)=>{
			if (err) reject(err)
            console.log("Filtering for imporant images")
			return(async()=>{await comparator(data)})
		}).then((data,err)=>{
			if (err) reject(err)

			attributeFilter = data[0]
			propertyFilter = data[1]
			image_links = []
			$("img").each((holder,link)=>{
				if ($(link).attr(attributeFilter) === propertyFilter){
					image_links.push($(link).attr("src"))
					}
				})
			console.log(image_links)
			resolve(image_links)
			})
	});
}