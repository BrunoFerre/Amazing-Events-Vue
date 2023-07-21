const { createApp } = Vue
 
createApp({
    data() {
        return {
            events: [],
            category:[],
            inputSearch:'',
            categoryCheck:[],
            filter:[],
            upcoming:[],
            currrentDate:''
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(dataAmazing => {
                this.events = dataAmazing.events
                this.currrentDate = dataAmazing.currentDate
                this.category =[...new Set(this.events.map(event=> event.category))]
                this.upcoming = this.events.filter(event=>event.date >= this.currrentDate)
            })
        .catch(error=> console.error(error.message))
    },
    computed:{
        filterCrossed(){
            this.filter = this.upcoming.filter(event=>{
                return event.name.toLowerCase().includes(this.inputSearch.toLowerCase())&&(this.categoryCheck.includes(event.category)|| this.categoryCheck.length==0)
            })
        }
    }
}).mount('#app')