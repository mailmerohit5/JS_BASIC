function myAlert(msg){
    document.querySelector('#myAlert').classList.toggle('showMyAlert');
    document.querySelector('#alertClose').onclick=closeDialog;
    document.querySelector('#msg').innerHTML=msg;
   }
   function closeDialog(){
    document.querySelector('#myAlert').classList.toggle('showMyAlert');
   }