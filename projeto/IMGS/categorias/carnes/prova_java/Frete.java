/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package aq3037282;

public interface Frete {
    String getDescricao();
    boolean isFretavel(double distancia, Produto produto);
    double getValorFrete(double distancia, Produto produto);
}
