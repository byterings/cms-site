/** Applies the stored theme before the first paint (avoids a flash). */
export const themeInitScript =
  "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}";
