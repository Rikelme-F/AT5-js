function calcularINSS(valor) {
    if (valor <= 1500.99) {
        return valor * 0.075;
    } else if (valor <= 3000.99) {
        return valor * 0.09;
    } else if (valor <= 5000.99) {
        return valor * 0.12;
    } else {
        return valor * 0.14;
    }
}

function calcularIRPF(valor) {
    if (valor <= 1500.99) {
        return 0;
    } else if (valor <= 2000.99) {
        return valor * 0.075;
    } else if (valor <= 3000.99) {
        return valor * 0.15;
    } else if (valor <= 4000.99) {
        return valor * 0.225;
    } else {
        return valor * 0.275;
    }
}

function lerNomesHorasValor() {
    let prestadores = [];
    let continuar = true;
    let contador = 0;
    do {
        let prestador = {};
        contador++;
        let nome = prompt("Informe o Nome:");
        while (!isNaN(nome) || nome.split(" ").length < 3) {
            nome = prompt("Informe o Nome novamente:");
        }

        let PIS = prompt("Informe um número do PIS/PASEP (11 dígitos):");
        while (isNaN(PIS) || PIS.length !== 11) {
            PIS = prompt("Informe um número do PIS/PASEP (11 dígitos):");
        }

        let horas = prompt("Informe as horas trabalhadas:");
        while (isNaN(horas) || parseInt(horas) < 20 || parseInt(horas) > 199) {
            horas = prompt("Informe as horas novamente:");
        }

        let valor = prompt("Informe o Valor da hora:");
        while (isNaN(valor) || parseFloat(valor) < 20 || parseFloat(valor) > 500) {
            valor = prompt("Informe o Valor da hora novamente:");
        }

        let salarioBruto = parseFloat(valor) * parseInt(horas);
        let descontoINSS = calcularINSS(salarioBruto);
        let descontoIRPF = calcularIRPF(salarioBruto);
        let salarioLiquido = salarioBruto - descontoINSS - descontoIRPF;

        prestador["nome"] = nome;
        prestador["horas"] = parseInt(horas);
        prestador["valor"] = parseFloat(valor);
        prestador["PIS"] = PIS;
        prestador["salarioBruto"] = salarioBruto;
        prestador["descontoINSS"] = descontoINSS;
        prestador["descontoIRPF"] = descontoIRPF;
        prestador["salarioLiquido"] = salarioLiquido;

        prestadores.push(prestador);

        if (contador < 5)
            continuar = true;
        else if (contador >= 5 && contador < 50)
            continuar = confirm("Deseja continuar o cadastro?");
        else
            continuar = false;

    } while (continuar === true);

    return prestadores;
}

function exibirPrestadores(listaPrestadores) {
    let mensagem = "";
    for (let i = 0; i < listaPrestadores.length; i++) {
        let prest = listaPrestadores[i];
        mensagem += `
        Nome: ${prest["nome"]} <br/>
        Horas: ${prest["horas"]} <br/>
        Valor: R$ ${prest["valor"].toFixed(2)} <br/>
        PIS: ${prest["PIS"]} <br/>
        Salário Bruto: R$ ${prest["salarioBruto"].toFixed(2)} <br/>
        Desconto INSS: R$ ${prest["descontoINSS"].toFixed(2)} <br/>
        Desconto IRPF: R$ ${prest["descontoIRPF"].toFixed(2)} <br/>
        Salário Líquido: R$ ${prest["salarioLiquido"].toFixed(2)} <br/>
        <br/><br/>
        `;
    }
    document.write(mensagem);
}

let listaPrestadores = lerNomesHorasValor();
exibirPrestadores(listaPrestadores);

console.log(listaPrestadores);

