const {createApp}=Vue

createApp({
    data(){
        return{
            events:[],
            upcomingEvents:[],
            pastEvents:[],
            currentDate:'',
            categoriaPast:[],
            categoriaUpcoming:[],
            arrayOrdenado:[],
            nameEvent:'',
            capacityEventMayor: Number,

            nameMayorPorcentajeAsistencia:'',
            asistenciaPorcentajeMayor: Number,

            nameMenorPorcentajeAsistencia:'',
            asistenciaPorcentajeMenor:Number,


            nuevoArrayPast:[],
            nuevoArrayUp:[],


        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response=>response.json())
        .then(dataAmazin =>{
            //todos los eventos
            this.events = dataAmazin.events
            //fecha del array complet
            this.currentDate = dataAmazin.currentDate
            //filtro de tipos de eventos (pasados,futuros)
            for (let event of this.events) {
                 if (event.date < this.currentDate) {
                    this.pastEvents.push(event)
                 }else{
                    this.upcomingEvents.push(event)
                 }
            }
            //categorias por eventos pasados
            this.categoriaPast =[...new Set(this.pastEvents.map(event=> event.category))]
            // console.log(this.categoriaPast)
            //categorias por eventos futuros
            this.categoriaUpcoming =[...new Set(this.upcomingEvents.map(event=> event.category))]
            // console.log(this.categoriaUpcoming)

            this.arrayOrdenado= this.events.sort(function(a,b){
                return b.capacity - a.capacity
            })
            console.log(this.arrayOrdenado);
            this.nameEvent= this.arrayOrdenado[0].name
            this.capacityEventMayor= this.arrayOrdenado[0].capacity

            function calcularPorcentaje(asistencia,capacidad) {
                return (asistencia/capacidad)*100
            }
            this.pastEvents.sort((a,b)=>calcularPorcentaje(a.assistance,a.capacity)-calcularPorcentaje(b.assistance,b.capacity))
            console.log(this.pastEvents);
            //todo asistencia mayor
            this.nameMayorPorcentajeAsistencia=this.pastEvents[this.pastEvents.length-1].name
            this.asistenciaPorcentajeMayor = calcularPorcentaje(this.pastEvents[this.pastEvents.length-1].assistance,this.pastEvents[this.pastEvents.length-1].capacity).toFixed(2)
            //asistencia menor
            this.nameMenorPorcentajeAsistencia=this.pastEvents[0].name
            this.asistenciaPorcentajeMenor = calcularPorcentaje(this.pastEvents[0].assistance,this.pastEvents[0].capacity).toFixed(2)


            this.nuevoArrayPast = this.categoriaPast.map((categoria)=>{
                let auxPast = {
                    category: categoria
                }
                let categoriaEventos= this.pastEvents.filter(evento=>evento.category == categoria)
                const revenue = categoriaEventos.reduce((acc,act)=>acc+(act.price * act.assistance),0)
                auxPast.revenue = revenue
                const porcAsistencia= categoriaEventos.reduce((acc,act)=>acc+(act.assistance/(act.capacity/100)),0)/categoriaEventos.length
                auxPast.porcentaje= porcAsistencia.toFixed(2)
                // console.log(revenue)
                return auxPast
            })
            console.log(this.upcomingEvents);


            
            this.nuevoArrayUp = this.categoriaUpcoming.map((categoria)=>{
                let auxUp = {
                    category: categoria
                }
                let categoriaEventos= this.upcomingEvents.filter(evento=>evento.category == categoria)
                const revenue = categoriaEventos.reduce((acc,act)=>acc+(act.price * act.estimate),0)
                auxUp.revenue = revenue
                const porcAsistencia= categoriaEventos.reduce((acc,act)=>acc+(act.estimate/(act.capacity/100)),0)/categoriaEventos.length
                auxUp.porcentaje= porcAsistencia.toFixed(2)
                // console.log(revenue)
                return auxUp
            })
        })

    }
}).mount('#app')