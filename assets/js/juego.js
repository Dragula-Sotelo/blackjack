    // 2C = Two of Clubs (Tréboles)
    // 2D = Two of Diamonds (Diamantes)
    // 2H = Two of Hearts (Corazones)
    // 2S = Two of Spades (Espadas)

    //Patrón Modulo, cuando se ejecute el programa vera que estoy creando esta función e inmediatamente la estoy ejecutando, esto se conoce como el patrón modulo. 
    const miModulo = (() => {
        'use strict'
        
        // (function(){

        // })();//Función ánonima autoinvocada.

        let deck = [];
        const tipos = ['C', 'D', 'H', 'S'],
              especiales =  ['A', 'J', 'Q', 'K'];
        let puntosJugadores = [];

        //Referencias del HTML
        const btnPedir = document.querySelector('#btnPedir'),
              btnDetener = document.querySelector('#btnDetener'),
              btnNuevo = document.querySelector('#btnNuevo');

        const cartasJugadores = document.querySelectorAll('.divCartas'),          
              puntos = document.querySelectorAll('small');

        //Esta función inicializa el juego.
        const inicializarJuego = ( numJugadores = 2 ) => {
            deck = crearDeck();
            puntosJugadores = [];
            for( let i = 0; i < numJugadores; i++ ){
                puntosJugadores.push(0);
            }
            puntos.forEach( elem => elem.innerText = 0 );
            cartasJugadores.forEach( elem => elem.innerHTML = '' );

            btnPedir.disabled = false;
            btnDetener.disabled = false;
        }

        //Está función crea un nuevo Deck
        const crearDeck = () => {

            deck = [];
            for( let i = 2; i <= 10; i++ ){
                for( let tipo of tipos ){
                    deck.push( i + tipo );
                }
            }

            for( let tipo of tipos ){
                for(let esp of especiales){
                    deck.push( esp + tipo );
                }
            }            
            return _.shuffle( deck );
        }

        //Esta función me permite tomar una carta
        const pedirCarta = () => {

            if( deck.length === 0 ){
                throw 'No hay cartas en el Deck';
            }
            return deck.pop();
        }

        const valorCarta = ( carta ) => {
            const valor = carta.substring(0, carta.length - 1);
            return ( isNaN( valor ) ) ? 
                    ( valor === 'A' ) ? 11 : 10
                    : valor * 1;
        }

        //Turno: 0 primero jugador y el último será la computadora
        const acumularPuntos = ( carta, turno ) => {
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
            puntos[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno]
        }

        const crearCarta = (carta, turno) => {

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; //Valor de la carta
            imgCarta.classList.add('carta');
            cartasJugadores[turno].append(imgCarta);            
        }

        const determinarGanador = () => {
            setTimeout(() => {

                const [puntosMinimos, puntosComputadora] = puntosJugadores;

                if( puntosComputadora === puntosMinimos ){
                    alert('Nadie Gana :(')
                } else if ( puntosMinimos > 21 ){
                    alert('Computadora Gana')
                } else if ( puntosComputadora > 21 ){
                    alert('Jugador Gana')
                } else {
                    alert('Computadora Gana')
                }
            }, 100 );
        }

        //Turno de la computadora
        const turnoComputadora = ( puntosMinimos ) => {
            let puntosComputadora = 0;
            do {
                const carta = pedirCarta();
                puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
                crearCarta(carta, puntosJugadores.length -1);

            } while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

            determinarGanador();
        }

        //Eventos
        btnPedir.addEventListener('click', () => {
            const carta = pedirCarta();
            const puntosJugador = acumularPuntos( carta, 0 );

            crearCarta(carta, 0);

            if( puntosJugador > 21 ){
                console.warn('Lo siento mucho, perdiste');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora( puntosJugador );
            } else if( puntosJugador === 21 ){
                console.warn('¡21, Genial!');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora( puntosJugador );
            }
        }); //Está función que se coloca acá como un argumento a otra función es conocida como un Callback. Puede ser una función tradicional o una función flecha.

        btnDetener.addEventListener('click', () => {
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora( puntosJugadores[0] );
        });

        // btnNuevo.addEventListener('click', () => {
            
        //     inicializarJuego();
            
        // });

        return {
            nuevoJuego: inicializarJuego
        };
        
    })();//Función ánonima autoinvocada. Estas dos instrucciones lo que hacen es básicamente crearse un nuevo scop el cual no tiene referencia por nombre. 

    

