const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            eventU:null,
            parameter:'',
            parameres:'',
            idEvent:'',
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(dataAmazing => {
                this.events = dataAmazing.events
                this.parameter = location.search
                this.parameres = new URLSearchParams(this.parameter)
                this.idEvent= this.parameres.get('id')
                this.eventU = this.events.find(event=> event._id == this.idEvent)
                console.log(this.eventU);
            })
            .catch(error => console.error(error.message))
    }

}).mount('#app')