/* ---- hero: yazan prompt + sohbet animasyonu ---- */
(function(){
  const alan = document.getElementById('yaziAlani');
  const sohbet = document.getElementById('sohbet');
  if(!alan || !sohbet) return;
  const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metin = 'yapay zeka öğrenmek istiyorum, nereden başlarım?';
  const cevap = 'Tam yerindesin. Sekiz hafta, sıfırdan, ücretsiz.';

  function balon(sinif, icerik){
    const d = document.createElement('div');
    d.className = 'balon ' + sinif;
    d.innerHTML = icerik;
    sohbet.appendChild(d);
    return d;
  }

  if(azHareket){
    alan.textContent = metin;
    balon('sen', metin);
    balon('yz', cevap);
    return;
  }

  let i = 0;
  function yaz(){
    if(i <= metin.length){
      alan.textContent = metin.slice(0, i++);
      setTimeout(yaz, 45 + Math.random()*35);
    } else {
      setTimeout(gonder, 550);
    }
  }
  function gonder(){
    alan.textContent = '';
    balon('sen', metin);
    const bekle = balon('yz', '<span class="yaziyor"><i></i><i></i><i></i></span>');
    bekle.style.padding = '0';
    setTimeout(function(){
      bekle.style.padding = '';
      bekle.innerHTML = cevap;
      setTimeout(sifirla, 3600);
    }, 1300);
  }
  function sifirla(){
    sohbet.innerHTML = '';
    i = 0;
    yaz();
  }
  setTimeout(yaz, 700);
})();

/* ---- kaydırınca görünme ---- */
(function(){
  const ogeler = document.querySelectorAll('.gir');
  if(!ogeler.length) return;
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    ogeler.forEach(function(e){ e.classList.add('gorundu'); });
    return;
  }
  const izci = new IntersectionObserver(function(girisler){
    girisler.forEach(function(g){
      if(g.isIntersecting){ g.target.classList.add('gorundu'); izci.unobserve(g.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
  ogeler.forEach(function(e){ izci.observe(e); });
})();

/* ---- e-posta gizleme: adres kaynak kodda yok, tarayıcıda birleşiyor ----
   Botların çoğu JavaScript çalıştırmadığı için adresi göremez.
   Adresi değiştirmek için HTML'deki data-k (kullanıcı) ve data-a (alan adı)
   değerlerini düzenle; buraya dokunmana gerek yok. */
(function(){
  var ogeler = document.querySelectorAll('.eposta');
  for (var i = 0; i < ogeler.length; i++) {
    var e = ogeler[i];
    var adres = e.getAttribute('data-k') + String.fromCharCode(64) + e.getAttribute('data-a');
    e.setAttribute('href', 'ma' + 'ilto:' + adres);
    if (e.textContent.indexOf('yükleniyor') !== -1) e.textContent = adres;
  }
})();
