const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Veritabanı bağlantı modülü

router.post('/create',async(req,res)=>{
    const {name,message,userId}=req.body;

    if(!message){
        return 
    }
})