// Retira os espaços em branco no começo, no final e no meio
String.prototype.trim  = function() {return this.replace(/^\s+|\s+$/g,"");}
String.prototype.ltrim = function() {return this.replace(/^\s+/,"");}
String.prototype.rtrim = function() {return this.replace(/\s+$/,"");}
String.prototype.mtrim = function() {return this.replace(/\s/g, "");}

// Colocar todas as letras maiúsculas
function UpperCase(objeto)
{
	var objeto = objeto.toUpperCase();
	return objeto;
}
// Colocar todas as letras minúsculas
function LowerCase(objeto)
{
	var objeto = objeto.toLowerCase();
	return objeto;
}


//BLOQUEIO BACKSPACE
function blockBckSpc() {

	function click() {
	   if (event.button==2||event.button==3) {
	      oncontextmenu='return false';
	   }
	}
	
	function click2(e) {
	e = window.event;
	if (event.keyCode==8 &&( e.srcElement.type == undefined || e.srcElement.type == 'select-one' || e.srcElement.type == 'radio' || e.srcElement.readOnly == true)) {
	      event.returnValue = false;
	  }
	if (event.altKey==1) {event.returnValue = false;}
	}


	document.onmousedown = click;
	document.onkeydown = click2;

	document.oncontextmenu = new Function("return false;");

}

//BLOQUEIO TOOLBAR
function blockToolbar() {
	var myframe = GetAgentFrame(); 
	var something; 

	something = myframe.document.getElementById('WSA_LEFT_BAR_DIV'); 
	something.style.display = 'none'; 
	something = myframe.document.getElementById('Div_Onglet_Container'); 
	something.style.display = 'none';
}

//DESBLOQUEIO TOOLBAR
function unblockToolbar() {
	var myframe = GetAgentFrame(); 
	var something; 

	something = myframe.document.getElementById('WSA_LEFT_BAR_DIV'); 
	something.style.display = 'block'; 
	something = myframe.document.getElementById('Div_Onglet_Container'); 
	something.style.display = 'block';
}

// Função retorna a data atual no formado dd/mm/aaaa
function data_atual() {
	var data = new Date();

	var dia = data.getDate();
	var mes = data.getMonth() + 1;
	var ano = data.getFullYear();
	
	if ( dia < 10 )
		dia = "0" + dia;

	if ( mes < 10 )
		mes = "0" + mes;
		
	return dia + "/" + mes + "/" + ano;	
}

// Função retorna o horário atual no formado hh:mm:ss
function horario_atual() {
	var data = new Date();

	var hora = data.getHours();
	var minutos = data.getMinutes();
	var segundos = data.getSeconds();
	
	if ( hora < 10 )
		hora = "0" + hora;

	if ( minutos < 10 )
		minutos = "0" + minutos;

	if ( segundos < 10 )
		segundos = "0" + segundos;
		
	return hora + ":" + minutos + ":" +segundos;	
	
}

// Função retorna se o cpf está correto
function validacao_cpf(cpf) {
	if (cpf.length != 11 || cpf.trim() == "") {
		return false;
	} else if (cpf == 11111111111 || cpf == 22222222222 || cpf == 33333333333 || cpf == 44444444444 || cpf == 55555555555 || cpf == 66666666666 || cpf == 77777777777 || cpf == 88888888888 || cpf == 99999999999 || cpf == 00000000000) { 
		return false;
	} else {
		var soma; 
		var resto; 
		soma = 0; 

		for(i = 0; i < 9; i++){
		   soma += parseInt(cpf.charAt(i)) * (10 - i);
		}			
		
		resto = 11 - (soma % 11);

		if (resto == 10 || resto == 11){ 
			resto = 0; 
		}	


		if (resto != parseInt(cpf.charAt(9))){
			return false;
		} else {
			soma = 0; 

			for(i = 0; i < 10; i++){
				soma += parseInt(cpf.charAt(i)) * (11 - i);
				}				

			resto = 11 - (soma % 11);

	
			if (resto == 10 || resto == 11){ 
				resto = 0; 
			}	

			if (resto != parseInt(cpf.charAt(10))){
				return false;
			} else {
				return true;
			}
		}
	}
}

