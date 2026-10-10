import {useEffect,useRef,useState} from 'react';
const encouragements=[
 {words:'Give freely, as you have freely received.',reference:'Matthew 10:8'},
 {words:'What you do for the least of my brothers and sisters, you do for me.',reference:'Matthew 25:40'},
 {words:'Love one another as I have loved you.',reference:'John 13:34'},
 {words:'Let your light shine through your good works.',reference:'Matthew 5:16'},
 {words:'Come to me when you are weary; I will give you rest.',reference:'Matthew 11:28'},
 {words:'Give, and it will be given to you.',reference:'Luke 6:38'},
 {words:'Even a cup of water offered with care matters.',reference:'Matthew 10:42'},
 {words:'Do not be afraid, little flock.',reference:'Luke 12:32'}
];
export function JesusArt(){return <svg viewBox="0 0 40 64" aria-hidden="true" shapeRendering="crispEdges"><path fill="#e9b957" d="M8 2h24v4H8z"/><path fill="#806044" d="M12 10h16v22H12z"/><path fill="#e7b48b" d="M15 13h10v14H15zM5 31h6v13H5zM29 31h6v13h-6z"/><path fill="#806044" d="M16 23h8v7h-8z"/><path fill="#f6e9cb" d="M11 30h18v12h-2v16H13V42h-2z"/><path fill="#ae4936" d="M23 30h6v6h-6zM19 36h6v8h-6zM15 44h6v14h-6z"/><path fill="#806044" d="M12 58h7v4h-7zM22 58h7v4h-7z"/></svg>}
export function ScriptureEncounter({pos}:{pos:{x:number;y:number}}){
 const position=useRef(pos);position.current=pos;
 const [visit,setVisit]=useState<{x:number;y:number;verse:typeof encouragements[number];phase:'appearing'|'present'|'leaving'}|null>(null);
 useEffect(()=>{
  let timer:ReturnType<typeof setTimeout>;let alive=true;let active=false;
  const schedule=()=>{timer=setTimeout(appear,(20+Math.random()*30)*60000);};
  const appear=()=>{if(active||!alive)return;clearTimeout(timer);active=true;const p=position.current;setVisit({x:Math.min(95,Math.max(5,p.x+2)),y:Math.min(95,Math.max(5,p.y)),verse:encouragements[Math.floor(Math.random()*encouragements.length)],phase:'appearing'});timer=setTimeout(()=>{setVisit(v=>v?{...v,phase:'present'}:null);timer=setTimeout(()=>{setVisit(v=>v?{...v,phase:'leaving'}:null);timer=setTimeout(()=>{active=false;setVisit(null);schedule();},400);},60000);},400);};
  const key=(e:KeyboardEvent)=>{const target=e.target as HTMLElement;if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||target.closest('input,textarea,select,[contenteditable="true"]'))return;if(e.key.toLowerCase()==='j'){e.preventDefault();appear();}};
  timer=setTimeout(appear,60000);window.addEventListener('keydown',key);window.addEventListener('garden-jesus',appear);
  return()=>{alive=false;clearTimeout(timer);window.removeEventListener('keydown',key);window.removeEventListener('garden-jesus',appear);};
 },[]);
 if(!visit)return null;return <div className={`jesus-visitor ${visit.phase}`} style={{left:`${visit.x}%`,top:`${visit.y}%`}}><div className="jesus-speech" role="status"><p>{visit.verse.words}</p><small>{visit.verse.reference} · Scripture paraphrase</small></div><JesusArt/><span className="jesus-name">Jesus</span></div>;
}
export function WanderingSheep(){const [tick,setTick]=useState(0);useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setInterval(()=>{if(!document.hidden)setTick(t=>t+1);},850);return()=>clearInterval(timer);},[]);return <div className="wandering-sheep" aria-hidden="true">{[[36,30],[47,28],[64,50],[72,71],[25,72],[58,20],[82,30],[39,78]].map(([x,y],i)=>{const step=(tick+i*3)%24;const dx=step<12?step:24-step;return <span key={i} style={{left:`${x+dx*.22}%`,top:`${y+Math.floor(dx/3)*.3}%`}}><svg viewBox="0 0 48 32" shapeRendering="crispEdges" style={{transform:step<12?'none':'scaleX(-1)'}}><ellipse cx="24" cy="29" rx="20" ry="3" fill="#806044" opacity=".4"/><path fill="#18243d" d="M11 23h5v7h-5zM29 23h5v7h-5zM34 11h10v13H34zM40 8h6v5h-6z"/><path fill="#f6e9cb" d="M10 6h22v3h5v14h-5v4H10v-4H5V9h5z"/><path fill="#fff3d6" d="M12 9h17v5H12z"/><path fill="#f6e9cb" d="M41 14h2v2h-2z"/></svg></span>})}</div>}
