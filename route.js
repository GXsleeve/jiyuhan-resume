const stops = [
  {id:'education', short:'兰州大学', start:'2017', time:'2017 – 2020', name:'兰州大学', role:'教育经历', title:'人力资源管理', intro:'大专 · 人力资源管理', points:['2017 – 2020，就读于兰州大学。']},
  {id:'jixiang', short:'浙江集享', start:'2019.04', time:'2019.04 – 2023.04', name:'浙江集享电子商务有限公司', role:'用户运营', title:'把 App 用户带到企微', intro:'搭建 App 到企业微信的引流流程，按触点分层发券，设计沉默用户召回与新客阶梯返券。', figures:[['5%–8%','企微添加率'],['10% → 20%','访问下单率']], points:['通过弹窗、首页资源位和订单完成页等触点分层发券。','设计 AI 外呼、短信与企微承接流程，通过 A/B 测试迭代短信话术，协同产品研发精简 H5 授权步骤。','设计企微新客首单券与下单后阶梯返券，推动首单及后续复购。']},
  {id:'kangpu', short:'康普（南京）', start:'2024.05', time:'2024.05 – 2025.05', name:'康普（南京）健康发展有限公司', role:'用户运营', title:'团长运营与大促', intro:'签约核心团长，推动社群迁入企微，用爆款引流、套餐组合提升客单价。', figures:[['123 万元','大促销售额'],['89 → 156 元','平均客单价']], points:['线下拜访签约 6 位核心团长，按团长类型提供运营支持，梳理用户标签与团长分级运营流程。','主导 618 与周年促销，策划老带新和工厂溯源参访，招募新团长、唤醒沉默用户并维护核心用户。']},
  {id:'guangwo', short:'江苏广沃', start:'2025.12', time:'2025.12 – 2026.04', name:'江苏广沃房地产营销策划有限公司', role:'用户运营', title:'私域项目冷启动', intro:'分析私域电商可行性，梳理存量业主的触达方式，设计从分散线索到企微的导流流程。', points:['评估企业微信及 SaaS 工具。','建立企微添加率、活动响应和首单转化等指标的监测口径。']},
  {id:'xjd', short:'消费权益 App', start:'2026.10', time:'2026.10 至今', name:'宸语信科（江苏）数字科技有限公司', role:'App 运营', title:'消费权益 App 内容与活动运营', intro:'负责消费权益类 App 的内容与活动运营，覆盖电商返利、低价优惠和任务激励。推进选品、活动配置、资源位承接及上线前验收。', points:['配置首页返利区的平台活动和低价商品，规划 Banner 与活动入口，负责活动文案、推广转链及落地页验收。','按用户路径验收活动入口、领取、分享与提现流程，整理体验反馈并与产品团队对接。','维护游戏联运内容，参与企微社群承接方案讨论，梳理 App 到企微的引导及入群流程。']},
];

const cases = [
  ['jixiang','app-to-wecom','App 分层引流','在 App 的弹窗、首页资源位、订单完成页等触点分层发券，用企微承接用户。对沉默用户增加 AI 外呼与短信，通过 A/B 测试迭代话术。',['App 触点','分层发券','企微承接'],[['5%–8%','企微添加率']]],
  ['jixiang','repeat-order','首单券与阶梯返券','为企微新客设计首单券，用户下单后再按阶段返券，承接后续复购。',['新客首单券','下单后返券','后续复购'],[['10% → 20%','访问下单率']]],
  ['kangpu','promotion','618 与周年促销','用爆款引流，借助套餐组合提升客单价。',[ ],[['123 万元','活动期销售额'],['89 → 156 元','平均客单价']]],
  ['guangwo','cold-start','存量业主到企微','梳理业主触点，设计企微导流，并用添加率、活动响应与首单转化观察冷启动表现。',['存量业主触达','企微导流','监测首单转化'],[]],
  ['xjd','app-ops','消费权益 App 活动运营与上线验收','围绕电商返利和优惠活动，从选品、资源位配置及文案到推广跳转验收推进上线准备。走查活动入口、领取、分享与提现流程，将影响用户体验的问题整理成反馈，与产品团队对接。',['活动及素材配置','推广链路验收','内测问题反馈'],[]],
];


