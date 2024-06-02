import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ModelLog {
    static Scanner scanner = new Scanner(System.in);
    static List<Usuario> usuariosRegistrados = new ArrayList<>();



    public void lerUserSenha() {
        System.out.println("""
                Qual função deseja realizar
                
                1 - Cadastro
                2 - Login
                3 - Nada""");
        int escolha = scanner.nextInt();
        scanner.nextLine(); // Limpar o buffer do scanner para pegar o número da ação

        switch (escolha) {
            case 1:
                cadastro();
                break;
            case 2:
                login();
                break;
            case 3:
                System.out.println("Operação cancelada.");
                break;
            default:

                System.out.println("Opção inválida.");
                break;
        }
    }

    public void cadastro() {
        System.out.println("Cadastro de Usuário");
        System.out.print("Digite o nome de usuário: ");
        String nomeUsuario = scanner.nextLine();

        System.out.print("Digite a senha: ");
        String senha = scanner.nextLine();

        Usuario novoUsuario = new Usuario(nomeUsuario, senha);
        usuariosRegistrados.add(novoUsuario);

        System.out.println("Usuário cadastrado com sucesso!");
        System.out.println("Nome de usuário: " + nomeUsuario);
        System.out.println("Senha: " + senha);

        // Voltar para o menu após o cadastro
        lerUserSenha();
    }

    public void login() {
        System.out.println("Login de Usuário");
        System.out.print("Digite o nome de usuário: ");
        String nomeUsuario = scanner.nextLine();

        System.out.print("Digite a senha: ");
        String senha = scanner.nextLine();

        boolean usuarioValido = false;
        for (Usuario usuario : usuariosRegistrados) {
            if (usuario.getNomeUsuario().equals(nomeUsuario) && usuario.getSenha().equals(senha)) {
                usuarioValido = true;
                break;
            }
        }

        if (usuarioValido) {
            System.out.println("Login realizado com sucesso!");

        } else {
            System.out.println("Usuário ou senha incorretos. \n Tente novamente ");
            lerUserSenha();
        }


    }

    static class Usuario {
        private String nomeUsuario;
        private String senha;

        public Usuario(String nomeUsuario, String senha) {
            this.nomeUsuario = nomeUsuario;
            this.senha = senha;
        }

        public String getNomeUsuario() {
            return nomeUsuario;
        }

        public String getSenha() {
            return senha;
        }
    }
}