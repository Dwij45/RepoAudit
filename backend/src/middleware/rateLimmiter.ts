import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

const Limitter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 4, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

app.get('/api/', Limitter,(req,res)=>{
    console.log("Rate limit ");
    res.send("Rate limit ");
})
app.listen(3000,()=>{
    console.log("Server started on port 3000");
})