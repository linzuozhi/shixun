<template>
<div>
    <span>{{ qslink }}</span>
</div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
data(){return{
    qslink:"",
}



},     
mounted(){
   let questionnairelink = localStorage.getItem('link');
   console.log(questionnairelink);
this.qslink = questionnairelink
console.log(this.qslink);
},
}
</script>