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
 {id:'listen',title:'Make room for a story',org:'Care for neighbours',kind:'Presence',size:'Small act',minutes:'30 minutes',tokens:10,description:'Practise listening in your circle, then prepare for an organisation-led befriending activity. Real visits require an approved organiser.',outcome:'Your circle prepares to offer companionship with care.',steps:["Sit with a neighbour and ask an open question, such as “How has your week been?”", "Take turns sharing and listening; put phones away and let each person finish.", "Thank your neighbour and ask whether they would enjoy another chat after Mass."]},
 {id:'welcome',title:'A little welcome goes a long way',org:'Parish welcome',kind:'Welcome',size:'Small act',minutes:'20 minutes',tokens:10,description:'Create a welcome note and practise introducing a newcomer to your parish circle.',outcome:'A welcoming conversation becomes easier to begin.',steps:["With a parish friend, greet someone new and introduce yourselves by name.", "Ask what brought them along; offer to sit together or introduce them to another parishioner.", "Show them where to find the parish team and invite them to join your next circle gathering."]},
 {id:'packs',title:'Twelve hands, one care mission',org:'Care for neighbours',kind:'Presence',size:'Shared mission',minutes:'3 steps · 2 hours',tokens:10,description:'Plan a care-pack activity using an organisation-approved needs list.',outcome:'Your group practises coordinating useful support around actual needs.',steps:["Get the organiser’s current item list, quantities and handover instructions before collecting supplies.", "Divide the jobs with your circle: check expiry dates, sort supplies and pack each bag to the agreed list.", "Count and label the completed packs, then hand them to the organiser at the agreed collection point."]},
 {id:'story',title:'Share a story of belonging',org:'Parish welcome',kind:'Welcome',size:'Shared mission',minutes:'3 steps · 90 minutes',tokens:10,description:'Prepare a small-group gathering about welcome and belonging. Sharing is voluntary; no personal testimony is uploaded.',outcome:'Your circle practises making space for people to feel heard and included.',steps:["Agree a place and time with your circle, and invite each person to bring a short story about feeling welcome.", "Arrange seats in a circle; take turns sharing, with space for anyone who prefers just to listen.", "Thank everyone and agree one small way to welcome someone at your next gathering."]},
 {id:'skill',title:'Pass on something you know',org:'Parish community',kind:'Skills',size:'Small act',minutes:'45 minutes',tokens:10,description:'Teach a useful skill to your circle: drawing, basic spreadsheets, music or mending. Pick something everyone can try.',outcome:'Your circle practises sharing a useful skill and learning together.',steps:["Choose one simple skill and bring enough materials for your parish friends to try it.", "Show the task slowly, then pair up so everyone can practise with a neighbour’s help.", "Let each person demonstrate what they learned and share a tip they can use again."]},
 {id:'repair',title:'Give something useful a second life',org:'Local stewardship practice',kind:'Skills',size:'Small act',minutes:'30 minutes',tokens:10,description:'Inspired by the spirit of reuse in Caritas Manila’s Segunda Mana programme. Practise checking needs and caring for usable resources in your circle.',outcome:'Your circle practises keeping useful resources in service and respecting what recipients actually need.',steps:["Bring a worn but usable item, such as a book or pencil case, and check with a friend what needs fixing.", "Clean it or make a simple repair together using suitable materials; leave electrical repairs to a qualified person.", "Check it works for its intended use, then keep using it or offer it only where it is wanted."]},
 {id:'palms',title:'Prepare palms for Palm Sunday',org:'Parish team',kind:'Skills',size:'Shared mission',minutes:'60 minutes',need:'50 volunteers needed',tokens:10,description:'Help your parish prepare palms together. The parish team coordinates the preparation shift and suitable roles.',outcome:'Many small roles help the parish prepare a welcoming celebration.',steps:["Meet your parish team at the preparation area; collect palms and follow the coordinator’s demonstration.", "Work with a neighbour to sort, trim and bundle palms to the demonstrated size; choose sorting or bundling if you prefer not to cut.", "Count the bundles and place them where directed for Mass; return tools and clear the palm offcuts."]},
 {id:'errands',title:'Lend a hand with an everyday errand',org:'Parish care team',kind:'Presence',size:'Small act',minutes:'45 minutes',tokens:10,description:'Help an elderly parishioner with a requested everyday errand, such as collecting groceries, through a parish coordinator. The person chooses the help they want.',outcome:'A practical errand becomes a chance for companionship and dependable care.',steps:["Confirm the requested errand with the parish coordinator and parishioner: list, timing and how purchases will be paid for.", "Go with a parish friend to collect the agreed items; check preferences before making substitutions.", "Return the items, receipts and any change, then tell the coordinator the errand is complete."]},
 {id:'manna',title:'Make room for conversation at Manna in a Pot',org:'Inspired by St Mary’s seniors programme',kind:'Presence',size:'Small act',minutes:'30 minutes',source:'https://www.stmary.sg/manna',tokens:10,description:'Manna in a Pot at Church of St Mary of the Angels is a seniors’ drop-in centre for socialising and meaningful activities. Ask the parish team about helping with a companionship activity.',outcome:'Shared time and attentive conversation can help someone feel heard and included.',steps:["Check with the Manna in a Pot team about a suitable volunteer session and the role you can help with.", "Join a parish friend at the session; introduce yourself and ask a senior if they would like company during the activity.", "Listen at their pace, help only when invited, and thank them before checking out with the team."]},

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
