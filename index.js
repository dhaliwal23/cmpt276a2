const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool=new Pool({
  connectionString: process.env.DATABASE_URL
})


express()
  .use(express.json())
  .use(express.urlencoded({extended:false}))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/adduser', (request,response) => {
    const {uid, fname,age} = request.body;
    pool.query('INSERT INTO usr (uid,fname,age) VALUES ($1, $2, $3)',[uid,fname,age],(error,results) =>{
      if (error){
        throw error;
      }
      response.status(201).send('User Added');
    })
  })

  .post('/q',(request,response) => {
    const {uid}=request.body;
    pool.query('DELETE FROM usr WHERE uid=$1',[uid],(error,results) =>{
      if (error){
        throw error;
      }
      response.status(201).send('DELETED SUCCESSFULLY');
    })
  })
  .post('/p',(request,response) =>{
    const {uid, fname,age} = request.body;
    pool.query('UPDATE usr SET fname=$1, age=$2 WHERE uid=$3',[fname,age,uid], (error,results) => {
      if (error)
      {
        throw error;
      }
      response.status(200).send("Changed");
    })
  })


   .get('/addusers',(req,res) => {
    var t='SELECT * FROM usr';
    pool.query(t, (error,result) => {
      if (error){
        throw error;
      }
      var results={'rows':result.rows}
      res.render('pages/db',results);
    })
   })
 
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
