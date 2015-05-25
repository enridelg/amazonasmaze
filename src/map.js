function createElements(stage) {
  var boat;

  for(var node in map_data){
    var node_type = map_data[node].type;
    //Todos los elementos son nodos, habria que crear un nodo en cada sitio
    stage.insert(new Q.Node({x:map_data[node].x, y:map_data[node].y}));
    if(node_type == "1"){
      //boat = stage.insert(new Q.Boat({x:map_data[node].x, y:map_data[node].y, actualNode:node}));
      boat = new Q.Boat({x:map_data[node].x, y:map_data[node].y, actualNode:node});
    }else if(node_type == "2"){
      //barco enemigo
    }else if(node_type == "2"){
      //serpiente
    }else if(node_type == "2"){
      //arma
    }else if(node_type == "2"){
      //objeto de valor para los puntos
    }else if(node_type == "6"){
      //nodo especial de fin
    }
  }

  return boat;
}
