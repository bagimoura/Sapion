/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package aq3037282;

public class Caminhao extends VeiculoAutoMotor{

    public Caminhao(String modelo, String placa, int ano) {
        super(modelo, placa, ano);
    }
   
    @Override
    public String getDescricao(){
        return "Caminhão";
    }
    @Override
    public double getValorFrete(double distancia, Produto produto){
        if(isFretavel(distancia, produto)){
            return (distancia * 0.75) + (produto.getPeso() * 2.25) ;
        }
        return 0;
    }
}
