const {sql} =require ('../config/db.js');


    
async function filterService(req,res) {
    try{
        const{servicoId} = req.params;

        const result = await sql.query`
        SELECT p.id,p.nome,p.profissao,p.descricao,p.contato
        FROM Profissionais p 
        JOIn Servicos s ON p.id = Profissional_id
        WHERE s.id = ${servicoId}`;

        res.json (result.recordset);
    }catch(err){
        console.error('Erro ao buscar Profissionais',err);
        res,status(500).json ({error: 'Erro interno no servidor'})

    }
}
async function filterAvaliation(req,res) {
    try{
        const result = await sql.query`
        SELECT p.id, p.nome, p.profissao, AVG(a.nota) AS media_avaliacao, 
           STRING_AGG(a.comentario, ', ') AS comentarios
    FROM Profissionais p
    JOIN Avaliacoes a ON p.id = a.profissional_id
    WHERE a.nota >= 4
    GROUP BY p.id, p.nome, p.profissao
    ORDER BY 3 DESC`;

    } catch(err){
        console.error('Erro ao buscar profissionais',err);
        res.status(500).json({error:'Erro interno no servidor'})
    }

    module.exports={filterAvaliation,filterService}

    
    
}
