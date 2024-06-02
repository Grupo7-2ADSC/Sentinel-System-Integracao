package testeLooca.src.main.java;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.servicos.Servico;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.util.Conversor;
import org.checkerframework.framework.qual.DefaultQualifier;

import java.util.ArrayList;
import java.util.List;

public class main {
    public static void main(String[] args) {
        Looca looca = new Looca();

        Sistema sistema = looca.getSistema();
        System.out.println(sistema);


//Criação do gerenciador
        DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
        ServicoGrupo grupoDeServicos = looca.getGrupoDeServicos();
        Memoria grupoDeMemoria = looca.getMemoria();



//Obtendo lista de discos a partir do getter
       List<Disco> discos = grupoDeDiscos.getDiscos();
        for (Disco disco : discos) {
           System.out.println(disco);
        }


        System.out.println("Status memória " + grupoDeMemoria);

        System.out.println(grupoDeMemoria.getEmUso());
        System.out.println(grupoDeMemoria.getDisponivel());


//        List<Servico> servicos = grupoDeServicos.getServicosAtivos();
//        for (Servico servico : servicos){
//            System.out.println(servico);
//        }
    }
    }

