const request=require("request")
const cheerio = require('cheerio');
const express=require("express")
const app=express();

const port=process.env.PORT || 3000;


app.get("/",(req,res)=>{
    var finalArray=[];
    request('https://www.imdb.com/news/top', function (error, response, html) {
    if(error){
        console.error('error:', error); // Print the error if one occurred
    }
    //   console.log('body:', html); // Print the HTML for the Google homepage.
    handleData(html)
    });


    function handleData(html){
        let $=cheerio.load(html);
        const dataArray=$('.news-article__title');      //article title
        const dataArray1=$('.news-article__title>a');   //article page link
        const dataArray2=$('.ipl-inline-list__item.news-article__date');    //date
        const dataArray3=$('.ipl-inline-list__item.news-article__author');  //author
        const dataArray4=$('.news-article__image');     //url of image used
        // console.log(dataArray.length)
        //console.log(dataArray3.length)
        for(var i=0;i<dataArray.length;i++)
        {
            var dt=$(dataArray[i]).text().substring(6);
            var lnk=$(dataArray1[i]).attr('href');
            var subtitle=$(dataArray2[i]).text()+" "+$(dataArray3[i]).text();
            var imgurl=$(dataArray4[i]).attr('src');
            dt=dt.substring(0,dt.length-17);
            var obj={
                link:lnk,
                data:dt,
                subtitle:subtitle,
                imgurl:imgurl
            }
            finalArray.push(obj);
        }
        
        res.send(finalArray);
    }

})


app.listen(port,()=>{
    console.log("server is running on port 3000");
})