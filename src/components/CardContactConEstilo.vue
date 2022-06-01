<template>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
    crossorigin="anonymous">
    <div class="container">
        <div class="card">
            <div class="slide slide1">
                <div class="content">
                    <div class="icon">
                        <div class="contacto-publico"><img src="@/assets/candadoAbierto.png" height="30" title="Contacto Público"/></div>
                        <div class="contact" :class="address.private && 'private'"></div>
                        <div class="contacto-privado" v-show="address.private"><img src="@/assets/candado2.png" title="Contacto Privado"/></div>
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <h2 class="tituloSlide">{{ address.name }} {{ address.lastName }}</h2>
                        <!-- <button v-show="store.logged" class="delete-contact" @click="deleteAddress" > -->
                          <!-- <img src="../assets/delete-button.svg" alt="Delete Contact" /> -->
                        <!-- </button> -->
                    </div>
                </div>
            </div>
            <div class="slide slide2">
                <div class="content">
            <div class="contact-info">
              <span class="contact-address">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-signpost-2 margen" viewBox="0 0 16 16">
              <path d="M7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586a1 1 0 0 0-2 0zM13.5 3l.75 1-.75 1H2V3h11.5zm.5 5v2H2.5l-.75-1 .75-1H14z"/>
              </svg> &#8212; {{ address.address }} {{ address.city }}</span>
            </div><!-- FIN contact-info -->
                <div class="centrado">{{ address.state }} &#8212; {{ address.zip }} &#8212; {{address.country}}</div>
            <div class="contact-info">
              <span class="contact-info-value"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope margen" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
              </svg> &#8212; {{ address.email }}</span>
            </div>
            <div class="contact-info">
              <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone margen" viewBox="0 0 16 16" >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg> &#8212; {{ address.phone }}</span>
            </div>
            <button v-show="store.logged" class="delete-contact" @click="deleteAddress" >
              <img src="../assets/delete-button.svg" alt="Delete Contact" title="Eliminar contacto"/>
            </button>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'; 
import { userStore } from '@/store/user'
export default {
   props: {
    address: {
      type: Object,
      required: true,
    },
  },
  emits: ['deleteAddress'],
    setup (props, context) {
      const store = userStore();
      store.logged;
     
      //console.log(user);
      let contacto = ref(props.address);
      
      const deleteAddress = () => {
         context.emit("deleteAddress", contacto.value.id);
      }//FIN deleteRecipe()

      return { deleteAddress, store }

    }
}
</script>

<style scoped>
.centrado{
  text-align: center;
  margin-bottom: 25px;
}

.direccion{
  margin-bottom: -10px;
}

.contact {
  margin: 20px;
  border-radius: 4px;
  position: relative;
  text-align: left;
  color:#fff;
}

.margen {
  margin-bottom: -4px;
}

.contact-title {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
  color:#fff;
}
.tituloSlide {
  position: relative;
  color:white;
  margin-top: 135px;
}

.contact-address {
  text-align: left;
  font-size: 17px;
}
.contact-contact {
  font-size: 16px;
}
.contact-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.contact-info-label {
  font-weight: bold;
  margin-right: 5px;
}
.delete-contact {
  position: absolute;
  top: 170px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-contact img {
  width: 20px;
}
.contacto-publico {
position: absolute;
top: 10px;
left:15px;
background: transparent;
border: 0;
padding: 0;
cursor: pointer;
color: #fff;
}
.contacto-privado {
position: absolute;
top: 10px;
left:15px;
background: transparent;
border: 0;
padding: 0;
cursor: pointer;
color: #fff;
}
h2 .cotacto-privado{
  color:#fff;
}
.contacto-privado img {
  width: 25px;
}



/* OTRO ESTILO */
.container{
  margin: 0 auto;
  height: auto;
  width: 300px;
}
.container .card .icon  {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #4caf50;
  border-radius: 4px;    
}

.container .card .contact.private {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background: #ffbf00;/* #d14242*/
  border-radius: 4px;
  color: #fff;
  border-radius: 4px;
}

.contact.private {
  color: #fff;
}
.container .card .icon .fa  {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  color: #fff;
  
}

.container .card .slide {
    width: 300px;
    height: 200px;
    transition: 0.5s;
    
}

.container .card .slide.slide1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transition: .7s;
    transform: translateY(100px);
    border-radius: 4px;
    
}

.container .card:hover .slide.slide1{
    transform: translateY(0px);
}

.container .card .slide.slide2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    transition: .8s;
    transform: translateY(-100px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    margin-bottom: -80px;
    border-radius: 4px;
}

.container .card:hover .slide.slide2{
    transform: translateY(0);
}

.container .card .slide.slide2::after{
    content: "";
    position: absolute;
    width: 30px;
    height: 4px;
    bottom: 15px;
    left: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: #2c73df;
    border-radius: 4px;
}

.container .card .slide.slide2 .content p {
    margin: 0;
    padding: 0;
    text-align: center;
    color: #414141;
}

.container .card .slide.slide2 .content h3 {
    margin: 0 0 10px 0;
    padding: 0;
    font-size: 24px;
    text-align: center;
    color: #414141;
} 
</style>