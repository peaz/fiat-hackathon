import {useRef, useState} from 'react';
import {activities, personalGoals, personalGrowth, preparePlan, type Activity, type ActPlan} from './garden';
import {PixelButton} from './ui/PixelButton';

export function ActPlanner({activity, plan, onSave, onRemove}: {activity: Activity; plan?: ActPlan; onSave: (p: ActPlan)=>void; onRemove: ()=>void}) {
 const cueRef=useRef<HTMLInputElement>(null);
 const [draft, setDraft] = useState<ActPlan>(plan || {cue:'', place:'', support:''});
 const [saved, setSaved] = useState(false);
 return <section className="act-planner"><h3>Make room for this act</h3><p>An optional plan can help turn a good intention into a practical next step.</p>
 <form onSubmit={e=>{e.preventDefault(); const clean=preparePlan(draft); if(clean){onSave(clean);setDraft(clean);setSaved(true);}}}>
 <label>When would you begin?<input ref={cueRef} required maxLength={120} value={draft.cue} placeholder="e.g. After our Saturday circle gathering" onChange={e=>{setDraft(p=>({...p,cue:e.target.value}));setSaved(false);}}/></label>
 <label>Where or in what setting?<input required maxLength={120} value={draft.place} placeholder="e.g. In our parish meeting room" onChange={e=>{setDraft(p=>({...p,place:e.target.value}));setSaved(false);}}/></label>
 <label>What would help? (optional)<input maxLength={120} value={draft.support} placeholder="e.g. Ask a friend to bring simple materials" onChange={e=>{setDraft(p=>({...p,support:e.target.value}));setSaved(false);}}/></label>
 <div className="reflection-actions"><PixelButton type="submit" variant="secondary" disabled={!preparePlan(draft)}>Save my plan</PixelButton>{plan&&<button type="button" className="text-button" onClick={()=>{onRemove();setDraft({cue:'',place:'',support:''});setSaved(false);cueRef.current?.focus();}}>Let this plan go</button>}</div>
 {saved&&<p role="status">Your plan for “{activity.title}” is saved.</p>}
 </form><small>A personal plan, not a booking or reminder. You can change it or let it go. Planning earns no loaves & fish.</small></section>;
}

export function StewardshipJourney({gratitude,onGratitude,plans,done,goalId,onActivity,onQuests,onPathways,showTokens,onTokens}: {
 gratitude:string;onGratitude:(s:string)=>void;plans:Record<string,ActPlan>;done:string[];goalId:string;onActivity:(a:Activity)=>void;onQuests:()=>void;onPathways:()=>void;showTokens:boolean;onTokens:(b:boolean)=>void;
}) {
 const [draft,setDraft]=useState(gratitude); const [saved,setSaved]=useState(false);
 const growth=personalGrowth(done);const goal=personalGoals.find(g=>g.id===goalId)||personalGoals[0];
 const pending=activities.filter(a=>plans[a.id]&&!done.includes(a.id));
 return <section className="stewardship-journey" aria-labelledby="stewardship-title"><p className="eyebrow">Receive · Choose · Plan · Act · Reflect · Renew</p><h3 id="stewardship-title">Let a gift become a small act</h3><p>Begin with what you have received. Choose a way to share that fits your life, then return when you’re ready.</p>
 <form onSubmit={e=>{e.preventDefault();onGratitude(draft.trim());setSaved(true);}}><label>A gift I’m grateful for (optional)<textarea maxLength={300} value={draft} onChange={e=>{setDraft(e.target.value);setSaved(false);}} placeholder="Someone’s patience, a skill I learned, time to listen…"/></label><PixelButton type="submit" variant="secondary">Save my gratitude</PixelButton>{saved&&<p role="status">Saved. Gratitude is personal and earns no loaves & fish.</p>}</form>
 <p><strong>The intention you chose</strong><br/>{goal.title}</p>
 <h4>Your next small commitment</h4>{pending.length?pending.map(a=><article className="planned-act" key={a.id}><strong>{a.title}</strong><p>When {plans[a.id].cue}, I’ll make time for this act in {plans[a.id].place}.</p>{plans[a.id].support&&<p>What would help: {plans[a.id].support}</p>}<button className="text-button" onClick={()=>onActivity(a)}>Review or change this plan</button></article>):<p>No act planned. Explore the quest board and save a plan inside an activity when it feels right.</p>}
 <div className="reflection-actions"><PixelButton onClick={onQuests}>Choose a activity</PixelButton><PixelButton variant="secondary" onClick={onPathways}>Explore real pathways</PixelButton></div>
 <h4>Different gifts, one garden</h4><div className="gift-branches">{growth.gifts.map(g=><p key={g.kind}><strong>{g.kind}</strong><span>{g.count?`${g.count} ${g.count===1?'act':'acts'} recorded`:'Room to explore, if you wish'}</span></p>)}</div><p>You can keep tending the cause you love or try another way to share. There’s no requirement to fill every branch.</p>
 <label className="check"><input type="checkbox" checked={showTokens} onChange={e=>onTokens(e.target.checked)}/>Show loaves & fish balance</label><small>Every unique activity receives the same 2 fish. No rankings, deadlines or lost streaks. Your garden stays with you when you pause. Real giving, prayer, plans and reflections earn no loaves & fish.</small>
 <details className="journey-sources"><summary>What inspired this journey?</summary><p>Toronto pairs gift discovery with ministry invitations and personal commitments. St. Louis connects gratitude, formation and sharing. Perth helps people understand a need before acting together. These ideas inspire gratitude, shared service and thoughtful giving.</p><p><a href="https://www.archtoronto.org/stewardship" target="_blank" rel="noreferrer">Toronto stewardship</a> · <a href="https://www.archstl.org/about/offices-and-agencies/stewardship-office/" target="_blank" rel="noreferrer">St. Louis stewardship</a> · <a href="https://lifelink.com.au/lifelink-day-2026-primary-schools/" target="_blank" rel="noreferrer">Perth LifeLink</a></p></details>
 </section>;
}
