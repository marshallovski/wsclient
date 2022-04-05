console.log('script loaded'); 
const urlinp = document.getElementById('urlinp');
const submbtn = document.getElementById('connBtn');
const logsBtn = document.getElementById('openLogsBtn');
const logClose = document.querySelector('.log_closeBtn');
const discnBtn = document.getElementById('closeconnectBtn');
const sendBtn = document.querySelector('.btn-send');
const msginp = document.getElementById('msgbox');
let ws;
let errorsCount = 0;
let log = ''; 
submbtn.onclick = function() {   console.log(`Trying connect to ${document.getElementById('urlinp').value}`);   try {     if (!window.WebSocket) {       return alert("You browser doesn't support WebSocket!");     }      ws = new WebSocket(document.getElementById('urlinp').value);      ws.onopen = function() {       if (!ws) {         return null;       }        ws.send('Hello from wsClient!');     };      ws.onmessage = function(event) {       log += `<br>${new Date().getHours()}:${new Date().getMinutes()} -> [SERVER_MSG]: ${event.data}`;     };     ws.onerror = function(event) {       alert('Error while connecting!');       errorsCount++;     };      ws.onclose = function(event) {       alert(`Server closed the connection.\nCode: ${event.code}.`);       log += `<br>${new Date().getHours()}:${new Date().getMinutes()} -> [CLOSED_CONN]: code - ${event.code}`;     };   } catch (e) {     console.error(e);     alert(e);     errorsCount++;     log += `<br>${new Date().getHours()}:${new Date().getMinutes()} -> [ERROR]: ${e}`;   }
};   
discnBtn.onclick = function() {   if (!ws) {     return alert("You aren't connected!");   }    console.log('Disconnecting...');   ws.close();
}; 
logsBtn.onclick = function() {   document.querySelector('.shade').style.display = 'block';   document.querySelector('.log').style.display = 'block';   document.querySelector('.log').innerHTML = `<span class="log_closeBtn">&times;</span><div style="position: sticky;">Total: ${errorsCount} errors</div><br><p>${log}`;
}; 
logClose.onclick = function() {   // doesn't work actually   
  console.log('closed log');   document.querySelector('.shade').style.display = 'none';   document.querySelector('.log').style.display = 'none';
}; 
sendBtn.onclick = function() {   ws.send(msginp.value);
};
