package testeLooca.src.main.java;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.util.Conversor;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Timer;
import java.util.TimerTask;

public class testeMemoria {
    public static void main(String[] args) {
        Timer timer = new Timer();
        Looca looca = new Looca();
        Memoria grupoDeMemoria = looca.getMemoria();
        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();


        con.execute("""
                CREATE TABLE IF NOT EXISTS testeMemoria (
                emUso varchar(100),
                disponivel varchar(100),
                memorialTotal varchar(100),
                hora_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )""");

        timer.schedule(new TimerTask() {
            public void run() {
                con.update("INSERT INTO testeMemoria (emUso,disponivel,memorialTotal) VALUES (?,?,?)",
                        Conversor.formatarBytes(grupoDeMemoria.getEmUso()), Conversor.formatarBytes(grupoDeMemoria.getDisponivel()), Conversor.formatarBytes(grupoDeMemoria.getTotal()));
            }
        }, 0, 100 * 1000);


        con.execute("""
                CREATE TABLE IF NOT EXISTS Disco (
                totalDisco varchar(50),
                qtdeDisco varchar(50),
                qtdeVolumes varchar(50),
                hora_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )""");

        timer.schedule(new TimerTask() {
            public void run() {
                con.update("INSERT INTO Disco (totalDisco,qtdeDisco,qtdeVolumes) VALUES (?,?,?)",
                        grupoDeDiscos.getTamanhoTotal(), grupoDeDiscos.getQuantidadeDeDiscos(), grupoDeDiscos.getQuantidadeDeVolumes());
            }
        }, 0, 100 * 1000);

    }
}