const cities = [
  {key:'hangzhou', name:'杭州', province:'浙江', lng:120.1551, lat:30.2741, map:2, jobs:['jixiang']},
  {key:'nanjing', name:'南京', province:'江苏', lng:118.7969, lat:32.0603, map:1, jobs:['xjd','guangwo','kangpu']},
];

const stage = document.querySelector('#stage');
const canvas = document.querySelector('#atlas');
const ctx = canvas.getContext('2d');
const card = document.querySelector('#city-card');
const overview = document.querySelector('#overview');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width:760px)');
let size, camera, animation, selected, openButton;
const make = (tag, cls, content) => {
  const element = document.createElement(tag);
  element.className = cls;
  element.textContent = content;
  return element;
};
const figures = items => items?.length ? '<div class="metric">'+items.map(([value,label])=>'<div><strong>'+value+'</strong><span>'+label+'</span></div>').join('')+'</div>' : '';
document.querySelector('#longform').innerHTML =
  '<section class="wrap chapters" id="projects"><h2>项目案例</h2>'+
  cases.map(([owner,id,title,body,steps,metrics])=>{
    const job=stops.find(entry=>entry.id===owner);
    const flow=steps.length?'<ol class="flow" aria-label="流程">'+steps.map(step=>'<li><span>'+step+'</span></li>').join('')+'</ol>':'';
    return '<article class="chapter" id="'+id+'"><div><p class="eyebrow">'+job.short+'</p><h3>'+title+'</h3><p>'+body+'</p></div><div class="artifact">'+flow+figures(metrics)+'</div></article>';
  }).join('')+'</section>'+
  '<section class="wrap record" id="experience"><h2>完整履历</h2>'+
  [...stops].reverse().map(job=>'<details id="record-'+job.id+'"><summary>'+job.name+'<span>'+job.role+' · '+job.time+'</span></summary><ul>'+job.points.map(point=>'<li>'+point+'</li>').join('')+'</ul></details>').join('')+
  '<div class="tags" aria-label="核心技能"><span>企业微信私域搭建</span><span>用户分层与召回</span><span>团长运营</span><span>活动策划与配置</span><span>推广链路检查</span><span>AI 调研与运营工作流</span></div></section>';

