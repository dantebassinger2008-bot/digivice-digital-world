const $=id=>document.getElementById(id);
const roster=[
 {name:"Agumon",species:"Reptile",emoji:"🦖",desc:"A brave little reptile Digimon with a big heart. Bold, curious, and sometimes impulsive.",mood:"Excited",style:"bold"},
 {name:"Gabumon",species:"Beast",emoji:"🐺",desc:"A thoughtful and loyal partner who watches carefully before acting. Quietly courageous.",mood:"Calm",style:"thoughtful"},
 {name:"Renamon",species:"Beast Man",emoji:"🦊",desc:"A focused, observant partner who values skill, independence, and trust earned through action.",mood:"Focused",style:"reserved"},
 {name:"Patamon",species:"Mammal",emoji:"🐹",desc:"An upbeat, affectionate partner whose courage can surprise even stronger opponents.",mood:"Cheerful",style:"playful"},
 {name:"Gomamon",species:"Sea Animal",emoji:"🦭",desc:"A funny, adventurous partner who loves exploring and refuses to leave a friend behind.",mood:"Playful",style:"playful"},
 {name:"Dorumon",species:"Beast",emoji:"🐲",desc:"A curious, energetic partner with mysterious data and a strong instinct to protect friends.",mood:"Curious",style:"bold"}
];
const regions=["File Island — Misty Coast","Binary Forest — Sector 03","Chrome Canyon — Data Ridge","Neon City — East Server","Ancient Net — Ruins of Code"];
const events=["A small Digimon peeks from behind a tree, then vanishes into the undergrowth.","You find a glowing data fragment half-buried in the ground.","A distant roar echoes through the region. Your partner moves closer to you.","An abandoned terminal flickers to life and displays a strange symbol.","You discover a quiet clearing. The air hums with digital energy.","A group of friendly Digimon wave from a nearby settlement."];
let game=JSON.parse(localStorage.getItem("digiviceSave")||"null")||{started:false,partner:null,bond:0,energy:100,level:1,evo:0,trust:0,mood:"Unknown",owner:"",nickname:"",region:regions[0],log:[],chat:[]};
function save(){localStorage.setItem("digiviceSave",JSON.stringify(game));render()}
function active(){return game.started&&game.partner}
function name(){return game.nickname||game.partner?.name||"Partner"}
function render(){
 $("partnerName").textContent=active()?name():"Your partner awaits.";
 $("partnerLine").textContent=active()?game.partner.desc:"Choose your first partner to begin.";
 $("partnerEmoji").textContent=active()?game.partner.emoji:"❔";
 $("startBtn").textContent=active()?"PARTNER LINK ACTIVE":"INITIALIZE DEVICE";
 $("stage").textContent=active()?(game.level>1?"CHAMPION":"ROOKIE"):"UNLINKED";
 $("bond").textContent=active()?game.bond+"/100":"—";$("energy").textContent=active()?game.energy+"%":"—";$("level").textContent=active()?game.level:"—";
 $("bondBar").style.width=(game.bond||0)+"%";$("evoBar").style.width=(game.evo||0)+"%";
 $("activity").textContent=game.log[0]||"No activity recorded. Your adventure begins when you initialize your Digivice.";
 $("profileName").textContent=active()?name():"No partner linked";$("profileDesc").textContent=active()?game.partner.desc:"Initialize your Digivice to meet your partner.";
 $("mood").textContent=active()?game.mood:"—";$("trust").textContent=active()?game.trust+"/100":"—";$("species").textContent=active()?game.partner.species:"—";
 $("chatTitle").textContent=active()?name()+" // CHANNEL":"Partner communication";$("regionName").textContent=game.region;
 $("fieldLog").innerHTML=game.log.length?game.log.slice(0,8).map(x=>`<div class="event">${esc(x)}</div>`).join(""):"No discoveries yet.";
 $("chatlog").innerHTML=game.chat.length?game.chat.slice(-35).map(m=>`<div class="msg ${m.who==="YOU"?"me":"partner"}"><div class="who">${esc(m.who)}</div>${esc(m.text)}</div>`).join(""):'<div class="muted small">Initialize your Digivice to open the partner channel.</div>';
 $("ownerName").value=game.owner||"";$("nickname").value=game.nickname||"";
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function addLog(t){game.log.unshift(t);game.log=game.log.slice(0,30)}
function say(who,text){game.chat.push({who,text});game.chat=game.chat.slice(-60);save();$("chatlog").scrollTop=$("chatlog").scrollHeight}
function initialize(){
 if(active()){say(name(),"I'm right here! Where should we go next?");return}
 const p=roster[Math.floor(Math.random()*roster.length)];
 game.started=true;game.partner=p;game.bond=12;game.energy=100;game.level=1;game.evo=0;game.trust=8;game.mood=p.mood;game.region=regions[Math.floor(Math.random()*regions.length)];
 addLog("Partner link established: "+p.name+" joined your adventure.");
 game.chat=[{who:p.name,text:"H-hello! You must be my human partner. I'm "+p.name+"! So... what should we do first?"}];save();showTab("chat");
}
$("startBtn").onclick=initialize;
function reply(input){
 const s=input.toLowerCase(),p=game.partner,owner=game.owner||"partner";
 if(/hello|hi|hey/.test(s))return "Hey"+(game.owner?", "+game.owner:"")+"! I was hoping you'd talk to me.";
 if(/name|who are you/.test(s))return "I'm "+name()+", your partner Digimon. And you're stuck with me now. (Not that I'm complaining!)";
 if(/love|like you|friend|trust/.test(s))return "That means a lot. I want us to become a team we can both count on.";
 if(/scared|afraid|danger/.test(s))return p.style==="bold"?"I'm nervous too... but I'll stand with you. We face it together!":"Being careful is smart. Stay close and we'll work through it together.";
 if(/fight|battle|strong|train/.test(s))return "Then let's get stronger! Training together is how we'll build our teamwork.";
 if(/evolve|digivolve/.test(s))return game.evo>=100?"I can feel my data changing... maybe we're ready!":"I can feel evolution data building. Keep training and looking out for each other.";
 if(/tired|sleep|rest/.test(s))return "A little rest sounds good. Even Digimon need to recharge.";
 if(/world|where|explore/.test(s))return "This place is full of strange data. Let's explore carefully. I want to see what's beyond that horizon!";
 if(/sorry|mad|angry/.test(s))return "It's okay. Partners won't always agree. What matters is that we listen and keep trying.";
 const lines=p.style==="bold"?["Let's do it! I don't know exactly what's ahead, but we'll figure it out!","Heh, sounds like an adventure. I'm in!","I'll watch your back. You watch mine, okay?"]:p.style==="thoughtful"?["Interesting. Tell me more; I want to understand what you're thinking.","We should consider our options, then make a plan together.","I'll remember that. It could matter later."]:p.style==="reserved"?["I hear you. I'll think about what you said.","Actions matter more than promises. Let's keep building our trust.","Stay observant. The Digital World can surprise us."]:["Oh! That's interesting! What happens next?","I'm glad we're partners. Let's go find something amazing!","You can count on me. I won't leave you behind!"];
 return lines[Math.floor(Math.random()*lines.length)];
}
function sendChat(){if(!active())return;let v=$("chatInput").value.trim();if(!v)return;$("chatInput").value="";game.bond=Math.min(100,game.bond+1);game.trust=Math.min(100,game.trust+1);say("YOU",v);setTimeout(()=>say(name(),reply(v)),180)}
$("sendBtn").onclick=sendChat;$("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")sendChat()});
function care(kind){if(!active())return alert("Initialize your Digivice first.");let msg="";
 if(kind==="train"){if(game.energy<15)return alert("Your partner needs rest first.");game.energy-=15;game.evo=Math.min(100,game.evo+12);game.level+=game.evo>=100?0:0;game.mood="Determined";msg="Training complete. Your partner gained evolution data."}
 if(kind==="rest"){game.energy=Math.min(100,game.energy+35);game.mood="Relaxed";msg="Your partner rested and recovered energy."}
 if(kind==="encourage"){game.bond=Math.min(100,game.bond+8);game.trust=Math.min(100,game.trust+7);game.mood="Encouraged";msg="Your partner feels supported. Your bond grew."}
 if(kind==="talk"){game.bond=Math.min(100,game.bond+3);game.trust=Math.min(100,game.trust+2);msg="You spent some time talking together."}
 addLog(msg);say(name(),kind==="train"?"That was a good workout! I can feel my data getting stronger.":kind==="rest"?"Thanks. I feel much better now.":kind==="encourage"?"I won't forget that. I'll keep getting stronger with you.":"I like spending time with you. Tell me what's on your mind.");save();
}
function explore(){if(!active())return alert("Initialize your Digivice first.");let e=events[Math.floor(Math.random()*events.length)];game.region=regions[Math.floor(Math.random()*regions.length)];if(e.includes("fragment")){game.evo=Math.min(100,game.evo+8);game.energy=Math.max(0,game.energy-3)}if(e.includes("friendly")){game.bond=Math.min(100,game.bond+5);game.trust=Math.min(100,game.trust+3)}$("worldEvent").textContent=e;addLog(game.region+": "+e);say(name(),e.includes("roar")?"Did you hear that? Let's be ready.":e.includes("fragment")?"Look! That data fragment might help me grow.":"There's so much to discover here!");save()}
function battle(){if(!active())return alert("Initialize your Digivice first.");if(game.energy<20)return $("battleLog").textContent="Your partner is too tired. Rest before battling.";let foe=["Kuwagamon","Goblimon","Drimogemon","Raremon"][Math.floor(Math.random()*4)],power=25+Math.floor(Math.random()*65)+game.bond*.25+game.level*4;game.energy-=20;let win=power>48;let msg=win?`${name()} used a powerful attack and drove ${foe} back! You gained battle data.`:`${foe} overwhelmed ${name()}! You retreated safely, but your partner needs rest.`;if(win){game.evo=Math.min(100,game.evo+15);game.bond=Math.min(100,game.bond+4);game.trust=Math.min(100,game.trust+3)}else{game.mood="Shaken";game.energy=Math.max(0,game.energy-10)}$("battleLog").textContent=msg;addLog("Battle: "+msg);say(name(),win?"We did it! That was close, but we make a great team!":"I'm okay... let's get stronger before we try that again.");save()}
function evolveCheck(){if(!active())return;if(game.evo>=100&&game.bond>=50&&game.level===1){game.level=2;game.mood="Proud";game.evo=0;addLog(name()+" reached a new evolution stage!");$("evoMessage").textContent="Evolution event unlocked! This prototype records Champion-stage progression; full animated evolution is planned for a later build.";say(name(),"I can feel it! Our bond and all that training... it's changing my data!");save()}else $("evoMessage").textContent=`Not ready yet. Need 100 evolution data and 50 bond. Current: ${game.evo} data, ${game.bond} bond.`}
function saveSettings(){game.owner=$("ownerName").value.trim();game.nickname=$("nickname").value.trim();save();alert("Device settings saved.")}
function exportSave(){let a=document.createElement("a"),b=new Blob([JSON.stringify(game,null,2)],{type:"application/json"});a.href=URL.createObjectURL(b);a.download="digivice-save.json";a.click();URL.revokeObjectURL(a.href)}
function resetGame(){if(confirm("Erase this Digivice save from this browser? Export a backup first if you want to keep it.")){localStorage.removeItem("digiviceSave");location.reload()}}
function showTab(tab){document.querySelectorAll(".section").forEach(x=>x.classList.toggle("active",x.id===tab));document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab))}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();
