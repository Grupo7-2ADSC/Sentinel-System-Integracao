import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.rede.RedeInterface;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.github.britooo.looca.api.util.Conversor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class SistemaInfo {

    public static void main(String[] args) {

        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();
        Looca looca = new Looca();

        Timer timer = new Timer();

        Sistema sistema = looca.getSistema();

        Processador processador = looca.getProcessador();

        Memoria memoria = looca.getMemoria();

        DiscoGrupo grupoDisco = looca.getGrupoDeDiscos();

        ProcessoGrupo grupoProcesso = looca.getGrupoDeProcessos();

        Rede rede = looca.getRede();

        RedeInterfaceGroup grupoInterfaces = rede.getGrupoDeInterfaces();

        //COLETANDO DADOS DOS COMPONENTES DE HARDWARE DO SERVIDOR

        timer.schedule(new TimerTask() {
            public void run() {

                System.out.println("\nOBTENDO HOSTNAME DO SERVIDOR");

                String hostName = "";

                try {

                    InetAddress inetAddress = InetAddress.getLocalHost();

                    hostName = InetAddress.getLocalHost().getHostName();
                    System.out.println("HOSTNAME: " + hostName);


                } catch (UnknownHostException e) {
                    e.printStackTrace();
                    System.out.println("ERRO NA CAPTURA DO HOSTNAME");
                }

                //OBTENDO ID DO SERVIDOR A PARTIR DO HOSTNAME

                Integer id_servidor;

                //Pegando ID  do Servidor onde o IP for igual ao do Servidor Monitorado
                try {
                    id_servidor = con.queryForObject("SELECT id_servidor FROM Servidor WHERE host_name = ?", Integer.class, hostName);
                    System.out.println("\nID Servidor: " + id_servidor);
                } catch (Exception e) {
                    id_servidor = null;
                    System.out.println("ID do Servidor não encontrado: " + id_servidor);
                }


                System.out.println("\nCOLETANDO DADOS DOS COMPONENTES DO SERVIDOR");


                //COLETANDO E INSERINDO DADOS DE SISTEMA

                // Obtendo a data e hora da última inicialização do sistema
                LocalDateTime dataInicializacao = LocalDateTime.ofInstant(Instant.parse(sistema.getInicializado().toString()), ZoneId.systemDefault());

                // Obtendo apenas a parte da data
                LocalDate dataSemHora = dataInicializacao.toLocalDate();

               // Criando um formato de data para exibir apenas a data
                DateTimeFormatter formatoDataConsole = DateTimeFormatter.ofPattern("dd-MM-yyyy");

                // Criando um formato de data para guardarno banco
                DateTimeFormatter formatoDataBanco = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                String dataFormatadaBanco = dataSemHora.format(formatoDataBanco);

               // Formatando a data para exibir apenas a data no formato desejado
                String dataFormatadaConsole = dataSemHora.format(formatoDataConsole);

                System.out.println("\nSISTEMA");

                System.out.println("Data da última inicialização: " + dataFormatadaConsole);
                System.out.println("Tempo de Atividade: " + Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade()).replace("days", "dias"));


                con.update("INSERT INTO SistemaRegistro (data_inicializacao, tempo_atividade, fk_servidor) VALUES (?, ?, ?)",
                        dataFormatadaBanco, Conversor.formatarSegundosDecorridos(sistema.getTempoDeAtividade()).replace("days", "dias"), id_servidor);


                //COLETANDO E INSERINDO DADOS DE PROCESSADOR

                System.out.println("\nPROCESSADOR");
                System.out.println("Modelo: " + processador.getNome());
                System.out.println("Uso Processador: " + String.format("%.1f", processador.getUso()));

                con.update("INSERT INTO CpuRegistro (modelo, utilizacao, fk_servidor) VALUES (?, ?, ?)",
                        processador.getNome(), String.format("%.1f", processador.getUso()).replace("GiB", "").replace(",", "."), id_servidor);

                //COLETANDO E INSERINDO DADOS DE MEMORIA

                System.out.println("\nMEMORIA");
                System.out.println("Mémoria Total: " + Conversor.formatarBytes(memoria.getTotal()));
                System.out.println("Mémoria Em uso: " + Conversor.formatarBytes(memoria.getEmUso()));


                con.update("INSERT INTO MemoriaRegistro (quantidade_total, quantidade_em_uso, fk_servidor) VALUES (?, ?, ?)",
                        Conversor.formatarBytes(memoria.getTotal()).replace("GiB", "").replace("MiB", "").replace(",", "."), Conversor.formatarBytes(memoria.getEmUso()).replace("GiB", "").replace("MiB", "").replace(",", "."), id_servidor);


                //COLETANDO DADOS DE DISCO
                System.out.println("\nDISCOS");

                Integer quantidadeDeDiscos = grupoDisco.getQuantidadeDeDiscos();
                System.out.println("Quantidade de Discos: " + quantidadeDeDiscos);

                List<Volume> volumeDiscos = grupoDisco.getVolumes();

                for (Volume volume : volumeDiscos) {
                    System.out.println("Nome: " + volume.getNome());
                    System.out.println("Volume Total: " + Conversor.formatarBytes(volume.getTotal()));
                    System.out.println("Volume Disponível: " + Conversor.formatarBytes(volume.getDisponivel()));

                    // INSERINDO DADOS DE DISCO NO BANCO
                    con.update("INSERT INTO DiscoRegistro (nome, armazenamento_total, armazenamento_livre, fk_servidor) VALUES (?, ?, ?, ?)",
                            volume.getNome(), Conversor.formatarBytes(volume.getTotal()).replace("GiB", "").replace("MiB", "").replace("KiB", "").replace(",", "."), Conversor.formatarBytes(volume.getDisponivel()).replace("GiB", "").replace("MiB", "").replace(",", "."), id_servidor);
                }


                System.out.println("\nPROCESSOS");

                //5 PRINCIPAIS PROCESSOS COM USOCPU ACIMA DE 70%
                List<Processo> listaProcessos = grupoProcesso.getProcessos();

                // Ordena a lista de processos com base no uso de CPU, do maior para o menor
                listaProcessos.sort((p1, p2) -> Double.compare(p2.getUsoCpu(), p1.getUsoCpu()));

                // Pega os 5 primeiros processos com maior uso de CPU
                List<Processo> top5Processos = listaProcessos.subList(0, Math.min(5, listaProcessos.size()));

                for (Processo processo : top5Processos) {
                    if (processo.getUsoCpu() >= 70.0) {

                        System.out.println("PID: " + processo.getPid());
                        System.out.println("Nome:" + processo.getNome());
                        System.out.println("Uso de CPU: " + String.format("%.1f", processo.getUsoCpu()));
                        System.out.println("Uso de Mémoria: " + String.format("%.1f", processo.getUsoMemoria()));

                        // Aqui você faria a inserção no banco de dados
                        con.update("INSERT INTO ProcessoRegistro (pid, nome, uso_cpu, uso_memoria, fk_servidor) VALUES (?, ?, ?, ?, ?)",
                                processo.getPid(), processo.getNome(), String.format("%.1f", processo.getUsoCpu()).replace(",", "."), processo.getUsoMemoria(), id_servidor);
                    }
                }


                // COLETANDO E INSERINDO DADOS DA INTERFACE DE REDE

                System.out.println("\nREDE");

                List<RedeInterface> interfacesDeRede = grupoInterfaces.getInterfaces();

                for (RedeInterface redeInterface : interfacesDeRede) {

                    if (!redeInterface.getEnderecoIpv4().isEmpty() && redeInterface.getPacotesEnviados() != 0 && redeInterface.getPacotesRecebidos() != 0) {

                        System.out.println("Nome de Exibição: " + redeInterface.getNomeExibicao());
                        System.out.println("Endereço IPv4: " + redeInterface.getEnderecoIpv4());
                        System.out.println("Endereço IPv6: " + redeInterface.getEnderecoIpv6());
                        System.out.println("Bytes Recebidos: " + Conversor.formatarBytes(redeInterface.getBytesRecebidos()));
                        System.out.println("Bytes Enviados: " + Conversor.formatarBytes(redeInterface.getBytesEnviados()));
                        System.out.println("Pacotes Recebidos: " + redeInterface.getPacotesRecebidos());
                        System.out.println("Pacotes Enviados: " + redeInterface.getPacotesEnviados());


                        con.update("INSERT INTO RedeRegistro (nome, endereco_ipv4, endereco_ipv6, bytes_recebidos, bytes_enviados, pacotes_recebidos, pacotes_enviados, fk_servidor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                                redeInterface.getNomeExibicao(), redeInterface.getEnderecoIpv4().toString().replaceAll("\\[|\\]", ""),
                                redeInterface.getEnderecoIpv6().toString().replaceAll("\\[|\\]", ""),
                                Conversor.formatarBytes(redeInterface.getBytesRecebidos()).replace("MiB", "").replace(",", ".").replace("GiB","").replace("KiB", ""), Conversor.formatarBytes(redeInterface.getBytesRecebidos()).replace("MiB", "").replace(",", ".").replace("GiB","").replace("KiB", ""), redeInterface.getPacotesRecebidos(),
                                redeInterface.getPacotesEnviados(), id_servidor);
                    }
                }

            }
        }, 1, 30000);


    }
}