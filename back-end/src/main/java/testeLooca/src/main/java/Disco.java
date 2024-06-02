package testeLooca.src.main.java;

public class Disco {
    public String totalDisco;
    public String qtdeDisco;
    public String qtdeVolumes;

    public Disco(){};
    public Disco(String totalDisco, String qtdeDisco, String qtdeVolumes) {
        this.totalDisco = totalDisco;
        this.qtdeDisco = qtdeDisco;
        this.qtdeVolumes = qtdeVolumes;
    }

    public String getTotalDisco() {
        return totalDisco;
    }

    public void setTotalDisco(String totalDisco) {
        this.totalDisco = totalDisco;
    }

    public String getQtdeDisco() {
        return qtdeDisco;
    }

    public void setQtdeDisco(String qtdeDisco) {
        this.qtdeDisco = qtdeDisco;
    }

    public String getQtdeVolumes() {
        return qtdeVolumes;
    }

    public void setQtdeVolumes(String qtdeVolumes) {
        this.qtdeVolumes = qtdeVolumes;
    }

    public String toString(){
        return "\nDisco{" +
                "totalDisco=" + totalDisco +
                ", qtdeDisco='" + qtdeDisco + '\'' +
                ", qtdeVolumes=" + qtdeVolumes +
                "}";
    }


}
