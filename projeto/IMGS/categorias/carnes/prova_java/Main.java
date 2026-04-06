/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package aq3037282;

public class Main {
    public static void main(String[] args) {
        Produto p = new Produto("Laranjas", 10.0, 0.10);
        
        System.out.println(p);
        
        Frete[] meio = new Frete[4];
        
        meio[0] = new Furgao("modelo1", "AHX", 2010);
        meio[1] = new Furgao("modelo2", "BGI", 2017);
        meio[2] = new Caminhao("modelo1", "HMV", 2023);
        meio[3] = new Bicicleta("Marcos");
        
        for(int i = 0; i < 4; i++){
            System.out.println(meio[i].getDescricao() +" "+ meio[i].getValorFrete(350.0, p));
        }
        
        
    }
    
}
