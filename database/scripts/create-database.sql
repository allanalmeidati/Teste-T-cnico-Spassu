CREATE DATABASE IF NOT EXISTS book;

USE book;

CREATE TABLE IF NOT EXISTS Livro (
                                     CodL INT PRIMARY KEY AUTO_INCREMENT,
                                     Titulo VARCHAR(40),
    Editora VARCHAR(40),
    Edicao INT,
    AnoPublicacao VARCHAR(4),
    Valor FLOAT
    );

CREATE TABLE IF NOT EXISTS Autor (
                                     CodAu INT PRIMARY KEY AUTO_INCREMENT,
                                     Nome VARCHAR(40)
    );

CREATE TABLE IF NOT EXISTS Livro_Autor (
                                           Livro_CodL INT,
                                           Autor_CodAu INT,
                                           PRIMARY KEY (Livro_CodL, Autor_CodAu),
    FOREIGN KEY (Livro_CodL) REFERENCES Livro(CodL),
    FOREIGN KEY (Autor_CodAu) REFERENCES Autor(CodAu)
    );

CREATE TABLE IF NOT EXISTS Assunto (
                                       CodAs INT PRIMARY KEY AUTO_INCREMENT,
                                       Descricao VARCHAR(20)
    );

CREATE TABLE IF NOT EXISTS Livro_Assunto (
                                             Livro_CodL INT,
                                             Assunto_CodAs INT,
                                             PRIMARY KEY (Livro_CodL, Assunto_CodAs),
    FOREIGN KEY (Livro_CodL) REFERENCES Livro(CodL),
    FOREIGN KEY (Assunto_CodAs) REFERENCES Assunto(CodAs)
    );


INSERT INTO book.Assunto (Descricao) VALUES ('Ciencia-Ficcao');
INSERT INTO book.Assunto (Descricao) VALUES ('Historia Antiga');
INSERT INTO book.Assunto (Descricao) VALUES ('Misterio');
INSERT INTO book.Assunto (Descricao) VALUES ('Autoajuda');
INSERT INTO book.Assunto (Descricao) VALUES ('Fantasia');
INSERT INTO book.Assunto (Descricao) VALUES ('Viagens no Tempo');
INSERT INTO book.Assunto (Descricao) VALUES ('Biografia');



INSERT INTO book.Autor (Nome) VALUES ('J.K. Rowling');
INSERT INTO book.Autor (Nome) VALUES ('George Orwell');
INSERT INTO book.Autor (Nome) VALUES ('Jane Austen');
INSERT INTO book.Autor (Nome) VALUES ('Haruki Murakami');
INSERT INTO book.Autor (Nome) VALUES ('Agatha Christie');


CREATE OR REPLACE VIEW ViewLivro AS
SELECT
    Livro.CodL,
    Livro.Titulo,
    Livro.Editora,
    Livro.Edicao,
    Livro.AnoPublicacao,
    Livro.Valor,
    GROUP_CONCAT(Autor.Nome) AS Autores,
    GROUP_CONCAT(Assunto.Descricao) AS Assuntos
FROM Livro
         LEFT JOIN Livro_Autor ON Livro.CodL = Livro_Autor.Livro_CodL
         LEFT JOIN Autor ON Livro_Autor.Autor_CodAu = Autor.CodAu
         LEFT JOIN Livro_Assunto ON Livro.CodL = Livro_Assunto.Livro_CodL
         LEFT JOIN Assunto ON Livro_Assunto.Assunto_CodAs = Assunto.CodAs
GROUP BY Livro.CodL;
