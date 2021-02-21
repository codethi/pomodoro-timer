// Acessa o campo input de Ação
let acao = document.getElementById('acao')
// Acessa o campo input de Pausa 
let pausa = document.getElementById('pausa')
// Acessa o campo input de Sessões
let sessoes = document.getElementById('sessoes')
// Variável para contar os segundos
let segundos

// Acessa os audios de alertas e colcoca nas variáveis
var bell = new Audio("./audio/bell.mp3")
var volta = new Audio("./audio/volta.mp3")
var final = new Audio("./audio/final.mp3")

// Acessa a tag audio e os botões de pause e play
var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

// Função para pausar a musica tirar o botão pause e colocar o play
function pausar(){
   lofi.pause()
   play.style.setProperty('display', 'block', 'important')
   pause.style.setProperty('display', 'none', 'important')
}

// Função para tocar a musica tirar o botão play e colocar o pause
function executar(){
   lofi.play()
   play.style.setProperty('display', 'none', 'important')
   pause.style.setProperty('display', 'block', 'important')
}


// Função para iniciar a contagem

function iniciar() {

   // Verificação se os campos de ação, pausa e sessões estão preenchidos
   if (acao.value == 0) {
      document.getElementById('erro_acao').innerHTML = "Adicione os minutos"
      acao.focus()
   } else if (pausa.value == 0) {
      document.getElementById('erro_pausa').innerHTML = "Adicione a pausa"
      pausa.focus()
   } else if (sessoes.value == 0) {
      document.getElementById('erro_sessoes').innerHTML = "Adicione as sessões"
      sessoes.focus()
   } else {

      // Tocar a música automáticamente
      lofi.play()
      //Mostrar o botão pause
      pause.style.setProperty('display', 'block', 'important')

      // Adicionar ao localStorage em forma de String os valores inseridos nos inputs ação, pause e sessões
      localStorage.setItem('acao', String(acao.value))
      localStorage.setItem('pausa', String(pausa.value))
      localStorage.setItem('sessoes', String(sessoes.value))

      // Esconder a div de configuração (inputs e botão iniciar)
      document.getElementById('config').style.setProperty('display', 'none', 'important')

      // Mostrar div do timer, com o titulo, relógio e quantidade de sessões
      document.getElementById('timer').style.setProperty('display', 'block', 'important')

      // Aciona a função momentoAcao
      momentoAcao()

   }

}

// Função para contar o tempo determinado no input de ação
function momentoAcao() {

   // Pega o valor das sessões no localStorage e coloca na variável sessoes_valor
   let sessoes_valor = localStorage.getItem('sessoes')

   // Verificação se o sessoes_valor é diferente de 1 (Comparação de valores String)
   if (sessoes_valor != '1') {
      document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessões restantes'
   } else {
      document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
   }

   // Aciona a tag h3 que possui o id 'title'
   let title = document.getElementById('title')
   // Adiciona o valor 'AÇÃO' ao HTML
   title.innerHTML = "AÇÃO"
   // Muda o tamanho da fonte para 25pt
   title.style.fontSize = '25pt'
   // Muda a grossura do texto para bold
   title.style.fontWeight = 'bold'
   // Muda a cor do texto para verde (#28a745)
   title.style.setProperty('color', '#28a745', 'important')

   // Pega o valor de acao do localStorage, já convertendo para Number e adicionando a variável min
   min = Number(localStorage.getItem('acao'))

   // O valor já incia com menos 1
   min = min - 1
   // Os seguntos iniciam com 59
   segundos = 59

   // Adiciona o valor de min ao h2 que contem a tag minutes_ok
   document.getElementById('minutes_ok').innerHTML = min
   // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
   document.getElementById('seconds_ok').innerHTML = segundos

   // Adiciona a variável min_interval a função setInterval que vai execultar a função minTimer de 60 em 60 segundos
   var min_interval = setInterval(minTimer, 60000)
   // Adiciona a variável seg_interval a função setInterval que vai execultar a função segTimer de 1 em 1 segundo
   var seg_interval = setInterval(segTimer, 1000)

   // Função que será execultada de 60 em 60 segundos
   function minTimer() {
      // Durante essa execução o valor de min diminuira 1
      min = min - 1
      // Adiciona o valor de min ao h2 que contem a tag minutes_ok
      document.getElementById('minutes_ok').innerHTML = min
   }

   // Função que será execultada de 1 em 1 segundo
   function segTimer() {
      // Durante essa execução o valor de segundos diminuira 1
      segundos = segundos - 1
      // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
      document.getElementById('seconds_ok').innerHTML = segundos

      // Verificação se o valor de segundos é menor ou igual a 0
      if (segundos <= 0) {
         // Verificação se o valor de min é menor ou igual a 0  
         if (min <= 0) {
            // Se acabar os minutos, o intervalo min_interval e seg_interval será parado e limpo
            clearInterval(min_interval)
            clearInterval(seg_interval)

            // Som bell será executado
            bell.play();

            // Função momentoPausa é acionada
            momentoPausa()

         }

         // Se não acabar os minutos a variável segundos recebe mais 60 segundos e começa os intervalos de novo.
         segundos = 60
      }

   }
}


