//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        // console.log(tweets);

        crearHTML();
    });
}

//Funciones

function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validar..
    if (tweet === '') {
        mensajeError('No puede ir vacio');
        return;
    } 

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets)
    //Una vez agregado, creamos el HTML
    crearHTML(); 

    //Reiniciar el formulario
    formulario.reset();

}

//Mostrar mensaje de error
function mensajeError(e) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = e;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild( mensajeError );

    //Elimina la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
    
}
// muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet=>{
            //Agregar un boton de eliminar
            const btnBorrar = document.createElement('a');
            btnBorrar.classList.add('borrar-tweet');
            btnBorrar.innerHTML = 'X';

            //Añadir la función de eliminar 
            btnBorrar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');
            //Añadir el texto
            li.textContent = tweet.tweet;

            //Añadir el botón
            li.appendChild(btnBorrar);

            //insertarlo en el html
            listaTweets.appendChild( li );
        });
    }

    sincronizarStorage();
}

//Agregar los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//Eliminar Tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);

    console.log(tweets);
    crearHTML();
}
//limpiar html
function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
