DROP DATABASE IF EXISTS sentinel_system;

CREATE DATABASE IF NOT EXISTS sentinel_system;

USE sentinel_system;

-- TABELAS

-- EMPRESA

CREATE TABLE Empresa (
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(16) NOT NULL UNIQUE,
nome VARCHAR(45) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ACESSO

CREATE TABLE TipoAcesso (
id_tipo_acesso INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(45) NOT NULL
);

-- USUÁRIO

CREATE TABLE Usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email  VARCHAR(200)  NOT NULL UNIQUE,
senha CHAR(8) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_tipo_acesso INT NOT NULL, 
CONSTRAINT fk_tipo_acesso FOREIGN KEY (fk_tipo_acesso) 
	REFERENCES TipoAcesso (id_tipo_acesso),
fk_empresa INT NOT NULL, 
CONSTRAINT fk_empresa_Usuario FOREIGN KEY (fk_empresa) 
	REFERENCES Empresa (id_empresa) ON DELETE CASCADE
);

-- TIPO COMPONENTE
CREATE TABLE TipoComponente (
id_tipo_componente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipo VARCHAR(45) NOT NULL
);

-- CONFIGURAÇÃO DE ALERTAS

CREATE TABLE ConfiguracaoAlerta (
id_configuracao INT PRIMARY KEY AUTO_INCREMENT,
parametro_min DECIMAL(5,2) NOT NULL,
parametro_max DECIMAL(5,2) NOT NULL,
fk_tipo_componente INT NOT NULL,
CONSTRAINT fk_tipo_componente_configuracao FOREIGN KEY (fk_tipo_componente)
	REFERENCES TipoComponente (id_tipo_componente),
fk_empresa INT NOT NULL,
CONSTRAINT fk_empresa_configuracao FOREIGN KEY (fk_empresa)
	REFERENCES Empresa (id_empresa) ON DELETE CASCADE
);

-- SERVIDOR

CREATE TABLE Servidor (
id_servidor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
host_name VARCHAR(45) NOT NULL,
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
fk_empresa INT NOT NULL, 
CONSTRAINT fk_empresa_servidor FOREIGN KEY (fk_empresa) 
	REFERENCES Empresa (id_empresa) ON DELETE CASCADE
);

CREATE TABLE Componente (
id_componente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(60),
total_gib DECIMAL(10,2),
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_tipo_componente INT NOT NULL,
CONSTRAINT fk_tipo_componente FOREIGN KEY (fk_tipo_componente)
	REFERENCES TipoComponente (id_tipo_componente),
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_componente FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

-- HISTÓRICO DE ALERTAS
CREATE TABLE Alerta (
id_alerta INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
registro DECIMAL(10,2) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_componente INT NOT NULL,
CONSTRAINT fk_componente_alerta FOREIGN KEY (fk_componente)
	REFERENCES Componente (id_componente) ON DELETE CASCADE
);

-- COMPONENTES E SISTEMA

CREATE TABLE SistemaOperacionalRegistro (
id_sistema INT PRIMARY KEY AUTO_INCREMENT,
data_inicializacao DATE NOT NULL,
tempo_atividade VARCHAR(50) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_sistema FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

CREATE TABLE Registro (
id_registro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
uso DECIMAL(10,2) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_componente INT NOT NULL,
CONSTRAINT fk_componente FOREIGN KEY (fk_componente)
	REFERENCES Componente (id_componente) ON DELETE CASCADE
);

CREATE TABLE ProcessoRegistro (
id_processo INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
pid INT NOT NULL,
nome VARCHAR(45) NOT NULL,
uso_cpu DECIMAL(10,2) NOT NULL,
uso_memoria DECIMAL (10,2) NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_servidor_processo FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

CREATE TABLE RedeRegistro (
id_rede INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
endereco_ipv4 VARCHAR(45) NOT NULL,
endereco_ipv6 VARCHAR(255) NOT NULL,
bytes_recebidos DECIMAL(10,2) NOT NULL,
bytes_enviados DECIMAL(10,2) NOT NULL,
pacotes_recebidos INT NOT NULL,
pacotes_enviados INT NOT NULL,
data_registro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fk_servidor INT NOT NULL,
CONSTRAINT fk_Servidor_rede FOREIGN KEY (fk_servidor)
	REFERENCES Servidor (id_servidor) ON DELETE CASCADE
);

-- INSERTS

INSERT INTO TipoAcesso (tipo) VALUES
	("Administrador"),
    ("Representante"),
    ("Analista de Infraestrutura"),
	("Usuário Padrão");
    
INSERT INTO TipoComponente (tipo) VALUES
	("CPU"),
    ("MEMORIA"),
    ("DISCO");
    
INSERT INTO Empresa (cnpj, nome) VALUES
	("123456789123456", "Sentinel System Solutions"),
	("789012345678912", "DHL");

/*INSERT INTO ConfiguracaoAlerta (parametro_min, parametro_max, fk_tipo_componente, fk_empresa) VALUES
	(60.0, 80.0, 1, 2),
    (40.0, 70.0, 2, 2),
    (100.0, 150.0, 3, 2);*/
    
INSERT INTO Usuario (nome, email, senha, fk_tipo_acesso, fk_empresa) VALUES
	("Emmily", "emmilyferreira@gmail.com", 6122829, 1, 1),
    ("Marcio", "marciosantana@gmail.com", 12345678, 3, 2),
	("Marcos", "marcos@gmail.com", 44533291, 4, 2);
    
INSERT INTO Servidor (nome, host_name, fk_empresa) VALUES
	("Servidor de Backup", "XPTO-45YDU", 2),
    ("Servidor de Email", "XPTU-76PDU", 2);

INSERT INTO Componente (nome, total_gib, fk_tipo_componente, fk_servidor) VALUES
	("Intel(R) Celeron(R) 6305 @ 1.80GHz", null, 1, 1),
    (null, 7.0 , 2, 1),
    ("/", 223.0, 3, 1),
	("Disco E (1)", 200.0, 3, 1),
    ("Disco F (2)", 150.0, 3, 1);

INSERT INTO Registro (uso, fk_componente) VALUES
	(90.0, 1),
    (80.0, 2),
    (90.0, 3),
	(105.0, 4),
    (85.0, 5);
    
insert into alerta (registro, fk_componente) values 
    (90.00, 1),
    (80.00, 2),
    (60.00, 3);
           
    
-- SELECTS

SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM TipoAcesso;
SELECT * FROM TipoComponente;
SELECT * FROM ConfiguracaoAlerta;
SELECT * FROM Alerta;
SELECT * FROM Servidor;
SELECT * FROM SistemaOperacionalRegistro;
SELECT * FROM ProcessoRegistro;
SELECT * FROM RedeRegistro;
SELECT * FROM Componente;
SELECT * FROM Registro;


