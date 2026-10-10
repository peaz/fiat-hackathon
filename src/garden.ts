export type Community = { id: string; name: string; parish: string; members: number; focus: string; x: number; y: number; growth: number };
export type Activity = { id: string; title: string; org: string; kind: string; size: 'Small act' | 'Shared mission'; minutes: string; tokens: number; capacity?:number; need?:string; source?:string; description: string; outcome: string; steps: string[] };
// Tokens acknowledge demo participation equally, never generosity or gift value.
export const participationTokens = 10;
export const activityCauses: Record<string, string[]> = {
 listen: ['accompaniment', 'practical-service'], welcome: ['welcoming-community', 'youth-belonging'],
 packs: ['practical-service', 'stewardship'], story: ['welcoming-community', 'faith-understanding'],
 palms:['practical-service','welcoming-community'], errands:['practical-service','accompaniment'], manna:['accompaniment','welcoming-community'],
 skill: ['education', 'creative-service', 'digital-service'], repair: ['stewardship', 'practical-service'],
};
export type ActPlan = { cue: string; place: string; support: string };
export function preparePlan(plan: ActPlan): ActPlan | null {
 const clean = {cue: plan.cue.trim().slice(0, 120), place: plan.place.trim().slice(0, 120), support: plan.support.trim().slice(0, 120)};
 return clean.cue && clean.place ? clean : null;
}
export function recommendedActivities(causes: string[], kind: string, size = 'All') {
 const score = (a: Activity) => Number((activityCauses[a.id] || []).some(c => causes.includes(c))) * 10 + Number(a.kind === kind) * 2;
 return [...activities].filter(a => size === 'All' || a.size === size).sort((a, b) => score(b) - score(a));
}
export const communities: Community[] = [
 {id:'olive',name:'Olive Grove',parish:'Church of St Mary of the Angels',members:8,focus:'Presence',x:42,y:18,growth:3},
 {id:'mustard',name:'Mustard Seeds',parish:'Church of St Ignatius',members:11,focus:'Welcome',x:58,y:18,growth:5},
 {id:'fig',name:'The Fig Tree',parish:'Church of St Michael',members:12,focus:'Skills',x:66,y:32,growth:7},
];
export const activities: Activity[] = [
 {id:'listen',title:'Make room for a story',org:'Caritas-inspired example',kind:'Presence',size:'Small act',minutes:'30 minutes',tokens:10,description:'Practise listening in your circle, then prepare for an organisation-led befriending activity. Real visits require an approved organiser.',outcome:'Your circle prepares to offer companionship with care.',steps:['Pair up within your circle.','Take turns listening without interrupting.','Share one thing you learned about listening.']},
 {id:'welcome',title:'A little welcome goes a long way',org:'ONE-inspired example',kind:'Welcome',size:'Small act',minutes:'20 minutes',tokens:10,description:'Create a welcome note and practise introducing a newcomer to your parish circle. This is an illustrative activity, not an official ONE programme.',outcome:'A welcoming conversation becomes easier to begin.',steps:['Write a warm welcome note.','Practise a friendly introduction together.','Choose a facilitator to welcome newcomers.']},
 {id:'packs',title:'Twelve hands, one care mission',org:'Caritas-inspired example',kind:'Presence',size:'Shared mission',minutes:'3 steps · 2 hours',tokens:10,description:'Plan a care-pack activity using an organisation-approved needs list. This activity illustrates coordination; it does not collect or deliver goods.',outcome:'Your group practises coordinating useful support around actual needs.',steps:['Ask an organiser what items are needed.','Assign preparation and packing roles.','Arrange an approved handover and reflect together.']},
 {id:'story',title:'Share a story of belonging',org:'ONE-inspired example',kind:'Welcome',size:'Shared mission',minutes:'3 steps · 90 minutes',tokens:10,description:'Prepare a small-group gathering about welcome and belonging. Sharing is voluntary; no personal testimony is uploaded.',outcome:'Your circle practises making space for people to feel heard and included.',steps:['Invite a facilitator and choose a theme.','Prepare a gathering with optional sharing.','Reflect on how to welcome someone next time.']},
 {id:'skill',title:'Pass on something you know',org:'Parish community example',kind:'Skills',size:'Small act',minutes:'45 minutes',tokens:10,description:'Teach a useful skill to your circle: drawing, basic spreadsheets, music or mending. Pick something everyone can try.',outcome:'Your circle practises sharing a useful skill and learning together.',steps:['Choose a skill and simple materials.','Let everyone try it together.','Ask what they would like to learn next.']},
 {id:'repair',title:'Give something useful a second life',org:'Local stewardship practice',kind:'Skills',size:'Small act',minutes:'30 minutes',tokens:10,description:'Inspired by the spirit of reuse in Caritas Manila’s Segunda Mana programme. Practise checking needs and caring for usable resources in your circle. This is an illustrative local activity, not a collection or a Singapore donation programme.',outcome:'Your circle practises keeping useful resources in service and respecting what recipients actually need.',steps:['Choose a safe everyday item, such as a book or pencil case.','Check its condition and clean or make a simple non-electrical repair.','Identify a genuine need before considering any approved handover.']},
 {id:'palms',title:'Prepare palms for Palm Sunday',org:'Parish team',kind:'Skills',size:'Shared mission',minutes:'60 minutes',need:'50 volunteers needed',tokens:10,description:'An example parish appeal for 50 volunteers to prepare palms. This is not a current recruitment notice. A parish organiser would confirm timing, supervision and suitable roles.',outcome:'Many small roles help the parish prepare a welcoming celebration.',steps:['Ask the parish organiser about a suitable preparation shift.','Join your circle to sort, trim or bundle palms under supervision; choose a non-cutting role if preferred.','Clear the workspace and hand the prepared palms to the organiser.']},
 {id:'errands',title:'Lend a hand with an everyday errand',org:'Parish care team',kind:'Presence',size:'Small act',minutes:'45 minutes',tokens:10,description:'Help an elderly parishioner with a requested everyday errand, such as collecting groceries, through a parish coordinator. The person chooses the help they want; no real visit is arranged here.',outcome:'A practical errand becomes a chance for companionship and dependable care.',steps:['Ask a parish coordinator what help has been requested and agree the task with the person.','Go with a companion for the agreed errand; let the person guide their preferences.','Confirm the task is complete and check whether anything needs following up with the coordinator.']},
 {id:'manna',title:'Make room for conversation at Manna in a Pot',org:'Inspired by St Mary’s seniors programme',kind:'Presence',size:'Small act',minutes:'30 minutes',source:'https://www.stmary.sg/manna',tokens:10,description:'Manna in a Pot at Church of St Mary of the Angels is a seniors’ drop-in centre for socialising and meaningful activities. This listening role is an illustrative idea; ask the parish whether volunteer roles are available.',outcome:'Shared time and attentive conversation can help someone feel heard and included.',steps:['Ask the parish team whether a supervised companionship role is available.','Join your circle at an approved activity and ask if someone would welcome a conversation.','Listen without rushing or pressing for personal details, and thank them for the time shared.']},

];
export function rewardFor(activity: Activity, steps: number[], awarded: boolean) { const demo=activities.find(a=>a.id===activity.id); return demo && !awarded && steps.length === demo.steps.length && demo.steps.every((_,i)=>steps.includes(i)) ? participationTokens : 0; }

