package net.codejava;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.WebMethod;
import javax.jws.WebParam;

@WebService(serviceName = "Calculadora", targetNamespace = "http://servicios/")
@SOAPBinding(style = SOAPBinding.Style.RPC)
public class CalculadoraClass implements ICalculadora {

    @WebMethod(operationName = "sumar")
    public int sumar(@WebParam(name = "a") int a, @WebParam(name = "b") int b) {
        return a + b;
    }

    @WebMethod(operationName = "restar")
    public int restar(@WebParam(name = "a") int a, @WebParam(name = "b") int b) {
        return a - b;
    }

    @WebMethod(operationName = "multiplicar")
    public int multiplicar(@WebParam(name = "a") int a, @WebParam(name = "b") int b) {
        return a * b;
    }

    @WebMethod(operationName = "dividir")
    public int dividir(@WebParam(name = "a") int a, @WebParam(name = "b") int b) {
        return a / b;
    }
}