for(const city of cities){
  city.pin=make('button','pin','');
  city.pin.type='button';
  city.pin.append(make('i','',''),make('span','',city.name));
  city.pin.firstChild.setAttribute('aria-hidden','true');
  city.pin.addEventListener('click',()=>choose(city,city.pin));
  document.querySelector('#pins').append(city.pin);
  city.button=make('button','city-option',city.name);
  city.button.type='button';
  city.button.addEventListener('click',()=>choose(city,city.button));
  document.querySelector('#city-buttons').append(city.button);
}
overview.addEventListener('click',()=>choose());
stage.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&selected){event.preventDefault();closeCity();}
});
function closeCity(){
  const restore=openButton;
  choose();
  if(restore && restore!==overview) {
    const city=cities.find(item=>item.pin===restore);
    (city?.button??restore).focus();
  }
}
function choose(city,button){
  if(city && city===selected)return;
  selected=city;
  openButton=button;
  stage.classList.toggle('has-city',!!city);
  overview.setAttribute('aria-pressed',String(!city));
  for(const option of cities){
    option.pin.setAttribute('aria-pressed',String(option===city));
    option.button.setAttribute('aria-pressed',String(option===city));
  }
  card.hidden=!city;
  if(city) {
    const heading='<header><div><p>'+city.province+'</p><h3>'+city.name+'</h3></div><button type="button" class="close" aria-label="关闭城市经历">×</button></header>';
    const entries=city.jobs.map(id=>{
      const job=stops.find(entry=>entry.id===id);
      const links=cases.filter(entry=>entry[0]===id).map(entry=>'<a href="#'+entry[1]+'">'+entry[2]+' ↘</a>');
      if(!links.length)links.push('<a href="#record-'+id+'">查看教育经历 ↘</a>');
      const metrics=job.figures?.map(([value,label])=>'<strong>'+value+'</strong> '+label).join('　');
      return '<div class="entry"><h4>'+job.name+'</h4><p class="dates">'+job.role+' · '+job.time+'</p><p class="description">'+job.intro+'</p>'+(metrics?'<p class="description">'+metrics+'</p>':'')+'<p class="entry-links">'+links.join('')+'</p></div>';
    }).join('');
    card.innerHTML=heading+entries;
    card.querySelector('.close').addEventListener('click',closeCity);
    card.scrollTop=0;
  }
  if(size)resize(true);
}
card.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#record-"]');
  if(link)document.getElementById(link.hash.slice(1)).open=true;
});
function readHash(){
  const city=cities.find(item=>location.hash==='#city-'+item.key);
  if(!city)return;
  choose(city);
  document.querySelector('#map').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
}
window.addEventListener('hashchange',readHash);
document.querySelector('.history').addEventListener('click',event=>{
  const link=event.target.closest('a');
  if(link && link.hash===location.hash){
    event.preventDefault();
    readHash();
  }
});

