const dbConnect = require('./mongodb')  //to import mongodb
const express = require('express'); //import express
const app=express(); //create an instance of the express server
app.use(express.json()) 

//get
app.get('/',async(req,res) => {         //url and callback function- consist of two parameters requset and response
    try {
        let result = await dbConnect();
        result = await result.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});   

//insert 
app.post('/',async(req,res) => {         
    try {
        let result = await dbConnect();
        result = await result.insertOne(req.body);
        res.send('Data inserted successfully');
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
}); 

//modify
app.put('/:name',async(req,res) => {         
    try {
        let result = await dbConnect();
        result = await result.updateOne({name:req.params.name},{$set:req.body});
        res.send('Data updated successfully');
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

//delete
app.delete('/:name',async(req,res) => {         
    try {
        let result = await dbConnect();
        result = await result.deleteOne({name:req.params.name});
        res.send('Data deleted successfully');
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

app.listen(3459, () => {
    console.log('Server is running on port 3459');
});
