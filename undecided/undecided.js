// Review-notes toggle
  (function(){
    var btn=document.getElementById('notesToggle');
    btn.addEventListener('click',function(){
      var hidden=document.body.classList.toggle('hide-notes');
      btn.setAttribute('aria-pressed',hidden);
      btn.innerHTML=(hidden?'Show review notes ':'Hide review notes ')+'<span>●</span>';
    });
  })();

  // Department interest filter
  (function(){
    var chips=document.querySelectorAll('.chips .chip');
    var depts=document.querySelectorAll('.dept');
    function update(){
      var active=[].filter.call(chips,function(c){return c.getAttribute('aria-pressed')==='true'}).map(function(c){return c.dataset.tag});
      depts.forEach(function(d){
        var tags=d.dataset.tags.split(' ');
        var hit=active.length&&active.some(function(t){return tags.indexOf(t)>-1});
        d.classList.toggle('match',!!hit);
        d.classList.toggle('dim',active.length>0&&!hit);
      });
    }
    chips.forEach(function(c){
      c.addEventListener('click',function(){
        c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');
        update();
      });
    });
  })();

  // FAQ audience filter
  (function(){
    var btns=document.querySelectorAll('.faq-filter .chip');
    var items=document.querySelectorAll('.faq details');
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        btns.forEach(function(x){x.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');
        var f=b.dataset.faq;
        items.forEach(function(d){d.classList.toggle('hidden',f!=='all'&&d.dataset.aud!==f)});
      });
    });
  })();