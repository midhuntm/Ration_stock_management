const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());
app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

const c = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Midhun8940@",
    database :"project"
});

c.connect(function(err)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Database Connected");
    }
});

app.post('/Login',(req,res)=>
{
    let username = req.body.username;
    let password = req.body.password;
    
    let sql = 'select * from userdet1 where username=?';

    c.query(sql,[username],(err,result)=>
    {
        if(result.length > 0)
        {
            let username1 = result[0].username;
            let password1 = result[0].password;
            let id = result[0].id;
            if(username1 == username && password1 == password)
            {
                let s = {status : id};
                res.send(s);
            }
            else
            {
                let s = {status : "error"};
                res.send(s);
            }
        }
        else
        {
            let s = {status : "error"};
            res.send(s);
        }
    })
})
app.post('/Supplier',(req,res)=>{
    // let name = req.body.sname;
    // let email = req.body.semail;
    // let phone = req.body.sphone;
    // let password = req.body.spassword;
   let supp_name = req.body.ssupp_name;
   let supp_city = req.body.ssupp_city;
   let supp_address = req.body.ssupp_address;
    let sql = 'insert into supplier(supp_name,supp_city,supp_address,status)values(?,?,?,?)';

    c.query(sql,[supp_name,supp_city,supp_address,0],(err,result)=>{
        if(err){
            let s = {"status":"error"};
            res.send(s);
        }
        else{
            let s = {"status":"Created"};
            res.send(s);
        }
    });

});

app.listen(3004);