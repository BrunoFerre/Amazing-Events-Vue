const { createApp } = Vue
 
createApp({
    data() {
        return {
            events: [],
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(dataAmazing => {
                this.events = dataAmazing.events
                console.log(this.events);
            })
        .catch(error=> console.error(error.message))
    }
}).mount('#app')