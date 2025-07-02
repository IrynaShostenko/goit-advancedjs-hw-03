import{i as l,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="51075470-1937ac32d69b36f6f43f67dbf",m="https://pixabay.com/api/";async function p(i){const o=`${m}?key=${f}&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&safesearch=true`,t=await fetch(o);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return await t.json()}function g(i){return i.map(({webformatURL:o,largeImageURL:t,tags:s,likes:e,views:r,comments:n,downloads:u})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${t}">
            <img class="gallery-image" src="${o}" alt="${s}" loading="lazy" />
          </a>
          <div class="info">
            <div class="info-box"><span class="label">Likes:</span> ${e}</div>
            <div class="info-box"><span class="label">Views:</span> ${r}</div>
            <div class="info-box"><span class="label">Comments:</span> ${n}</div>
            <div class="info-box"><span class="label">Downloads:</span> ${u}</div>
          </div>
        </li>
      `).join("")}const a={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")};let c=null;const h=i=>{i.preventDefault();const t=i.target.elements.user_query.value.trim();if(a.loader.classList.add("is-visible"),a.gallery.innerHTML="",!t){l.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"}),a.loader.classList.remove("is-visible");return}p(t).then(s=>{if(s.hits.length===0){l.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.gallery.innerHTML="";return}a.gallery.innerHTML=g(s.hits),c?c.refresh():c=new d(".js-gallery a",{captionsData:"alt",captionDelay:250})}).catch(s=>{l.error({title:"Error",message:`Something went wrong: ${s}`,position:"topRight",timeout:5e3})}).finally(()=>{a.loader.classList.remove("is-visible")})};a.searchForm.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
