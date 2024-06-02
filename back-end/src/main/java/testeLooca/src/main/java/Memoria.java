package testeLooca.src.main.java;

import com.sun.jna.platform.linux.Mman;

public class Memoria {
    private String emUso;
    private String disponivel;
    private String memorialTotal;

    public Memoria(){};
    public Memoria(String emUso, String disponivel, String memorialTotal) {
        this.emUso = emUso;
        this.disponivel = disponivel;
        this.memorialTotal = memorialTotal;
    }

    public String getEmUso() {
        return emUso;
    }

    public void setEmUso(String emUso) {
        this.emUso = emUso;
    }

    public String getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(String disponivel) {
        this.disponivel = disponivel;
    }

    public String getMemorialTotal() {
        return memorialTotal;
    }

    public void setMemorialTotal(String memorialTotal) {
        this.memorialTotal = memorialTotal;
    }

    public String toString(){
        return "\nMemoria{" +
                "emUso=" + emUso +
                ", disponivel='" + disponivel + '\'' +
                ", memorialTotal=" + memorialTotal +
                "}";
    }
}
