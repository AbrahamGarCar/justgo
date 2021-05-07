
 class Mapa {
    
    constructor() {
        this.marcadores = {
            '1':{
                id: '1',
                name: 'Abraham',
                lng: -75.75512993582937,
                lat: 45.349977429009954,
                color: '#dd8fee'
            },
      
        }
    }

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador( marcador) {
        console.log('agregar marcador',marcador);
        this.marcadores[ marcador.id ] = marcador;
        console.log(this.marcadores);
    }

    borrarMarcador( id ){

        delete this.marcadores[id];
        return this.getMarcadores();

    }

    moverMarcador( marcador) {
        console.log('moviendo',marcador);

        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }
}

module.exports = Mapa;