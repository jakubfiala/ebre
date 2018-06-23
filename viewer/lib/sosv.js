!function(){var a={},b=null,c=!0,d=!1;try{"undefined"!=typeof AudioContext?b=new AudioContext:"undefined"!=typeof webkitAudioContext?b=new webkitAudioContext:c=!1}catch(e){c=!1}if(!c)if("undefined"!=typeof Audio)try{new Audio}catch(e){d=!0}else d=!0;if(c){var f="undefined"==typeof b.createGain?b.createGainNode():b.createGain();f.gain.value=1,f.connect(b.destination)}var g=function(){this._volume=1,this._muted=!1,this.usingWebAudio=c,this.noAudio=d,this._howls=[]};g.prototype={volume:function(a){var b=this;if(a=parseFloat(a),a>=0&&1>=a){b._volume=a,c&&(f.gain.value=a);for(var d in b._howls)if(b._howls.hasOwnProperty(d)&&b._howls[d]._webAudio===!1)for(var e=0;e<b._howls[d]._audioNode.length;e++)b._howls[d]._audioNode[e].volume=b._howls[d]._volume*b._volume;return b}return c?f.gain.value:b._volume},mute:function(){return this._setMuted(!0),this},unmute:function(){return this._setMuted(!1),this},_setMuted:function(a){var b=this;b._muted=a,c&&(f.gain.value=a?0:b._volume);for(var d in b._howls)if(b._howls.hasOwnProperty(d)&&b._howls[d]._webAudio===!1)for(var e=0;e<b._howls[d]._audioNode.length;e++)b._howls[d]._audioNode[e].muted=a}};var h=new g,i=null;if(!d){i=new Audio;var j={mp3:!!i.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!i.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!i.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),m4a:!!(i.canPlayType("audio/x-m4a;")||i.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(i.canPlayType("audio/x-mp4;")||i.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")}}var k=function(a){var b=this;b._autoplay=a.autoplay||!1,b._buffer=a.buffer||!1,b._duration=a.duration||0,b._format=a.format||null,b._loop=a.loop||!1,b._loaded=!1,b._sprite=a.sprite||{},b._src=a.src||"",b._pos3d=a.pos3d||[0,0,-.5],b._volume=void 0!==a.volume?a.volume:1,b._urls=a.urls||[],b._rate=a.rate||1,b._model=a.model||null,b._onload=[a.onload||function(){}],b._onloaderror=[a.onloaderror||function(){}],b._onend=[a.onend||function(){}],b._onpause=[a.onpause||function(){}],b._onplay=[a.onplay||function(){}],b._onendTimer=[],b._webAudio=c&&!b._buffer,b._audioNode=[],b._webAudio&&b._setupAudioNode(),h._howls.push(b),b.load()};if(k.prototype={load:function(){var b=this,c=null;if(d)return void b.on("loaderror");for(var e=0;e<b._urls.length;e++){var f,i;if(b._format)f=b._format;else{if(i=b._urls[e].toLowerCase().split("?")[0],f=i.match(/.+\.([^?]+)(\?|$)/),f=f&&f.length>=2?f:i.match(/data\:audio\/([^?]+);/),!f)return void b.on("loaderror");f=f[1]}if(j[f]){c=b._urls[e];break}}if(!c)return void b.on("loaderror");if(b._src=c,b._webAudio)l(b,c);else{var k=new Audio;k.addEventListener("error",function(){k.error&&4===k.error.code&&(g.noAudio=!0),b.on("loaderror",{type:k.error?k.error.code:0})},!1),b._audioNode.push(k),k.src=c,k._pos=0,k.preload="auto",k.volume=h._muted?0:b._volume*h.volume(),a[c]=b;var m=function(){b._duration=Math.ceil(10*k.duration)/10,0===Object.getOwnPropertyNames(b._sprite).length&&(b._sprite={_default:[0,1e3*b._duration]}),b._loaded||(b._loaded=!0,b.on("load")),b._autoplay&&b.play(),k.removeEventListener("canplaythrough",m,!1)};k.addEventListener("canplaythrough",m,!1),k.load()}return b},urls:function(a){var b=this;return a?(b.stop(),b._urls="string"==typeof a?[a]:a,b._loaded=!1,b.load(),b):b._urls},play:function(a,c){var d=this;return"function"==typeof a&&(c=a),a&&"function"!=typeof a||(a="_default"),d._loaded?d._sprite[a]?(d._inactiveNode(function(e){e._sprite=a;var f,g=e._pos>0?e._pos:d._sprite[a][0]/1e3,i=d._sprite[a][1]/1e3-e._pos,j=!(!d._loop&&!d._sprite[a][2]),k="string"==typeof c?c:Math.round(Date.now()*Math.random())+"";if(function(){var b={id:k,sprite:a,loop:j};f=setTimeout(function(){!d._webAudio&&j&&d.stop(b.id).play(a,b.id),d._webAudio&&!j&&(d._nodeById(b.id).paused=!0,d._nodeById(b.id)._pos=0),d._webAudio||j||d.stop(b.id),d.on("end",k)},1e3*i),d._onendTimer.push({timer:f,id:b.id})}(),d._webAudio){var l=d._sprite[a][0]/1e3,m=d._sprite[a][1]/1e3;if(e.id=k,e.paused=!1,n(d,[j,l,m],k),d._playStart=b.currentTime,e.gain.value=d._volume,"undefined"==typeof e.bufferSource)return;"undefined"==typeof e.bufferSource.start?e.bufferSource.noteGrainOn(0,g,i):e.bufferSource.start(0,g,i)}else{if(4!==e.readyState&&(e.readyState||!navigator.isCocoonJS))return d._clearEndTimer(k),function(){var b=d,f=a,g=c,h=e,i=function(){b.play(f,g),h.removeEventListener("canplaythrough",i,!1)};h.addEventListener("canplaythrough",i,!1)}(),d;e.readyState=4,e.id=k,e.currentTime=g,e.muted=h._muted||e.muted,e.volume=d._volume*h.volume(),setTimeout(function(){e.play()},0)}return d.on("play"),"function"==typeof c&&c(k),d}),d):("function"==typeof c&&c(),d):(d.on("load",function(){d.play(a,c)}),d)},pause:function(a){var b=this;if(!b._loaded)return b.on("play",function(){b.pause(a)}),b;b._clearEndTimer(a);var c=a?b._nodeById(a):b._activeNode();if(c)if(c._pos=b.pos(null,a),b._webAudio){if(!c.bufferSource||c.paused)return b;c.paused=!0,"undefined"==typeof c.bufferSource.stop?c.bufferSource.noteOff(0):c.bufferSource.stop(0)}else c.pause();return b.on("pause"),b},stop:function(a){var b=this;if(!b._loaded)return b.on("play",function(){b.stop(a)}),b;b._clearEndTimer(a);var c=a?b._nodeById(a):b._activeNode();if(c)if(c._pos=0,b._webAudio){if(!c.bufferSource||c.paused)return b;c.paused=!0,"undefined"==typeof c.bufferSource.stop?c.bufferSource.noteOff(0):c.bufferSource.stop(0)}else isNaN(c.duration)||(c.pause(),c.currentTime=0);return b},mute:function(a){var b=this;if(!b._loaded)return b.on("play",function(){b.mute(a)}),b;var c=a?b._nodeById(a):b._activeNode();return c&&(b._webAudio?c.gain.value=0:c.muted=!0),b},unmute:function(a){var b=this;if(!b._loaded)return b.on("play",function(){b.unmute(a)}),b;var c=a?b._nodeById(a):b._activeNode();return c&&(b._webAudio?c.gain.value=b._volume:c.muted=!1),b},volume:function(a,b){var c=this;if(a=parseFloat(a),a>=0&&1>=a){if(c._volume=a,!c._loaded)return c.on("play",function(){c.volume(a,b)}),c;var d=b?c._nodeById(b):c._activeNode();return d&&(c._webAudio?d.gain.value=a:d.volume=a*h.volume()),c}return c._volume},filter:function(a,b){var c=this;a=parseFloat(a),c._freq=a;var d=b?c._nodeById(b):c._activeNode();return d&&c._webAudio&&(d.filter.frequency.value=a),c},loop:function(a){var b=this;return"boolean"==typeof a?(b._loop=a,b):b._loop},sprite:function(a){var b=this;return"object"==typeof a?(b._sprite=a,b):b._sprite},pos:function(a,c){var d=this;if(!d._loaded)return d.on("load",function(){d.pos(a)}),"number"==typeof a?d:d._pos||0;a=parseFloat(a);var e=c?d._nodeById(c):d._activeNode();if(e)return a>=0?(d.pause(c),e._pos=a,d.play(e._sprite,c),d):d._webAudio?e._pos+(b.currentTime-d._playStart):e.currentTime;if(a>=0)return d;for(var f=0;f<d._audioNode.length;f++)if(d._audioNode[f].paused&&4===d._audioNode[f].readyState)return d._webAudio?d._audioNode[f]._pos:d._audioNode[f].currentTime},pos3d:function(a,b,c,d){var e=this;if(b="undefined"!=typeof b&&b?b:0,c="undefined"!=typeof c&&c?c:-.5,!e._loaded)return e.on("play",function(){e.pos3d(a,b,c,d)}),e;if(!(a>=0||0>a))return e._pos3d;if(e._webAudio){var f=d?e._nodeById(d):e._activeNode();f&&(e._pos3d=[a,b,c],f.panner.setPosition(a,b,c),f.panner.panningModel=e._model||"HRTF")}return e},fade:function(a,b,c,d,e){var f=this,g=Math.abs(a-b),h=a>b?"down":"up",i=g/.01,j=c/i;if(!f._loaded)return f.on("load",function(){f.fade(a,b,c,d,e)}),f;f.volume(a,e);for(var k=1;i>=k;k++)!function(){var a=f._volume+("up"===h?.01:-.01)*k,c=Math.round(1e3*a)/1e3,g=b;setTimeout(function(){f.volume(c,e),c===g&&d&&d()},j*k)}()},fadeIn:function(a,b,c){return this.volume(0).play().fade(0,a,b,c)},fadeOut:function(a,b,c,d){var e=this;return e.fade(e._volume,a,b,function(){c&&c(),e.pause(d),e.on("end")},d)},_nodeById:function(a){for(var b=this,c=b._audioNode[0],d=0;d<b._audioNode.length;d++)if(b._audioNode[d].id===a){c=b._audioNode[d];break}return c},_activeNode:function(){for(var a=this,b=null,c=0;c<a._audioNode.length;c++)if(!a._audioNode[c].paused){b=a._audioNode[c];break}return a._drainPool(),b},_inactiveNode:function(a){for(var b=this,c=null,d=0;d<b._audioNode.length;d++)if(b._audioNode[d].paused&&4===b._audioNode[d].readyState){a(b._audioNode[d]),c=!0;break}if(b._drainPool(),!c){var e;b._webAudio?(e=b._setupAudioNode(),a(e)):(b.load(),e=b._audioNode[b._audioNode.length-1],e.addEventListener(navigator.isCocoonJS?"canplaythrough":"loadedmetadata",function(){a(e)}))}},_drainPool:function(){var a,b=this,c=0;for(a=0;a<b._audioNode.length;a++)b._audioNode[a].paused&&c++;for(a=b._audioNode.length-1;a>=0&&!(5>=c);a--)b._audioNode[a].paused&&(b._webAudio&&b._audioNode[a].disconnect(0),c--,b._audioNode.splice(a,1))},_clearEndTimer:function(a){for(var b=this,c=0,d=0;d<b._onendTimer.length;d++)if(b._onendTimer[d].id===a){c=d;break}var e=b._onendTimer[c];e&&(clearTimeout(e.timer),b._onendTimer.splice(c,1))},_setupAudioNode:function(){var a=this,c=a._audioNode,d=a._audioNode.length;return c[d]="undefined"==typeof b.createGain?b.createGainNode():b.createGain(),c[d].gain.value=a._volume,c[d].paused=!0,c[d]._pos=0,c[d].readyState=2,c[d].connect(f),c[d].panner=b.createPanner(),c[d].panner.panningModel=a._model||"equalpower",c[d].panner.setPosition(a._pos3d[0],a._pos3d[1],a._pos3d[2]),c[d].filter=b.createBiquadFilter(),c[d].filter.type="lowpass",c[d].filter.frequency.value=880,c[d].filter.Q.value=0,c[d].filter.gain.value=0,c[d].panner.connect(c[d].filter),c[d].filter.connect(c[d]),c[d]},on:function(a,b){var c=this,d=c["_on"+a];if("function"==typeof b)d.push(b);else for(var e=0;e<d.length;e++)b?d[e].call(c,b):d[e].call(c);return c},off:function(a,b){for(var c=this,d=c["_on"+a],e=b.toString(),f=0;f<d.length;f++)if(e===d[f].toString()){d.splice(f,1);break}return c},unload:function(){for(var b=this,c=b._audioNode,d=0;d<b._audioNode.length;d++)c[d].paused||b.stop(c[d].id),b._webAudio?c[d].disconnect(0):c[d].src="";for(d=0;d<b._onendTimer.length;d++)clearTimeout(b._onendTimer[d].timer);var e=h._howls.indexOf(b);null!==e&&e>=0&&h._howls.splice(e,1),delete a[b._src],b=null}},c)var l=function(c,d){if(d in a)c._duration=a[d].duration,m(c);else{var e=new XMLHttpRequest;e.open("GET",d,!0),e.responseType="arraybuffer",e.onload=function(){b.decodeAudioData(e.response,function(b){b&&(a[d]=b,m(c,b))},function(){c.on("loaderror")})},e.onerror=function(){c._webAudio&&(c._buffer=!0,c._webAudio=!1,c._audioNode=[],delete c._gainNode,c.load())};try{e.send()}catch(f){e.onerror()}}},m=function(a,b){a._duration=b?b.duration:a._duration,0===Object.getOwnPropertyNames(a._sprite).length&&(a._sprite={_default:[0,1e3*a._duration]}),a._loaded||(a._loaded=!0,a.on("load")),a._autoplay&&a.play()},n=function(c,d,e){var f=c._nodeById(e);"undefined"!=typeof a[c._src]&&(f.bufferSource=b.createBufferSource(),f.bufferSource.buffer=a[c._src],f.bufferSource.connect(f.panner),f.bufferSource.loop=d[0],d[0]&&(f.bufferSource.loopStart=d[1],f.bufferSource.loopEnd=d[1]+d[2]),f.bufferSource.playbackRate.value=c._rate)};"function"==typeof define&&define.amd&&define(function(){return{Howler:h,Howl:k}}),"undefined"!=typeof exports&&(exports.Howler=h,exports.Howl=k),"undefined"!=typeof window&&(window.Howler=h,window.Howl=k)}();var getUrlVars=function(){{var a={};window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(b,c,d){a[c]=d})}return a},devMode=getUrlVars().dev,rad=function(a){return a*Math.PI/180},Distance=function(a,b,c){var d=6378137,e=rad(b.lat()-a.lat()),f=rad(b.lng()-a.lng()),g=Math.sin(e/2)*Math.sin(e/2)+Math.cos(rad(a.lat()))*Math.cos(rad(b.lat()))*Math.sin(f/2)*Math.sin(f/2),h=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g)),i=d*h;return"miles"==c&&(i=.000621371192*i),i},Sound=function(a,b,c){var d=this;this.sosv=c,this.data=a,this.map=b,this.sound=null,this.vol=0,this.position=new google.maps.LatLng(this.data.lat,this.data.lng),this.prevUserPosition={lat:null,lng:null},this.prevVolume=0,this.init=function(){$(document.body).on("panoChanged",this.onUserMovement).on("positionChanged",this.onUserMovement).on("povChanged",this.onUserMovement),this.createSound(),this.addSoundToMap()},this.createSound=function(){var a=parseFloat(d.data.pause)?!1:!0;d.sound=new Howl({urls:d.data.src,loop:a,onload:d.onSoundLoaded,onloaderror:d.onSoundLoadError})},this.onSoundLoaded=function(){$(document.body).trigger("soundLoaded",d.data)},this.onSoundLoadError=function(){$(document.body).trigger("soundLoadError",d.data)},this.addSoundToMap=function(){d.data.icon=devMode?null:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",d.data.draggable=devMode?!0:!1,d.sosv.addMarker(d.data),this.updatePan()},this.playSound=function(){d.sound.play(),parseFloat(d.data.pause)&&d.sound.on("end",function(){d.sound.pause(),setTimeout(function(){d.sound.play()},parseInt(d.data.pause))})},this.stopSound=function(){d.sound.stop()},this.unloadSound=function(a){d.sound.fade(d.vol,0,a,function(){d.sound.unload()}),setTimeout(function(){d.sound&&d.sound.unload()},a+50)},this.onUserMovement=function(a,b){var c=b.getPosition().lat(),e=b.getPosition().lng(),f=b.getPov().heading;d.updatePan(c,e,f),d.updateVolume(c,e,b)},this.updatePan=function(a,b,c){var e=d.data.lat-a,f=d.data.lng-b,g=Math.atan2(f,e)*(180/Math.PI);g-=c,-180>g?g+=360:g>180&&(g-=360);var h=g/90;if(Math.abs(h)>1){var i=Math.abs(h)-1;h=h>0?1-i:-1+i}d.sound.pos3d(h,1,1);var j=11e3;Math.abs(g)>90&&(j-=55*(Math.abs(g)-90)),d.sound.filter(j)},this.updateVolume=function(a,b,c){if(a!==d.prevUserPosition.lat||b!==d.prevUserPosition.lng){var e=Distance(d.position,c.getPosition());d.vol=d.calculateVolume(e),d.sound.fade(d.prevVolume,d.vol,500),d.prevVolume=d.vol,d.prevUserPosition.lat=a,d.prevUserPosition.lng=b}},this.calculateVolume=function(a){return d.vol=1/(a*a),d.vol=Math.min(d.vol*d.data.db,1),d.vol},this.init()},SOSV=function(a){var b,c,d=this,e=[],f=[],g=0;this.init=function(){return this.webApiTest?($(document.body).on("soundLoaded",this.onSoundLoaded).on("soundLoadError",this.onSoundLoaded).on("changeLocation",this.onChangeLocation).on("panoChanged",this.showUserData).on("povChanged",this.showUserData).on("positionChanged",this.showUserData).on("markerClicked",this.showMarkerData).on("markerDragEnd",this.showMarkerData),devMode&&this.addDevModeMarkup(),void $.getJSON(a,this.onJsonLoaded)):void alert("Your browser does not support the Web Audio API!")},this.webApiTest=function(){var a;return"undefined"!=typeof AudioContext?a=new AudioContext:"undefined"!=typeof webkitAudioContext&&(a=new webkitAudioContext),a?!0:!1},this.onJsonLoaded=function(a){g=a.sounds.length,d.createStreetView(a),d.loadSounds(a),g||d.onSoundLoaded(null)},this.createStreetView=function(a){b=$("#"+a.id),c=new google.maps.StreetViewPanorama(document.getElementById(a.id),{position:new google.maps.LatLng(a.lat,a.lng),pov:{heading:Number(a.heading),pitch:Number(a.pitch)}}),google.maps.event.addListener(c,"pano_changed",this.onPanoChanged),google.maps.event.addListener(c,"position_changed",this.onPositionChanged),google.maps.event.addListener(c,"pov_changed",this.onPovChanged)},this.addMarker=function(a){var b=new google.maps.Marker({map:c,title:a.name,position:new google.maps.LatLng(a.lat,a.lng),draggable:a.draggable,icon:a.icon});e.push(b),google.maps.event.addListener(b,"click",function(c){$(document.body).trigger("markerClicked",[c,b,a])}),google.maps.event.addListener(b,"dragend",function(c){$(document.body).trigger("markerDragEnd",[c,b,a])})},this.onPanoChanged=function(){b.trigger("panoChanged",c)},this.onPositionChanged=function(){b.trigger("positionChanged",c)},this.onPovChanged=function(){b.trigger("povChanged",c)},this.loadSounds=function(a){for(var b=0;b<a.sounds.length;b++){var e=new Sound(a.sounds[b],c,d);f.push(e)}},this.onSoundLoaded=function(){g--,0>=g&&d.playSounds()},this.playSounds=function(){for(var a=0;a<f.length;a++)f[a].playSound(),f[a].onUserMovement(null,c)},this.showUserData=function(a,b){$("#user-pos").find(".user-lat").text(b.getPosition().lat()).end().find(".user-lng").text(b.getPosition().lng()).end().find(".user-heading").text(b.getPov().heading).end().find(".user-pitch").text(b.getPov().pitch)},this.showMarkerData=function(a,b,c,d){var e=d;delete e.icon,delete e.draggable,e.lat=""+b.latLng.lat(),e.lng=""+b.latLng.lng();var f=JSON.stringify(e,null," ");$("#marker-pos").find(".json-pre").html(f)},this.addDevModeMarkup=function(){var a=$('<div id="user-pos"></div>');a.append("<h2>User</h2>").css({margin:"1em 0 0.3em 0","border-bottom":"1px solid #181818","padding-bottom":".4em"}),a.append('<table><tr><td>Lat</td><td class="user-lat"></td></tr><tr><td>Lng</td><td class="user-lng"></td></tr><tr><td>Heading</td><td class="user-heading"></td></tr><tr><td>Pitch</td><td class="user-pitch"></td></tr></table>');var b=$('<div id="marker-pos" ></div>');b.append("<h2>Marker</h2>").css({margin:"1em 0 0.3em 0","border-bottom":"1px solid #181818","padding-bottom":".4em"}),b.append('<pre class="json-pre"></pre>').css({"line-height":"1.3em"});var c=$('<div id="debug-wrap"></div>').append(a).append(b).css({position:"absolute","min-width":"350px","font-family":"sans-serif","font-size":"1em",top:"10px",right:"10px",padding:"1.4em 2em",background:"#fff"});$("body").append(c)},this.init()};