function mercator(lat){
  return Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))*180/Math.PI;
}
const outlines = geography.map(set=>set.map(ring=>ring.map(([lng,lat])=>[lng,mercator(lat)])));
const coords = cities.map(city=>[city.lng,mercator(city.lat)]);
function target(){
  const {w,h}=size;
  const base=Math.min(w/(compact.matches?65:83),h/(compact.matches?51:56));
  if(!selected) return {lng:104,lat:mercator(37),scale:base,x:w*(compact.matches?.49:.54),y:h*.48};
  const i=cities.indexOf(selected);
  const focusX=w*(compact.matches?.5:.64);
  return {lng:coords[i][0],lat:coords[i][1],scale:base*(compact.matches?3.9:5.1),x:focusX,y:h*(compact.matches?.27:.49)};
}
function at([lng,lat]){
  return [camera.x+(lng-camera.lng)*camera.scale,camera.y-(lat-camera.lat)*camera.scale];
}
function trace(ring){
  for(let i=0;i<ring.length;i++){
    const [x,y]=at(ring[i]);
    if(i===0)ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }
  ctx.closePath();
}
function layer(rings,fill,stroke,width){
  ctx.beginPath();
  for(const ring of rings)trace(ring);
  if(fill){ctx.fillStyle=fill;ctx.fill();}
  ctx.strokeStyle=stroke;
  ctx.lineWidth=width;
  ctx.stroke();
}
function draw(){
  const {w,h}=size;
  ctx.clearRect(0,0,w,h);
  ctx.beginPath();
  for(let i=-h;i<w+h;i+=52){ctx.moveTo(i,h);ctx.lineTo(i+h*.38,0)}
  for(let j=8;j<h;j+=43){ctx.moveTo(0,j);ctx.lineTo(w,j)}
  ctx.strokeStyle='#a37c4c13';ctx.lineWidth=1;ctx.stroke();
  layer(outlines[0],'#241d1465','#88765e8a',.8);
  if(selected){
    layer(outlines[selected.map],'#a476372c','#e2a35eb5',1.1);
  }
  ctx.beginPath();
  const route=coords.map(at);
  for(let i=1;i<route.length;i++){
    const [x,y]=route[i-1], [xx,yy]=route[i];
    ctx.moveTo(x,y);
    ctx.quadraticCurveTo((x+xx)/2,(y+yy)/2-Math.abs(xx-x)*.23,xx,yy);
  }
  ctx.setLineDash([3,5]);ctx.strokeStyle='#eca85d9e';ctx.lineWidth=1.2;ctx.stroke();ctx.setLineDash([]);
  for(const [index,city] of cities.entries()){
    const [x,y]=route[index];
    const visible=x>12&&x<w-12&&y>35&&y<h-46;
    city.pin.style.left=x+'px';
    const offset=compact.matches&&!selected?(city.key==='nanjing'?-14:city.key==='hangzhou'?14:0):0;
    city.pin.style.top=(y+offset)+'px';
    if(offset){
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+offset);
      ctx.strokeStyle='#eab46d90';ctx.lineWidth=1;ctx.stroke();
    }
    city.pin.style.visibility=visible?'visible':'hidden';
    city.pin.classList.toggle('left',city.key==='hangzhou'||x>w-55);
    if(selected===city){
      ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.strokeStyle='#eab46d65';ctx.lineWidth=1;ctx.stroke();
      if(!compact.matches){
        const cw=card.offsetWidth;
        const left=Math.max(20,x-cw-53);
        const top=Math.min(h-card.offsetHeight-76,Math.max(75,y-card.offsetHeight*.48));
        card.style.left=left+'px';card.style.top=top+'px';
        ctx.beginPath();ctx.moveTo(x-16,y);ctx.lineTo(left+cw,Math.min(top+card.offsetHeight-14,Math.max(top+14,y)));ctx.strokeStyle='#d7a16090';ctx.stroke();
      } else {
        card.style.left='16px';card.style.top=Math.max(235,y+35)+'px';
      }
    }
  }
}
function resize(animate=false){
  const bounds=stage.getBoundingClientRect();
  const w=bounds.width,h=bounds.height;
  if(!w||!h)return;
  if(!size||size.w!==w||size.h!==h){
    const ratio=Math.min(devicePixelRatio,2);
    size={w,h};
    canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
  }
  const destination=target();
  cancelAnimationFrame(animation);
  if(!camera||!animate||reduced.matches){camera=destination;draw();return;}
  const initial={...camera}, start=performance.now();
  const frame=now=>{
    const progress=Math.min(1,(now-start)/920);
    const eased=1-(1-progress)**3;
    camera=Object.fromEntries(Object.keys(destination).map(key=>[key,initial[key]+(destination[key]-initial[key])*eased]));
    draw();
    if(progress<1)animation=requestAnimationFrame(frame);
  };
  animation=requestAnimationFrame(frame);
}
new ResizeObserver(()=>{
  const {width,height}=stage.getBoundingClientRect();
  if(!size||width!==size.w||height!==size.h) resize();
}).observe(stage);

const portrait=document.querySelector('#portrait');
const photo=new Image();
photo.onload=()=>{
  const sample=document.createElement('canvas');
  sample.width=55;sample.height=62;
  const pixels=sample.getContext('2d',{willReadFrequently:true});
  pixels.drawImage(photo,0,0,55,62);
  const data=pixels.getImageData(0,0,55,62).data;
  portrait.width=550;portrait.height=620;
  const ink=portrait.getContext('2d');
  ink.font='9px monospace';
  const glyphs=['·','1','0','8','+','▓'];
  for(let y=0;y<62;y++)for(let x=0;x<55;x++){
    const pos=(y*55+x)*4;
    const light=(data[pos]*.30+data[pos+1]*.59+data[pos+2]*.11)/255;
    const mask=Math.max(0,1-((x-27)/28)**4-((y-30)/32)**4);
    const alpha=Math.max(0,light-.12)*mask*(1-Math.max(0,(y-46)/18));
    if(alpha>.04){
      ink.fillStyle='rgba(231,167,94,'+Math.min(1,alpha*1.15)+')';
      ink.fillText(glyphs[Math.min(5,Math.floor(light*6))],x*10,y*10+9);
    }
  }
};
photo.src='portrait.jpg';
choose();
readHash();



