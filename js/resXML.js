function callResXML(){
    console.log("Obteniendo personas:");
    peticionHttp.onreadystatechange = callResXMLResponse;
    peticionHttp.open('GET', 'res.xml', true); 
    peticionHttp.send(null);
}

function callResXMLResponse(response){ 
    if (peticionHttp.readyState == 4) {
        if(peticionHttp.status == 200){
            var select = document.getElementById("comboXML");
            select.innerHTML = "<option>Seleccione opción</option>";
            console.log(peticionHttp.responseText);
            document.getElementById("resultXML").innerHTML =peticionHttp.responseText;
            var docXML = parseXML(peticionHttp.responseText);
            // Obtenemos todos los tag "persona" del xml de respuesta
            var personas = docXML.getElementsByTagName("persona");
            console.log("Personas:");
            console.log(personas);
            for(var i = 0;i<personas.length;i++){
                var persona = new Object();
                // Esto nos devuelve el String completo del xml, para poder acceder a la info del xml hay que recorrer cada uno de los nodos.
                var nodos = personas[i].childNodes;
                for(var j = 0;j<nodos.length;j++){
                    var nodo = nodos[j];
                    console.debug("Nodo: "+nodo.nodeName+" Tipo: "+nodo.nodeType);
                    if(nodo.nodeName){
                        // Tratamos solo los nodos que no son "#text" sino element(por ejemplo <nombre> devolverá "nombre")
                        // Como apunte el nodeType del nodo es 1 cuando se trata de un "Element" y 3 un "#text"
                        // Elige la condicion que prefieras
                        if(nodo.nodeName != "#text" && nodo.nodeType == 1){
                            switch(nodo.nodeName){
                                case "apellido1":
                                    // El nodo contiene todo el tag "<nombre>Alex</nombre>"
                                    // para acceder al contenido tienes que acceder al nodo hijo que será de tipo "#text" y obtener el valor del nodo
                                    persona.apellido1 = nodo.firstChild.nodeValue;
                                break;
                                case "apellido2":
                                    persona.apellido2 = nodo.firstChild.nodeValue;
                                break;
                                case "nombre":
                                    persona.nombre = nodo.firstChild.nodeValue;
                                break;
                                case "edad":
                                    persona.edad = nodo.firstChild.nodeValue;
                                break;
                                case "peso":
                                    persona.peso = nodo.firstChild.nodeValue;
                                break;
                            }
                        }
                    }
                }
                // DOM Core
                // Creamos el nodo de tipo Element
                var option = document.createElement("option");
                // Creamos el TextNode
                var text = document.createTextNode(persona.nombre+((persona.apellido1)?" "+persona.apellido1:"")+((persona.apellido2)?" "+persona.apellido2:""));
                // Incluimos el TextNode en el option
                option.appendChild(text);
                // Incluimos el Option en el select
                select.appendChild(option);
                console.debug(persona);
                if(personas.length>0)
                    select.removeAttribute("disabled");
            }
        } else
        console.log("Error loading response\n");
    }
}