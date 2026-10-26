// 新片的 film.js 起点：只有底座，没有镜头。镜头按导演表一镜一镜现写，画面从这条片自己的文案和素材里想。
// 每一镜先想清楚它在说什么，再去 references/motion.md 的手法清单里找意思对得上的手法：
//   对得上 → 用 M.xxx，写上 why；对不上、或者要大改参数才塞得进去 → 手写。不要为了用上手法去改画面。
window.ready=(async()=>{
const F=await FB.init({
 counts:['assets/clips/counts.json'],    // footage.py extract 写的；还没有实拍就先删掉这一项
 cuts:[],                                // 抠像名：assets/cut/<名>/box.json（matte.py + matte_clean.py）
 preload:['grain.png'],                  // 用到的图片，相对 assets/
 fonts:['500 60px Mi','60px Shu','60px Num','600 30px Mont'],
});
const {T,A,B,BE,cue,INS,fr,clipSrc,shot}=F,M=MV;
const {C,IO,lerp,camPath,camKeys,cams,L,dof,desk3d,mega,brow,demote,cutP,halo,fmtB}=S25;

// ---------- 镜头：shot(起, 止, t=>这一帧的 HTML)，时刻一律 cue(句id,'词') ----------
shot(0,T.duration,t=>`<div style="position:absolute;inset:0;background:#05070c"></div>`);   // 占位：写一镜，替换一段

return F.go();
})();
