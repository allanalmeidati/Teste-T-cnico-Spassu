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
