/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package aq3037282;

public class Produto {
    private String nome;
    private double peso;
    private double volume;

    public Produto(String nome, double peso, double volume) {
        setNome(nome);
        setPeso(peso);
        setVolume(volume);
    }

    public String getNome() {
        return nome;
    }

    private void setNome(String nome) {
        if(nome != null){
            this.nome = nome;
        }else{
            throw new IllegalArgumentException("Nome não pode ser nulo.");
        }
        
    }

    public double getPeso() {
        return peso;
    }

    private void setPeso(double peso) {
        if(peso > 0){
            this.peso = peso;
        }else{
            throw new IllegalArgumentException("Peso não pode ser menor ou igual a zero.");
        }
    }

    public double getVolume() {
        return volume;
    }

    private void setVolume(double volume) {
        if(volume > 0){
            this.volume = volume;
        }else{
            throw new IllegalArgumentException("Volume não pode ser menor ou igual a zero.");
        }
        
    }
    
    @Override 
    public String toString(){
        return "Nome: " + getNome();
    }
    
    
}
