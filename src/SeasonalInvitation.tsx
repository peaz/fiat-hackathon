import {activities} from './garden';
import {PixelButton} from './ui/PixelButton';

export const seasons = [
 {id:'everyday',name:'Everyday discipleship',theme:'Put received gifts into everyday service.',invitation:'Notice a need close to home. Offer your attention or a useful skill, and learn what thoughtful care involves.',ids:['listen','skill','repair']},
 {id:'advent',name:'Advent',theme:'Make room for hope and welcome.',invitation:'Practise welcoming someone or preparing useful support around a real need. Let preparation become a gift of time.',ids:['welcome','packs']},
 {id:'lent',name:'Lent',theme:'Reflect on how you use and share your gifts.',invitation:'Consider what is needed before offering resources. Take time for prayer and reflection freely; neither is scored.',ids:['listen','repair','packs']},
 {id:'easter',name:'Easter',theme:'Share joy through belonging and service.',invitation:'Make space for a new connection. Share something you know, or prepare a gathering where people can feel welcome.',ids:['welcome','story','skill']},
];
export const missionMeaning: Record<string, {why:string;connection:string;reflection:string}> = {
 listen:{why:'Thoughtful care starts by hearing what someone needs.',connection:'Offer attention as a gift of time, recognising the dignity of the person beside you.',reflection:'What did someone teach you, and how did listening express your faith?'},
 welcome:{why:'A newcomer may need a person who makes the first introduction.',connection:'Hospitality gives a practical expression to belonging in the Church.',reflection:'What helped someone feel included, and what could you offer next?'},
 packs:{why:'Useful support depends on an organiser’s needs, not what is easiest to give.',connection:'Stewardship means caring responsibly for resources entrusted to us.',reflection:'How did checking the actual need change what your group would offer?'},
 story:{why:'Belonging grows when people can share freely and be heard.',connection:'Different gifts and experiences can build communion within a parish.',reflection:'What did you learn from another person, and how did it shape your understanding of community?'},
 skill:{why:'Sharing a skill can help another person participate with confidence.',connection:'Talent becomes a contribution to a shared mission when offered with patience.',reflection:'Which received gift did you share, and what did learning together teach you?'},
 repair:{why:'Usable resources can keep serving a purpose when cared for thoughtfully.',connection:'Gratitude can become responsible care for what we have, before we acquire or pass on more.',reflection:'How did caring for a resource help you think differently about giving?'},
};

export function SeasonalInvitation({seasonId,onSeason,onActivity,done}:{seasonId:string;onSeason:(id:string)=>void;onActivity:(id:string)=>void;done:string[]}) {
 const season=seasons.find(s=>s.id===seasonId)||seasons[0];
 return <section className="seasonal-invitation"><h3>Understand. Connect. Contribute.</h3><p>Learn why a cause matters, meet people in your parish, and offer a gift that fits your life.</p><label>Explore a seasonal invitation<select value={season.id} onChange={e=>onSeason(e.target.value)}>{seasons.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label><h4>{season.theme}</h4><p>{season.invitation}</p><div className="seasonal-acts">{season.ids.map(id=>{const a=activities.find(a=>a.id===id)!;return <PixelButton key={id} variant="secondary" onClick={()=>onActivity(id)}>{done.includes(id)?'Revisit: ':''}{a.title}</PixelButton>;})}</div><small>Optional preview themes, not the current liturgical calendar or a parish programme. You can explore any season; nothing expires and there is no bonus for finishing every act.</small></section>;
}
