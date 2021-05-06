
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
            // '2':{
            //     id: '2',
            //     name: 'Amy',
            //     lng: -75.75195645527508, 
            //     lat: 45.351584045823756,
            //     color: '#790af0'
            // },
            // '3':{
            //     id: '3',
            //     name: 'Orlando',
            //     lng: -75.75900589557777, 
            //     lat: 45.34794635758547,
            //     color: '#19884b'
            // }
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