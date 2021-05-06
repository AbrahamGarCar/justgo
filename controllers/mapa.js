const marcador = require('../classes/marcador')

class Mapa {
    
    constructor() {
        this.marcadores = {
            // '1':{
            //     id: '1',
            //     name: 'Abraham',
            //     lng: -106.096781,
            //     lat: 28.636627,
            //     color: '#dd8fee'
            //   },
            // '2':{
            //     id: '2',
            //     name: 'Amy',
            //     lng: -106.087575, 
            //     lat: 28.630770,
            //     color: '#790af0'
            //   },
            // '3':{
            //     id: '3',
            //     name: 'Orlando',
            //     lng: -106.115385, 
            //     lat: 28.625722,
            //     color: '#19884b'
            //   }
        }
    }  


getMarcadores() {
    return this.marcadores;
}

agregarMarcador(marcador) {
    this.marcadores[ marcador.id ] = marcador;
}

borrarMarcador(id) {
    //  this.marcadores = this.marcadores.filter( mark => mark.id !== id);
    delete this.marcadores[id];
    return this.getMarcadores();
    
}

moverMarcador(marcador) {
    // if( this.marcadores[i].id == marcador.id ){
        //     this.marcadores[marcador.id].lng = marcador.lng;
        //     this.marcadores[marcador.id].lat = marcador.lat;
        // }
        console.log('entre movermarcador');
    for ( const i in this.marcadores ) {
        if( this.marcadores[i].id == marcador.id ){
            this.marcadores[i].lat = marcador.lat;
            this.marcadores[i].lng = marcador.lng;
            break;
        }
    }
}
}
module.exports =  Mapa;

  // getMarcadores,
    // agregarMarcador,
    // borrarMarcador,
    // moverMarcador
  