//Função retorna se o cnpj está correto
function validacao_cnpj(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

// funcao que valida se o numero de telefone é um numero valido
function validacao_telefone(telefone)
{
	if (!somente_numeros(telefone) || (telefone.length != 8 && telefone.length != 10 && telefone.length != 11) || telefone == 11111111111 || telefone == 22222222222 || telefone == 33333333333 || telefone == 44444444444 || telefone == 55555555555 ||  telefone == 66666666666 || telefone == 77777777777 || telefone == 88888888888 || telefone == 99999999999 || telefone == 00000000000)
	{
		return false;
	}
	else
	{
		return true;
	}
}

// funcao que valida se o numero de telefone celular é um numero valido
function validacao_celular(telefone)
{
	var validaTel = new RegExp(/^([0-9]{2})([9]{1})([0-9]{8})*$/);
	return validaTel.test(telefone);
}

//Valida email
function valida_email(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }else{
		return true;
	}
}

// Funcao para validar somente texto digitados
function somente_texto(campo) {
	var expressao = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
	if(expressao.exec(campo)){
		return true;
	} else {
		return false;
	}
}

function validacao_valor(valor) {
	var formato_valor = /^\d*(,)\d{2}$/; 
	if (formato_valor.exec(valor)) {
		return true;
	} else {
		return false;
	}
}

// Funcao para validar data (dd/mm/aaaa)
function validacao_data(valor) {
	var formato_valor = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/; 
	if (formato_valor.exec(valor)) {
		return true;
	} else {
		return false;
	}
}

// Funcao para validar somente numeros digitados
function somente_numeros(campo) {
 var expressao = new RegExp(/^\d*$/);
 return expressao.test(campo);
}

// Funcao para validar somente numeros com ponto flutuante separados por ','(virgula) ou '.'(ponto) com 2 casas decimais
function somente_numeros_float(campo) {
 var expressao = new RegExp(/^\d*\,\d{2}$|^\d*\.\d{2}$/);
 return expressao.test(campo);
}

function validacao_data_anterior(valor) {
	if (!validacao_data(valor))
		return false;
	else {
		var data_info = valor;
		data_info = data_info.split("/");
		if (data_info[0].substring(0,1) == "0") 
			data_info[0] = data_info[0].substring(1,2);
		if (data_info[1].toString().substring(0,1) == "0") 
			data_info[1] = data_info[1].substring(1,2);
		var data_info_modificada = new Date(parseInt(data_info[2]), parseInt(data_info[1])-1, parseInt(data_info[0]));
		
		var data_hoje = new Date();
		
		if (data_hoje < data_info_modificada)
			return false;
		else
			return true;	
			return true;	
		
	}
}

// Funcao para validar data do agendamento (Global ou Pessoal)
function validacao_data_agendamento(data_informada, dias_uteis, dia_util_inicio, dia_util_fim) {
	
	var data = data_atual();
	data = data.split("/");
	if (data[0].substring(0,1) == "0") 
		data[0] = data[0].substring(1,2);
	if (data[1].toString().substring(0,1)  == "0") 
		data[1] = data[1].substring(1,2);
	var data_atual_modificada = new Date(parseInt(data[2]), parseInt(data[1])-1, parseInt(data[0])); 
	
	var data_info = data_informada;
	data_info = data_info.split("/");
	if (data_info[0].substring(0,1) == "0") 
		data_info[0] = data_info[0].substring(1,2);
	if (data_info[1].toString().substring(0,1) == "0") 
		data_info[1] = data_info[1].substring(1,2);
	var data_info_modificada = new Date(parseInt(data_info[2]), parseInt(data_info[1])-1, parseInt(data_info[0])); 
	
	var data_final = new Date();
	dias_uteis = dias_uteis * 24;
	data_final.setHours(data_final.getHours() + dias_uteis);
	for(;;) {
		if (data_final.getDay() < dia_util_inicio || data_final.getDay() > dia_util_fim) {
			dias_uteis = dias_uteis + 24;			
			data_final.setHours(data_final.getHours() + dias_uteis);
		} else
			break;
	}
	var dia_final = data_final.getDate();
	var mes_final = data_final.getMonth() + 1;
	var ano_final = data_final.getFullYear();
	if (mes_final.toString().substring(0,1) == "0")
		mes_final = mes_final.substring(1, 2);
	dia_final = dia_final.toString();

	var data_final_modificada = new Date(parseInt(ano_final), parseInt(mes_final)-1, parseInt(dia_final)); 
	
	if (data_info_modificada.getDay() < dia_util_inicio || data_info_modificada.getDay() > dia_util_fim)
		return false;
	else if (data_info_modificada < data_atual_modificada || data_info_modificada > data_final_modificada)
		return false;
	else
		return true;
	
}

