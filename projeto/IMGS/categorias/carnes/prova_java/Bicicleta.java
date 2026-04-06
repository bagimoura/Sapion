/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package aq3037282;

public class Bicicleta implements Frete {
    private String entregador;
    private Produto produto;

    public Bicicleta(String entregador) {
        setEntregador(entregador);
    }
    
    public String getEntregador() {
        return entregador;
    }

    private void setEntregador(String entregador) {
        this.entregador = entregador;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
    
    @Override 
    public String toString(){
        return "Entregador: " + getEntregador();
    }
    
    @Override
    public String getDescricao(){
        return "Bicicleta";
    }
    
    @Override
    public boolean isFretavel(double distancia, Produto produto) {
        if(distancia < 15.0 && produto.getPeso() <= 1.5 && produto.getVolume() <= 0.05){
            return true;
        }
        return false;
    }
    
    @Override
    public double getValorFrete(double distancia, Produto produto){
        if(isFretavel(distancia, produto)){
            return (distancia * 0.25) + (produto.getPeso() * 1.55) ;
        }
        return 0;
    }

   

    
    
}
