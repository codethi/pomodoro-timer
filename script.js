let minutos = document.getElementById('minutes')
let intervalo = document.getElementById('intervalo')
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio("./audio/bell.mp3")
var volta = new Audio("./audio/volta.mp3")
var final = new Audio("./audio/final.mp3")
var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')



function iniciar() {
   if (minutos.value == 0) {
      document.getElementById('erro_min').innerHTML = 'Adicione os minutos'
      minutos.focus();
   } else if (intervalo.value == 0) {
      document.getElementById('erro_inter').innerHTML = 'Adicione um intervalo'
      intervalo.focus();
   } else if (sessoes.value == 0) {
      document.getElementById('erro_ses').innerHTML = 'Adicione as sessões'
      sessoes.focus();
   } else {

      lofi.play()
      pause.style.setProperty('display', 'block', 'important')

      localStorage.setItem('minutos', String(minutos.value))
      localStorage.setItem('intervalo', String(intervalo.value))
      localStorage.setItem('sessoes', String(sessoes.value))

      document.getElementById('config').style.setProperty("display", "none", "important")
      document.getElementById('timer').style.setProperty("display", "block", "important")

      momentoTimer()

   }
}

function pausar(){
   lofi.pause()
   pause.style.setProperty('display', 'none', 'important')
   play.style.setProperty('display', 'block', 'important')
}

function executar(){
   lofi.play()
   play.style.setProperty('display', 'none', 'important')
   pause.style.setProperty('display', 'block', 'important')
}


function momentoTimer() {

   if(localStorage.getItem('sessoes') != '1'){
      document.getElementById('title_sessao').innerHTML = localStorage.getItem('sessoes') + ' sessões restantes'
   } else {
      document.getElementById('title_sessao').innerHTML = localStorage.getItem('sessoes') + ' sessão restante'
   }

   let title = document.getElementById('title')
   title.innerHTML = "AÇÃO"
   title.style.fontWeight = 'bold'
   title.style.fontSize = '25pt'
   title.style.setProperty('color', '#28a745', 'important')

   min = Number(localStorage.getItem('minutos'))

   min = min - 1;
   segundos = 59;

   document.getElementById('minutes_ok').innerHTML = min
   document.getElementById('seconds_ok').innerHTML = segundos

   var minutes_interval = setInterval(minutesTimer, 60000);
   var seconds_interval = setInterval(secondsTimer, 1000);

   function minutesTimer() {
      min = min - 1;
      document.getElementById("minutes_ok").innerHTML = min;
   }


   function secondsTimer() {
      segundos = segundos - 1;
      document.getElementById("seconds_ok").innerHTML = segundos;

      if (segundos <= 0) {
         if (min <= 0) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);

            bell.play();

            momentoIntervalo()

         }

         segundos = 60;
      }
   }
}



function momentoIntervalo() {

   let title = document.getElementById('title') 
   title.innerHTML = "PAUSA"
   title.style.fontWeight = 'bold'
   title.style.fontSize = '25pt'
   title.style.setProperty('color', '#dc3545', 'important')

   inter = Number(localStorage.getItem('intervalo'))

   inter = inter - 1;
   segundos = 59;

   document.getElementById('minutes_ok').innerHTML = inter
   document.getElementById('seconds_ok').innerHTML = segundos



   var minutes_interval_pausa = setInterval(minutesTimerPausa, 60000);
   var seconds_interval_pausa = setInterval(secondsTimerPausa, 1000);

   function minutesTimerPausa() {
      inter = inter - 1;
      document.getElementById("minutes_ok").innerHTML = inter;
   }


   function secondsTimerPausa() {

      segundos = segundos - 1;
      document.getElementById("seconds_ok").innerHTML = segundos;

      if (segundos <= 0) {
         if (inter <= 0) {
            var ses = Number(localStorage.getItem('sessoes'))
            ses = ses - 1
            localStorage.setItem('sessoes', String(ses))
            clearInterval(minutes_interval_pausa);
            clearInterval(seconds_interval_pausa);
            if (ses <= 0) {
               final.play()
               localStorage.clear()
               document.getElementById('config').style.setProperty("display", "none", "important")
               document.getElementById('timer').style.setProperty("display", "none", "important")
               document.getElementById('fim').style.setProperty("display", "block", "important")
               
            } else {
               volta.play()
               reiniciar()
            }
            
         }

         segundos = 60;
      }
   }
}


function reiniciar() {

   momentoTimer()
 
}


