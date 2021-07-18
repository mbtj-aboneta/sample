var axios = require("axios")
var cheerio = require("cheerio")

module.exports = (imageAttributes=>{
    new Promise((resolve,reject)=>{
        console.log("Grouping attributes")
        groupings = {}
        for (const image of imageAttributes){
            for (const key of Object.keys(image)){
                if (groupings[key]){
                    groupings[key].push(image[key])
                } else {
                    groupings[key]=[image[key]]
                }
            }
            }
        return(groupings)
        })
        .then((data,err)=>{
            if (err) reject(err)
            console.log("Comparing attributes")
            for (const attribute of Object.keys(data)){
                if (attribute==='src') continue
                if (data[attribute].length != data['src'].length) continue

                const propCounter = {}
                const attributeList = data[attribute]

                for (const prop of attributeList){
                    if (!(prop in propCounter)){
                        propCounter[prop] = 1
                        console.log(propCounter)
                    } else {
                        propCounter[prop] += 1
                        console.log(propCounter)
                    }
                }
                console.log(propCounter)

                const totalItems = data[attribute].length
                console.log(totalItems)
                let maxRatio = 0
                let majorityProp = ''
                for (const prop of Object.keys(propCounter)){
                    const count = propCounter[prop]
                    currentRatio = count / totalItems
                    console.log("prop count: "+count+"property: "+prop)
                    if (currentRatio>maxRatio){
                        maxRatio = currentRatio
                        majorityProp = prop
                        console.log("Current Ratio: "+currentRatio+",Max Ratio: "+maxRatio+",Current Majority Prop "+majorityProp) 
                    }
                }
            console.log("Attribute: "+attribute+", Majority Prop: "+majorityProp)
            }
        
            resolve([attribute,majorityProp])
        })
    })
