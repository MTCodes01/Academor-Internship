let module1 = require("express")
const app = module1()
app.use(module1.json())
const port = 1234
app.listen(port,()=>console.log("listening on port "+port))

const Batch1=[
    {Name:"Tom",Course:"Web_dev"},
    {Name:"Jerry",Course:"Adv Web_dev"}
]

const Batch2=[
    {Student:1,Subject:"Maths"},
    {Student:10,Subject:"English"}
]

const Batch3=[
    {Timing:"5-6"},
    {Timing:"6-7"}
]

app.get("/about",(req,res)=>{
    res.send("Welcome to the first API get request")
})
app.get("/Batch1",(req,res)=>{
    res.send(Batch1)
})
app.get("/Batch2",(req,res)=>{
    res.send(Batch2)
})
app.get("/Batch3",(req,res)=>{
    res.send(Batch3)
})