// Funcao para validar horario do agendamento (Global ou Pessoal)
function validacao_horario_agendamento(data_informada,horario_informado, dia_semana_inicio, dia_semana_fim, horario_util_inicio, horario_util_fim) {

	var data_info = data_informada;
	data_info = data_info.split("/");
	if (data_info[0].substring(0,1) == "0") 
		data_info[0] = data_info[0].substring(1,2);
	if (data_info[1].toString().substring(0,1) == "0") 
		data_info[1] = data_info[1].substring(1,2);
	var data_info_modificada = new Date(parseInt(data_info[2]), parseInt(data_info[1])-1, parseInt(data_info[0])); 
	
	if (data_info_modificada.getDay() >= dia_semana_inicio && data_info_modificada.getDay() <= dia_semana_fim && (horario_informado < horario_util_inicio || horario_informado > horario_util_fim))
		return false;
	else
		return true;
}

// Funcao para converter a data no formato RAPPEL do callfile 'Z999999999999' - (R2019|03|15|10|20)
function converter_data_rappel(data, horario) {
	data = data.split("/");
	horario = horario.split(":");
	var data_rappel = data[2]+data[1]+data[0]+horario[0]+horario[1];
	return data_rappel;
}

// Funcao para ocultar combo box, o mesmo precisa ter ao menos um valor indexado
function sumir_combo(objeto) {
	objeto.selectedIndex = 0;
	objeto.options[objeto.selectedIndex].value = "";
	objeto.options[objeto.selectedIndex].text = "";
	objeto.style.display = "none";
	return;
}

// Funcao para ocultar campo text
function sumir_campo(objeto) {
	objeto.value = "";
	objeto.style.display = "none";
	return;
}


// Funcao para retornar o tipo de discagem das campanhas -> OutMode: 1 = Preview, (2 Progressivo, 3 Preditivo) = Discador, 4 URA Reversa (Robo)
// Variavel = $CAMPAIGN
function retorna_campanha(Variavel)
{
	var Select_Campanha;
	var campanha;
	if(Variavel == "" || Variavel == "undefined" || Variavel == undefined)
	{
		campanha = $ANI
		Select_Campanha = "SELECT OutMode FROM [HN_ADMIN].[dbo].[Campaigns] where DID = '"+campanha+"'";
	}
	else
	{
		campanha = $CAMPAIGN
		Select_Campanha = "SELECT OutMode FROM [HN_ADMIN].[dbo].[Campaigns] where QueueId = '"+campanha+"'";
	}
	return Select_Campanha;	
}

// Funcao para retornar a CallStatus
// Variavel = $CAMPAIGN
function retorna_callstatus(Variavel)
{
	var Select_CallStatus;
	var campanha;
	if(Variavel == "" || Variavel == "undefined" || Variavel == undefined)
	{
		campanha = $ANI
		Select_CallStatus = "SELECT StatusGroup FROM [HN_ADMIN].[dbo].[Campaigns] where DID = '"+campanha+"'";
	}
	else
	{
		campanha = $CAMPAIGN
		Select_CallStatus = "SELECT StatusGroup FROM [HN_ADMIN].[dbo].[Campaigns] where QueueId = '"+campanha+"'";
	}
	return Select_CallStatus;
}

 //Função para alterar os campos de posição
function changePosition (obj1, posLeft1, posTop1, obj2, posLeft2, posTop2)
{
 var pos_obj1 = obj1;
 pos_obj1.style.position = "absolute";
 pos_obj1.style.posLeft = posLeft1;
 pos_obj1.style.posTop = posTop1;
 pos_obj1.style.display = "none";
 
 var pos_obj2 = obj2;
 pos_obj2.style.position = "absolute";
 pos_obj2.style.posLeft = posLeft2;
 pos_obj2.style.posTop = posTop2;
 pos_obj2.style.display = "inline";
}

