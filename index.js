import{i as l,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const i={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")};let c=null;const f=o=>o.map(({webformatURL:t,largeImageURL:a,tags:r,likes:e,views:s,comments:n,downloads:u})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${t}" alt="${r}" loading="lazy" />
        </a>
        <div class="info">
  <div class="info-box"><span class="label">Likes</span><span>${e}</span></div>
  <div class="info-box"><span class="label">Views</span><span>${s}</span></div>
  <div class="info-box"><span class="label">Comments</span><span>${n}</span></div>
  <div class="info-box"><span class="label">Downloads</span><span>${u}</span></div>
</div>

      </li>
    `).join(""),p=o=>{o.preventDefault();const a=o.target.elements.user_query.value.trim();if(i.loader.classList.add("is-visible"),i.gallery.innerHTML="",!a){l.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}fetch(`https://pixabay.com/api/?key=51075470-1937ac32d69b36f6f43f67dbf&orientation=horizontal&q=${a}&image_type=photo&safesearch=true`).finally(()=>{i.loader.classList.remove("is-visible")}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length===0){l.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i.gallery.innerHTML="";return}i.gallery.innerHTML=f(r.hits),c?c.refresh():c=new d(".js-gallery a",{captionsData:"alt",captionDelay:250})}).catch(r=>{l.error({title:"Error",message:`Something went wrong: ${r}`,position:"topRight",timeout:5e3})})};i.searchForm.addEventListener("submit",p);
//# sourceMappingURL=index.js.map
