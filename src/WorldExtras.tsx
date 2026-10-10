import {useState} from 'react';
import {PixelButton} from './ui/PixelButton';
import {personalGoals} from './garden';
export const organisations=[
 {id:'caritas',name:'Caritas Singapore',cause:'Care for neighbours',x:30,y:60,kind:'Presence',ids:['listen','packs'],description:'Caritas Singapore supports a network of Catholic social mission organisations serving people in need, regardless of race or religion.',url:'https://www.caritas-singapore.org/',lesson:'A useful gift begins with listening to what is needed. Time, skills and resources can work together.'},
 {id:'one',name:'ONE',cause:'Welcome & belonging',x:55,y:60,kind:'Welcome',ids:['welcome','story'],description:'The Office for the New Evangelisation guides efforts to encourage Catholics to participate in the Church’s evangelising mission.',url:'https://one.org.sg/',lesson:'What you have received can become a welcome for someone else. A conversation can be a generous gift.'},
 {id:'charis',name:'CHARIS',cause:'Humanitarian care',x:80,y:60,kind:'Presence',ids:['packs'],description:'CHARIS is the Archdiocese’s umbrella body for overseas humanitarian aid and disaster relief efforts.',url:'https://charis-singapore.org/about/',lesson:'Before sending goods, learn what responders actually need. Thoughtful support respects local knowledge.'},
 {id:'cf',name:'Catholic Foundation',cause:'Church mission',x:55,y:40,kind:'Skills',ids:['skill'],description:'Catholic Foundation promotes Christian giving and stewardship of funds supporting the needs of the Catholic Archdiocese of Singapore.',url:'https://www.catholicfoundation.sg/why-gift',lesson:'Money is one resource entrusted to us. Caring for responsibilities, planning wisely and freely sharing what we can are part of stewardship.'},
 {id:'CLC',name:'Catholic Leadership Centre',cause:'leadership',x:30,y:84,kind:'Presence',ids:[],description:'Formation and accompaniment for Catholic leaders.',url:'https://catholicleader.sg/',lesson:'Learning to accompany others can help a gift of time become more thoughtful.'},
 {id:'ACCS',name:'Catholic Schools',cause:'education',x:30,y:28,kind:'Skills',ids:[],description:'The Archdiocesan Commission for Catholic Schools supports Catholic school ethos and educators.',url:'https://www.accs.sg/',lesson:'Supporting those who teach is one way to care for the next generation.'},
 {id:'CTIS',name:'CTIS',cause:'faith-understanding',x:55,y:84,kind:'Skills',ids:[],description:'The Catholic Theological Institute of Singapore offers structured theological learning.',url:'https://www.ctis.sg/programmes',lesson:'Formation helps us understand the faith we hope to share.'},
 {id:'DCO',name:'Digital Church Office',cause:'digital-service',x:80,y:40,kind:'Skills',ids:[],description:'Digital innovation for Church and community, including the FIAT Catholic Hackathon.',url:'https://mycatholic.sg/hackathon/',lesson:'Professional and creative gifts can serve a shared mission.'},
 {id:'OFC',name:'Office for Catechesis',cause:'children-faith',x:30,y:40,kind:'Welcome',ids:[],description:'Catechist formation, Christian initiation and pathways for inclusive catechesis.',url:'https://www.catechesis.org.sg/',lesson:'Preparing well before serving is care for those who will rely on us.'},
 {id:'OYP',name:'Office for Young People',cause:'youth-belonging',x:80,y:84,kind:'Welcome',ids:[],description:'Encounter, formation and communities for young people.',url:'https://www.oyp.org.sg/',lesson:'A community can help a young person discover gifts and belonging.'}
];
export type Profile={name:string;gifts:string[];causes:string[];capacity:string};
export const defaultProfile:Profile={name:'Neighbour',gifts:['Time'],causes:['welcoming-community'],capacity:'One small act'};
const profileCauses=[
 {label:'Belonging',ids:['welcoming-community','inclusion']},
 {label:'Care for neighbours',ids:['accompaniment','practical-service']},
 {label:'Children & youth',ids:['children-faith','youth-belonging']},
 {label:'Education',ids:['education','educator-support']},
 {label:'Growing in faith',ids:['faith-understanding','access-to-formation']},
 {label:'Creative & digital gifts',ids:['creative-service','digital-service']},
 {label:'Care for seniors',ids:['ageing-with-dignity','clergy-care']},
 {label:'Church community',ids:['leadership','church-future','stewardship']}
];
export function ProfilePanel({profile,onSave,goalId,onGoal}:{profile:Profile;onSave:(p:Profile)=>void;goalId:string;onGoal:(id:string)=>void}){
 const [draft,setDraft]=useState(profile);const [intention,setIntention]=useState(goalId);
 function toggleGift(value:string){setDraft(p=>({...p,gifts:p.gifts.includes(value)?p.gifts.filter(v=>v!==value):[...p.gifts,value]}));}
 function toggleCause(ids:string[]){setDraft(p=>({...p,causes:ids.some(id=>p.causes.includes(id))?p.causes.filter(id=>!ids.includes(id)):[...p.causes,...ids]}));}
 return <form className="profile-form profile-cloud" onSubmit={e=>{e.preventDefault();onGoal(intention);onSave({...draft,name:draft.name.trim()||'Neighbour'});}}>
 <p>Choose a few gifts and causes that feel close to you.</p><label>Gardener nickname<input maxLength={24} value={draft.name} onChange={e=>setDraft(p=>({...p,name:e.target.value}))}/></label>
 <fieldset><legend>What could you share?</legend><div className="profile-chips">{['Time','Skills','Listening','Resources'].map(g=><button type="button" key={g} aria-pressed={draft.gifts.includes(g)} onClick={()=>toggleGift(g)}>{g}</button>)}</div></fieldset>
 <fieldset><legend>Causes close to your heart</legend><div className="profile-chips cause-cloud">{profileCauses.map(c=><button type="button" key={c.label} aria-pressed={c.ids.some(id=>draft.causes.includes(id))} onClick={()=>toggleCause(c.ids)}>{c.label}</button>)}</div></fieldset>
 <fieldset><legend>Your personal intention</legend><div className="profile-chips">{personalGoals.map(g=><button type="button" key={g.id} aria-pressed={intention===g.id} onClick={()=>setIntention(g.id)}>{g.title}</button>)}</div></fieldset>
 <fieldset><legend>What fits your life right now?</legend><div className="profile-chips">{['One small act','A shared mission','Just exploring'].map(c=><button type="button" key={c} aria-pressed={draft.capacity===c} onClick={()=>setDraft(p=>({...p,capacity:c}))}>{c}</button>)}</div></fieldset>
 <PixelButton type="submit">Save my profile</PixelButton></form>
}
export function StewardshipStory(){const [choice,setChoice]=useState('');return <div className="stewardship-story"><p className="eyebrow">At the shared tool shed</p><h3>A gift that keeps giving</h3><p>Your circle has a small shared budget. A neighbour suggests buying twelve new tools, but the shed already has tools that can be repaired. Another group needs seeds.</p><p>What would you explore first?</p><div>{[['repair','Check needs, repair tools and discuss sharing the savings'],['buy','Ask whether new tools would solve a real need'],['pause','Pause until the group understands its responsibilities']].map(([id,label])=><button key={id} aria-pressed={choice===id} onClick={()=>setChoice(id)}>{label}</button>)}</div>{choice&&<p role="status">{choice==='repair'?'You make existing resources useful again. The group can freely decide whether the savings should support another need.':choice==='buy'?'Buying can be responsible when it serves a real need. Check what is usable and what will last before deciding.':'Taking time to understand responsibilities is also care. Generosity does not require neglecting essential needs.'} <strong>Stewardship begins with gratitude and thoughtful care for what is entrusted to us.</strong></p>}<small>Take a moment to reflect on how your circle could care for its resources.</small></div>}
