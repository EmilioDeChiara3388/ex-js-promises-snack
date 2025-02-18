/* Snack 1
Ottieni il titolo di un post con una Promise.

Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id} */


function getPostTitle(id) {
    const promessa = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(reject)
    })
    return promessa
}

getPostTitle(1)
    .then((data) => console.log(data.title))
    .catch(error => console.error(error));

getPostTitle(2)
    .then((data) => console.log(data.title))
    .catch(error => console.error(error));


/* 🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}. */

function getPost(id) {
    const promessaBonus = new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(post => {
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    .then(res => res.json())
                    .then(user => resolve({ ...post, user }))
                    .catch(reject)
            })
            .catch(reject)
    })
    return promessaBonus
}

getPost(3)
    .then(data => console.log(data))
    .catch(error => console.error(error));



/* Snack 2
Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject. */

function lanciaDado() {
    return new Promise((resolve, reject) => {
        console.log("Lancio in corso...")
        setTimeout(() => {
            const probabilitàLancioNullo = Math.random();
            if (probabilitàLancioNullo < 0.2) {
                console.log("Nel lancio, il dado è caduto dal tavolo, riprova");
            } else {
                const numero = Math.floor((Math.random() * 6) + 1)
                console.log(`E' uscito il numero ${numero}`)
            }
        }, 3000)
    })
}

lanciaDado()
    .then(messaggio => console.log(messaggio))
    .catch(error => console.error(error))

/* 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!". */
