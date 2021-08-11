

/* requiring express */

import pkg from "express";
const app = pkg();

/* This is use to load css which is inside the public folder */
app.use(pkg.static("public"));

/* setting ejs */

app.set("view engine","ejs");

/* requiring __dirname */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* declaring the __dirname */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* requiring Body Parser npm package */
import pkg1 from "body-parser";
const bodyParser = pkg1;

/* requiring the expression evaluation npm package */ 
import {Parser} from "expr-eval";
const parser = new Parser();

/* using bodyParser */
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
   
    const parser = new Parser();
    let expr = parser.parse(req.body.expression);
    let expr2 = expr;
    let expr3  = expr;
    let expr4 = expr;
    let xInitial = Number(req.body.x0);
    let yInitial = Number(req.body.y0);
    let stepHeight = Number(req.body.h);
    let xFinal = Number(req.body.xn);

    const N = (xFinal-xInitial)/stepHeight;

    
    for(let a=0;a<N;a++){

    let value = expr.evaluate({x:xInitial,y:yInitial});
    let k1 = stepHeight*value;
    console.log("k1="+k1);

    let newX = xInitial+(stepHeight/2);
    let newY = yInitial+ (k1/2);
    value = expr2.evaluate({x:newX,y:newY});
    let k2 = stepHeight*value;
    console.log("k2="+k2);

    newY = yInitial + (k2/2);
    value = expr3.evaluate({x:newX,y:newY});
    let k3 = stepHeight*value;
    console.log("k3="+k3);

    newX = xInitial + stepHeight;
    newY = yInitial + k3;
    value = expr4.evaluate({x:newX,y:newY});
    let k4 = stepHeight*value;
    console.log("k4="+k4);

    let k=(k1+(2*k2)+(2*k3)+k4)/6;
    yInitial=yInitial+k;
    xInitial=xInitial+(stepHeight);
        
    }

    res.render("index",{solution:String(yInitial),
                        xFinal:String(xFinal),
                        expr:req.body.expression,
                        xInitial:req.body.x0,
                        yInitial:req.body.y0,
                        xFinal:req.body.xn,
                        stepHeight:req.body.h});
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
})