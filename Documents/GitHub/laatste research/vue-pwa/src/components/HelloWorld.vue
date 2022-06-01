<template>
  <div class="hello">
    <button @click="fficherProjet()">onclick</button>
    <h1>{{ msg }}</h1>
    
    <div> In store: <br>
            <button @click="subscribe()" v-for="(opdracht, index) in opdrachten" v-bind:key="index"> {{opdracht}} <br></button>
            <button @click="subscribe()" v-for="(opdracht, index) in projet" v-bind:key="index"> {{opdracht.name}} <br></button>
        
    </div>
    
  </div>
</template>

<script>

addEventListener('load', async() =>{
  let sw = navigator.serviceWorker.register('./registerServiceWorker.js')
  console.log(sw);

})
export default {
  name: 'HelloWorld',
  data(){
   return{
    projet:{},
    opdrachten: ['Opdracht 1','Opdracht 2','Opdracht 3','Opdracht 4','Opdracht 5']
   }},
  
  methods: {
  
  async fficherProjet(){
     fetch("https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon")
    .then(async response => {
      const data = await response.json();
      this.projet = data;
    })
    .catch(error => {
      this.errorMessage = error;
      console.error("There was an error!", error);
    });
  
   
 },
  async subscribe() {
    console.log("testing")
      let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBpS5tp2_TojL4KyOkyfhWFffToTw-DjdTnpkCEDy-e3FdPI4jOS8maKRTThOW2jx_s3vMTxWvrkalGxxjnrIuA'
    })
    console.log(JSON.stringify(push))
    }
},
mounted() {
           console.log('Component mounted.')
           this.fficherProjet();
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