// Função para contar o tempo determinado no input de pausa
function momentoPausa() {

   // Aciona a tag h3 que possui o id 'title'
   let title = document.getElementById('title')
   // Adiciona o valor 'PAUSA' ao HTML
   title.innerHTML = "PAUSA"
   // Muda o tamanho da fonte para 25pt
   title.style.fontSize = '25pt'
   // Muda a grossura do texto para bold
   title.style.fontWeight = 'bold'
   // Muda a cor do texto para vermelha (#dc3545)
   title.style.setProperty('color', '#dc3545', 'important')

   // Pega o valor de pausa do localStorage, já convertendo para Number e adicionando a variável min_pausa
   min_pausa = Number(localStorage.getItem('pausa'))

   // O valor já incia com menos 1
   min_pausa = min_pausa - 1
   // Os seguntos iniciam com 59
   segundos = 59

   // Adiciona o valor de min_pausa ao h2 que contem a tag minutes_ok
   document.getElementById('minutes_ok').innerHTML = min_pausa
   // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
   document.getElementById('seconds_ok').innerHTML = segundos

   // Adiciona a variável min_interval a função setInterval que vai execultar a função minTimer de 60 em 60 segundos
   var min_interval = setInterval(minTimer, 60000)
   // Adiciona a variável seg_interval a função setInterval que vai execultar a função segTimer de 1 em 1 segundo
   var seg_interval = setInterval(segTimer, 1000)

   // Função que será execultada de 60 em 60 segundos
   function minTimer() {
      // Durante essa execução o valor de min_pausa diminuira 1
      min_pausa = min_pausa - 1
      // Adiciona o valor de min ao h2 que contem a tag minutes_ok
      document.getElementById('minutes_ok').innerHTML = min_pausa
   }

   // Função que será execultada de 1 em 1 segundo
   function segTimer() {
      // Durante essa execução o valor de segundos diminuira 1
      segundos = segundos - 1
       // Adiciona o valor de segundos ao h2 que contem a tag seconds_ok
      document.getElementById('seconds_ok').innerHTML = segundos

      // Verificação se o valor de segundos é menor ou igual a 0
      if (segundos <= 0) {
         // Verificação se o valor de min é menor ou igual a 0  
         if (min_pausa <= 0) {
            // Se acabar os minutos, pegar o valor de sessões que está no localStorage já convertendo para number e adicionando a variável ses
            ses = Number(localStorage.getItem('sessoes'))
            // Diminumindo o valor de sessões com menos 1
            ses = ses - 1
            // Devonvendo para o localStorage o valor atualizado em forma de String.
            localStorage.setItem('sessoes', String(ses))
            // Se acabar os minutos, o intervalo min_interval e seg_interval será parado e limpo
            clearInterval(min_interval)
            clearInterval(seg_interval)

            // Verificando se o valor de ses é menor ou igual a 0
            if (ses <= 0) {
               // Toca o audio final
               final.play()
               // Limpa o localStorage
               localStorage.clear()

               // Esconde o config
               document.getElementById('config').style.setProperty('display', 'none', 'important')
               // Esconde o Timer
               document.getElementById('timer').style.setProperty('display', 'none', 'important')
               // Mostra a mensagem de finalização e o botão de inicio
               document.getElementById('fim').style.setProperty('display', 'block', 'important')
            } else {
               // Senão toca o audio volta
               volta.play();
               // chama a função de momentoAcao novamente para reiniciar o ciclo
               momentoAcao()
            }
         }
         // Se os minutos não acabarem adiciona mais 60 aos segundos e começa de novo.
         segundos = 60
      }
   }

}