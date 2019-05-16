function callResJSON(){
    console.log("Obteniendo personas:");
    peticionHttp.onreadystatechange = callResJSONResponse;
    peticionHttp.open('GET', 'res.json', true); 
    peticionHttp.send(null);
}

function callResJSONResponse(response){ 
    if (peticionHttp.readyState == 4) {
        if(peticionHttp.status == 200){
            var select = document.getElementById("comboJSON");            
            select.innerHTML = "<option>Seleccione opción</option>";
            console.log(peticionHttp.responseText);
            document.getElementById("resultJSON").innerHTML =peticionHttp.responseText;
            var personas = JSON.parse(peticionHttp.responseText);
            console.log("Personas:");
            console.log(personas);
            for(var i = 0;i<personas.length;i++){
                var persona = personas[i];
                var option = new Option();
                option.value = persona.nombre;
                option.text = persona.nombre+((persona.apellido1)?" "+persona.apellido1:"")+((persona.apellido2)?" "+persona.apellido2:"");
                select.options.add(option);
                console.debug(persona)
            }
            if(personas.length>0)
                select.disabled = false;

        } else
        console.log("Error loading response\n");
    }
}