export const growthStages = [
 {name:'Seed',threshold:0,message:'Every beginning holds possibility.'},
 {name:'Sapling',threshold:1,message:'Your first act of care has taken root.'},
 {name:'Tree',threshold:3,message:'Your gifts are branching out.'},
 {name:'Garden',threshold:5,message:'Many small gifts are growing together.'},
];
export function personalGrowth(ids: string[]) {
 const completed = [...new Set(ids)].map(id=>activities.find(a=>a.id===id)).filter((a): a is Activity=>!!a);
 const stageIndex = growthStages.reduce((index,s,i)=>completed.length>=s.threshold?i:index,0);
 return {completed,stageIndex,stage:growthStages[stageIndex],next:growthStages[stageIndex+1],gifts:['Presence','Welcome','Skills'].map(kind=>({kind,count:completed.filter(a=>a.kind===kind).length}))};
}

export const personalGoals = [
 {id:'presence',title:'Make time for someone',kind:'Presence',gift:'Time & care',why:'Receive your time with gratitude, then offer someone your attention. Companionship is one way to participate in the Church’s mission of care.',reflection:'What did listening teach you about responding to God’s generosity?'},
 {id:'skills',title:'Put a gift at the service of others',kind:'Skills',gift:'Talent',why:'Recognise a gift you have received and share it with your community. Your skills can help others participate and belong.',reflection:'Which gift are you grateful for, and how did sharing it serve someone else?'},
 {id:'welcome',title:'Help someone belong',kind:'Welcome',gift:'Time & welcome',why:'Help someone feel welcomed into the life of the Church. A small invitation can become a shared experience of communion and mission.',reflection:'How did your welcome express your faith, and what could you offer next?'},
];
