--ALIMENTANDO O BANCO DE DADOS

--Adicionando Usu�rios
INSERT INTO Usuarios (nome, email, telefone, cpf, tipo_usuario, senha_hash) 
VALUES 
('Jo�o Silva', 'joao@email.com', '11999999999', '12345678901', 'Profissional', 'senha123'),
('Felipe Martinelli', 'felipe@gmail.com', '11987654908', '76545653256', 'Profissional', 'senha789'),
('Maria Santos', 'maria@email.com', '11888888888', '98765432100', 'Cliente', 'senha456');
GO
SELECT * FROM Usuarios;


--Adicionando Servi�os
INSERT INTO Servicos (nome_servico, descricao, preco_base) 
VALUES 
('Reparo El�trico', 'Conserto de instala��es el�tricas', 150.00),
('Hidr�ulica', 'Conserto de encanamentos e vazamentos', 200.00);
GO
SELECT * FROM Servicos;


--Adicionando uma Ordem de Servi�o
INSERT INTO OrdensServico (id_cliente, id_profissional, id_servico, status, descricao) 
VALUES (9, 8, 1, 'Pendente', 'Reparo de fia��o no quarto.');
GO
select * from OrdensServico


--Adicionando uma Avalia��o
INSERT INTO Avaliacoes (id_ordem, id_cliente, nota, comentario) 
VALUES (4, 9, 5, '�timo atendimento! Servi�o excelente.');
GO
select * from Avaliacoes


--Adicionando um Pagamento
INSERT INTO Pagamentos (id_ordem, valor, metodo_pagamento) 
VALUES (4, 150.00, 'Pix');
GO
select * from Pagamentos



--TESTANDO AS CONSULTAS
SELECT * FROM OrdensServico WHERE status = 'Pendente';
SELECT * FROM Servicos;
--Mostrando o Nome do Profissional, Nota e o Comentario
SELECT U.nome AS Profissional, A.nota, A.comentario 
FROM Avaliacoes A
JOIN OrdensServico O ON A.id_ordem = O.id_ordem
JOIN Usuarios U ON O.id_profissional = U.id_usuario
WHERE O.id_profissional = 8;
