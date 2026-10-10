import {ParishNeighbours} from './ParishNeighbours';
import { useState } from 'react';
import { PixelButton } from './ui/PixelButton';
export const giftStories = [
 {title:'Care for what we have',story:'Your circle has tools that need repair, while another garden needs seeds.',action:'Choose one resource you could repair, reuse or share.',lesson:'Thoughtful care helps our gifts serve more people.'},
 {title:'The gift of listening',story:'A neighbour has been quiet lately. You have a little time between activities.',action:'Think of someone you could check in on, and write a gentle opening question.',lesson:'Our attention and time are resources we can share.'},
 {title:'Enough to share',story:'You have more seedlings than your garden needs. A new circle is just starting.',action:'Name something you have enough of and one way you could share it.',lesson:'Gratitude can help us notice what we can freely offer.'},
 {title:'A thoughtful choice',story:'Your circle is considering a purchase. Some members wonder what the community needs most.',action:'Write one question you would ask before using the shared budget.',lesson:'Money entrusted to us can serve real needs when we pause and listen.'},
];
export type GardenGift = {id:string;x:number;y:number;story:number};
export function scatterGifts():GardenGift[]{return [{x:47,y:49},{x:39,y:23},{x:65,y:45},{x:42,y:65},{x:68,y:73},{x:16,y:63},{x:89,y:24},{x:51,y:91}].map((p,i)=>({id:`gift-${i}`,x:p.x+(Math.random()-.5)*3,y:p.y+(Math.random()-.5)*3,story:i%giftStories.length}));}
export function GiftBox(){return <svg viewBox="0 0 32 36" aria-hidden="true" shapeRendering="crispEdges"><ellipse cx="16" cy="33" rx="15" ry="3" fill="#806044"/><path d="M3 13h26v18H3z" fill="#e9b957" stroke="#18243d" strokeWidth="2"/><path d="M1 10h30v7H1z" fill="#f6e9cb" stroke="#18243d" strokeWidth="2"/><path d="M13 10h6v21h-6z" fill="#ae4936"/><path d="M16 10H7V4h5l4 6h9V4h-5z" fill="none" stroke="#ae4936" strokeWidth="3"/></svg>}
export function GiftActivity({gift,onCollect}:{gift:GardenGift;onCollect:()=>void}){const [reflection,setReflection]=useState('');const story=giftStories[gift.story];return <div><p className="eyebrow">A garden discovery</p><h3>{story.title}</h3><p>{story.story}</p><ParishNeighbours/><label htmlFor="gift-reflection">{story.action}</label><textarea id="gift-reflection" rows={3} maxLength={500} value={reflection} onChange={e=>setReflection(e.target.value)}/><p>{story.lesson}</p><PixelButton disabled={!reflection.trim()} onClick={onCollect}>Complete & collect gift</PixelButton></div>}
