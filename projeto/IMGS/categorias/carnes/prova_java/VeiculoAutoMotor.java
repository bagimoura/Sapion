/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package aq3037282;

public abstract class VeiculoAutoMotor implements Frete{
    private String modelo;
    private String placa;
    private int ano;
    private Produto produto;

    public VeiculoAutoMotor(String modelo, String placa, int ano) {
        setModelo(modelo);
        setPlaca(placa);
        setAno(ano);
    }
    
    public String getModelo() {
        return modelo;
    }

    private void setModelo(String modelo) {
        if(modelo != null){
            this.modelo = modelo;
        }else{
            throw new IllegalArgumentException("Modelo não pode ser nulo.");
        }
    }

    public String getPlaca() {
        return placa;
    }

    private void setPlaca(String placa) {
        if(placa != null){
            this.placa = placa;
        }else{
            throw new IllegalArgumentException("Placa não pode ser nulo.");
        }
    }

    public int getAno() {
        return ano;
    }

    private void setAno(int ano) {
        if(ano > 0){
            this.ano = ano;
        }else{
            throw new IllegalArgumentException("Volume não pode ser menor ou igual a zero.");
        }   
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
    
    @Override 
    public String toString(){
        return "Modelo: " + getModelo();
    }
    @Override
    public boolean isFretavel(double distancia, Produto produto){
        if(produto.getVolume() <= 1.0 && produto.getPeso() <= 150.0 ){
            return true;
        }
        return false;
    }
}
