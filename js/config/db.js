const sql =require ('mysql');

const dbConfig ={
    user :'',
    password:'',
    server:'',
    database:'',
    trustServerCertificate:true,
};
async function connectDB(){
    try{
        await sql.connect (dbConfig);
    }catch(err){
        console.error('Erro ao conectar o banco de dados:',err)
    }
}
module.exports={connectDB,sql}