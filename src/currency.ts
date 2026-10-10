// Store value in whole loaves; fish are the five-loaf denomination.
export function givingCurrency(totalLoaves:number,keepLoaves=false){const loaves=keepLoaves&&totalLoaves>=5?5+(totalLoaves-5)%5:totalLoaves%5;return {fish:(totalLoaves-loaves)/5,loaves};}
export function formatCurrency(totalLoaves:number,keepLoaves=false){const {fish,loaves}=givingCurrency(totalLoaves,keepLoaves);return `🐟 ${fish} · 🍞 ${loaves}`;}
