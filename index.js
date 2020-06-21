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
    const {name, size,height,type,hair_color,eye_color} = request.body;
    pool.query('INSERT INTO Person (name,size,height,type,hair_color,eye_color) VALUES ($1, $2, $3, $4, $5, $6)',[name,size,height,type,hair_color,eye_color],(error,results) =>{
      if (error){
        throw error;
      }
      response.status(201).send('Person Added Successfully. Please go back to Home Page to see People');
    })
  })

  .post('/deleteuser',(request,response) => {
    const {name}=request.body;
    pool.query('DELETE FROM person WHERE name=$1',[name],(error,results) =>{
      if (error){
        throw error;
      }
      response.status(201).send('If name of person is valid, Person will be Deleted Successfully. Please go back to Home page');
    })
  })
  .post('/updateuser',(request,response) =>{
    const {name, size,height, type, hair_color, eye_color} = request.body;
    pool.query('UPDATE person SET size=$1, height=$2, type=$3, hair_color=$4, eye_color=$5 WHERE name=$6',[size,height,type,hair_color,eye_color,name], (error,results) => {
      if (error)
      {
        throw error;
      }
      response.status(200).send("If name of person is valid, Person will be updated Successfully. Please go back to Home page");
    })
  })

  

   .get('/Listpeople',(req,res) => {
    var t='SELECT * FROM person';
    pool.query(t, (error,result) => {
      if (error){
        throw error;
      }
      var results={'rows':result.rows}
      res.render('pages/db',results);
    })
   })


   
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
