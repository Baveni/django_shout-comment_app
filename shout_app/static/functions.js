// This funtion will pulsate the >_

$(function() {
  var p = $(".pulsate");
  for(var i=0; i<8; i++) {
      p.animate({opacity: 0.1}, 300, 'linear')
          .animate({opacity: 1}, 900, 'linear');
  }
});

// the get clock function
function GetClock(){
  var d=new Date();
  var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
  if(nmin<=9) nmin="0"+nmin
  if(nsec<=9) nsec="0"+nsec;

  document.getElementById('clockbox').innerHTML=""+nhour+":"+nmin+":"+nsec+"";
}

window.onload=function(){
  GetClock();
  setInterval(GetClock,1000);
}

// getting the visitor IP add
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }, noop);

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// Usage

getUserIP(function(ip){
		document.getElementById("ip").innerHTML = ip;
});


