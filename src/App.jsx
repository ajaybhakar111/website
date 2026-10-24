import { useEffect, useRef, useState } from "react";

const css = `
:root{--navy:#0a1b3d;--navy2:#13306b;--gold:#d4a03a;--gold2:#f0c765;--ink:#1c2740;--mut:#5b6785;--line:#dde3ee;--bg:#f4f6fb;
--blue:#2f6fed;--green:#1fa971;--amber:#e7a020;--red:#e04b4b;--purple:#7c5cf0;--orange:#ee7d1d}
*,*::before,*::after{box-sizing:border-box}
html,body,#root{margin:0 !important;padding:0 !important;width:100% !important;max-width:none !important;min-height:100vh;
  display:block !important;text-align:left !important;place-items:initial !important}
html{scroll-behavior:smooth}
body{font-family:Inter,system-ui,Arial,sans-serif;color:var(--ink);background:#fff;line-height:1.55;overflow-x:hidden}
a{color:inherit;text-decoration:none}
.wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:2}

/* NAV */
nav{position:sticky;top:0;z-index:50;background:rgba(7,22,50,.88);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08)}
nav .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:800;letter-spacing:.1em}
.logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#f0c765,#c48a1f);color:var(--navy);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;box-shadow:0 0 18px rgba(240,199,101,.5)}
nav ul{display:flex;gap:22px;list-style:none;margin:0;padding:0}
nav li a{color:#c9d4ee;font-size:14px;transition:.2s}
nav li a:hover{color:var(--gold2);text-shadow:0 0 12px rgba(240,199,101,.7)}

/* HERO */
.hero{position:relative;overflow:hidden;color:#fff;min-height:92vh;display:flex;align-items:center;padding:70px 0 60px;
  background:radial-gradient(1200px 700px at 80% 20%,#16397d 0%,transparent 60%),linear-gradient(160deg,#050f26,#0a1b3d 55%,#10285a)}
.hero::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:radial-gradient(520px circle at var(--mx,70%) var(--my,30%),rgba(240,199,101,.26),transparent 62%)}
.hero::after{content:"";position:absolute;inset:0;z-index:0;opacity:.35;
  background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:48px 48px;mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 75%)}
.beam{position:absolute;top:-12%;width:380px;height:125%;z-index:1;pointer-events:none;filter:blur(16px);transform-origin:50% 0;
  background:linear-gradient(180deg,rgba(255,226,150,.42),rgba(255,226,150,.06) 70%,transparent);clip-path:polygon(44% 0,56% 0,100% 100%,0 100%)}
.beam.b1{left:6%;animation:sway1 7s ease-in-out infinite alternate}
.beam.b2{left:52%;animation:sway2 9s ease-in-out infinite alternate;opacity:.8}
@keyframes sway1{from{transform:rotate(-14deg)}to{transform:rotate(10deg)}}
@keyframes sway2{from{transform:rotate(12deg)}to{transform:rotate(-9deg)}}
.heroGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}
.kicker{color:var(--gold);font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:700}
.hero h1{font-size:clamp(46px,8vw,92px);letter-spacing:.03em;line-height:1;margin:14px 0 16px;font-weight:800;
  background:linear-gradient(180deg,#fff 30%,#f0c765);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 26px rgba(240,199,101,.4))}
.lead{font-size:clamp(17px,2vw,21px);max-width:560px;color:#d6def2}
.chips{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.chip{font-size:12px;font-weight:700;padding:5px 13px;border-radius:99px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15)}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.btn{padding:13px 24px;border-radius:12px;font-weight:700;border:0;cursor:pointer;font-size:15px;transition:.2s}
.btn.gold{background:linear-gradient(135deg,#f0c765,#d4a03a);color:var(--navy);box-shadow:0 8px 28px rgba(212,160,58,.45)}
.btn.gold:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(240,199,101,.6)}
.btn.ghost{background:rgba(255,255,255,.05);color:#fff;border:1.5px solid rgba(255,255,255,.35)}
.btn.ghost:hover{background:rgba(255,255,255,.14);transform:translateY(-3px)}
.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:54px}
.stat{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:18px;text-align:center;backdrop-filter:blur(6px)}
.stat b{font-size:32px;display:block;color:var(--gold2)}
.stat span{font-size:13px;color:#c9d4ee}

/* 3D SCENE */
.stage{perspective:1300px;height:440px;position:relative}
.scene{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .15s ease-out}
.panel{position:absolute;left:6%;top:12%;width:88%;height:70%;border-radius:22px;padding:16px;transform-style:preserve-3d;
  background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.22);
  backdrop-filter:blur(8px);box-shadow:0 50px 90px rgba(0,0,0,.55),0 0 60px rgba(47,111,237,.25),inset 0 1px 0 rgba(255,255,255,.3)}
.pbar{display:flex;gap:6px;margin-bottom:12px}.pbar span{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.35)}
.pk{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.pk div{background:rgba(255,255,255,.1);border-radius:10px;padding:8px 6px;text-align:center}
.pk b{display:block;font-size:20px;color:var(--gold2)}.pk span{font-size:10px;color:#c9d4ee}
.pb{display:flex;align-items:flex-end;gap:8px;height:90px;margin-top:14px;padding:0 6px}
.pb i{flex:1;border-radius:6px 6px 0 0;background:linear-gradient(180deg,#f0c765,#c48a1f);animation:grow 2.6s ease-in-out infinite alternate;transform-origin:bottom}
@keyframes grow{from{transform:scaleY(.55)}to{transform:scaleY(1)}}
.f3{position:absolute;transform-style:preserve-3d}
.bob{animation:bob 4s ease-in-out infinite alternate}
@keyframes bob{from{transform:translateY(-8px)}to{transform:translateY(8px)}}
.glass{background:rgba(10,27,61,.78);border:1px solid rgba(240,199,101,.5);border-radius:14px;padding:10px 14px;color:#fff;font-size:12px;
  box-shadow:0 18px 40px rgba(0,0,0,.5),0 0 28px rgba(240,199,101,.3);backdrop-filter:blur(8px)}
.glass b{display:block;font-size:13px;color:var(--gold2)}
.alertc{right:-2%;top:0;width:210px}.alertc .glass{border-color:#e7a020;background:rgba(60,40,6,.85)}
.c1{left:-2%;top:46%;width:150px}.c2{right:2%;top:62%;width:150px}
.badge{left:34%;top:74%}.badge .glass{background:linear-gradient(135deg,#f0c765,#d4a03a);color:var(--navy);border:0;font-weight:800;font-size:14px}
.ring{position:absolute;left:50%;top:50%;border-radius:50%;border:2px dashed rgba(240,199,101,.45);transform-style:preserve-3d}
.r1{width:420px;height:420px;margin:-210px 0 0 -210px;transform:translateZ(-80px) rotateX(70deg);animation:rot 18s linear infinite}
.r2{width:320px;height:320px;margin:-160px 0 0 -160px;border-color:rgba(47,111,237,.6);transform:translateZ(-40px) rotateX(70deg);animation:rot 12s linear infinite reverse}
@keyframes rot{to{transform:translateZ(-60px) rotateX(70deg) rotateZ(360deg)}}
.cubewrap{left:-4%;bottom:-2%;width:90px;height:90px;transform:translateZ(110px)}
.cube{position:relative;width:90px;height:90px;transform-style:preserve-3d;animation:spin 14s linear infinite}
.cube i{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;font-size:17px;color:var(--navy);
  background:linear-gradient(135deg,#f6d57e,#c48a1f);border:1px solid rgba(255,255,255,.55);box-shadow:inset 0 0 22px rgba(255,255,255,.35)}
.cube i:nth-child(1){transform:translateZ(45px)}.cube i:nth-child(2){transform:rotateY(90deg) translateZ(45px)}
.cube i:nth-child(3){transform:rotateY(180deg) translateZ(45px)}.cube i:nth-child(4){transform:rotateY(-90deg) translateZ(45px)}
.cube i:nth-child(5){transform:rotateX(90deg) translateZ(45px)}.cube i:nth-child(6){transform:rotateX(-90deg) translateZ(45px)}
@keyframes spin{from{transform:rotateX(-22deg) rotateY(0)}to{transform:rotateX(-22deg) rotateY(360deg)}}

/* SECTIONS */
section{padding:84px 0;position:relative}
section.alt{background:var(--bg)}
h2{font-size:clamp(28px,4vw,42px);color:var(--navy);margin:8px 0 12px;line-height:1.12}
.sub{color:var(--mut);max-width:740px;margin:0 0 36px;font-size:17px}
.grid{display:grid;gap:20px;perspective:1100px}
.g2{grid-template-columns:repeat(auto-fit,minmax(320px,1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px;transition:transform .3s,box-shadow .3s,border-color .3s;transform-style:preserve-3d}
section.alt .card{border-color:transparent;box-shadow:0 4px 18px rgba(10,27,61,.08)}
.grid .card:hover{transform:translateY(-8px) rotateX(4deg) rotateY(-3deg);box-shadow:0 26px 50px rgba(10,27,61,.18),0 0 0 1px rgba(212,160,58,.45)}
.card h3{color:var(--navy);font-size:18px;margin:0 0 6px}
.card p{color:var(--mut);font-size:15px;margin:0}
.ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:14px;color:#fff;box-shadow:0 10px 22px rgba(10,27,61,.25)}
.tag{display:inline-block;font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px}
.t-amber{background:#fdf3dc;color:#8a5a00}.t-blue{background:#e8effe;color:#1d4fc4}.t-green{background:#e3f6ee;color:#12724c}
.t-red{background:#fde9e9;color:#b32f2f}.t-purple{background:#efeafe;color:#5638c4}.t-orange{background:#fff0e1;color:#a9540a}
.bad{color:var(--red)}
.alert{background:#fdf3dc;border-left:5px solid var(--amber);padding:14px 18px;border-radius:12px;margin-bottom:18px}
.alert b{color:#8a5a00}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.case{border:1px solid var(--line);border-radius:14px;padding:16px;background:#fff}
.case .id{font-family:ui-monospace,Menlo,monospace;font-size:13px;color:var(--blue)}
.case small{display:block;color:var(--mut);font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-top:8px}
.case q{display:block;margin-top:8px;color:var(--mut)}
.why{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
.why ul{list-style:none;margin:6px 0 0;padding:0}.why li{padding:3px 0;font-size:14px}
.bar{height:10px;border-radius:99px;background:#e6eaf3;overflow:hidden}
.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--orange),var(--gold))}
.log{margin-top:14px;font-size:13px;color:var(--mut);border-top:1px dashed var(--line);padding-top:10px}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between}
.kpi{text-align:center}.kpi b{font-size:36px;display:block}
.stack{display:flex;height:16px;border-radius:99px;overflow:hidden;margin:8px 0}
.steps{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.step{border:1.5px solid var(--line);background:#fff;border-radius:10px;padding:9px 15px;cursor:pointer;font-weight:600;font-size:14px;color:var(--ink);transition:.2s}
.step:hover{border-color:var(--gold)}
.step.on{background:var(--navy);color:var(--gold2);border-color:var(--navy);box-shadow:0 8px 20px rgba(10,27,61,.3)}
.tl{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;perspective:1100px}
.tl .card b.n{display:inline-flex;width:30px;height:30px;border-radius:50%;background:var(--orange);color:#fff;align-items:center;justify-content:center;font-size:13px;margin-bottom:8px}
.faq details{border:1px solid var(--line);border-radius:12px;padding:15px 20px;margin-bottom:10px;background:#fff;transition:.2s}
.faq details[open]{box-shadow:0 12px 30px rgba(10,27,61,.1);border-color:var(--gold)}
.faq summary{cursor:pointer;font-weight:700;color:var(--navy)}
.faq p{margin:8px 0 0;color:var(--mut)}
.note{background:#e8effe;border-left:5px solid var(--blue);padding:14px 18px;border-radius:12px;font-size:14px;margin-top:20px}
footer{background:linear-gradient(160deg,#050f26,#0a1b3d);color:#c9d4ee;padding:38px 0;font-size:14px}
.rv{opacity:0;transform:translateY(34px);transition:opacity .7s ease,transform .7s ease}.rv.in{opacity:1;transform:none}

@media(max-width:900px){.heroGrid{grid-template-columns:1fr}.stage{height:380px}.stats{grid-template-columns:repeat(2,1fr)}nav ul{display:none}}
@media(max-width:720px){.pair,.why{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){*{animation:none !important;transition:none !important}}
`;

const NAV = [["problem","Problem"],["solution","Solution"],["demo","Live demo"],["dashboard","Dashboard"],["how","How it works"],["tech","Architecture"],["impact","Impact"],["roadmap","Roadmap"],["faq","FAQ"]];

const features = [
  ["🧩","var(--navy)","Single window","Every institution complaint from every Bureau/Cell in one searchable list."],
  ["🔗","var(--orange)","Overlap detection","Flags cases on the same institution handled by more than one Bureau/Cell, with reasons."],
  ["🧭","var(--blue)","Rule-based routing","Recommends a destination from configurable rules; unclear cases go to manual triage."],
  ["🔔","var(--red)","Alerts and SLA","Overdue, SLA, escalation, reminder and overlap alerts with acknowledge."],
  ["📊","var(--green)","Reports","Bureau, region, institution, ageing, overlap and performance views with CSV export."],
  ["🛡️","var(--purple)","Human in control","A similarity score is a suggestion. Officials make every final decision."],
];

const lifecycle = [
  ["Ingest","Complaint is validated and saved in PostgreSQL before any AI step, so nothing is lost if a worker fails."],
  ["Resolve institution","Match on AICTE Permanent ID first; fuzzy name and address as fallback. Doubtful matches go to a verify queue."],
  ["Route","Versioned rules recommend a Bureau/Cell. Ambiguous or multi-issue complaints go to manual triage."],
  ["Match & score","Only open cases of the same institution in other Bureaus are compared: topic, semantic similarity, entities, timing."],
  ["Officer review","The reviewer sees why it was suggested and what differs, then confirms, rejects or asks for further review."],
  ["Assign & act","One primary owner plus a coordination partner. Every action is time-stamped in the audit trail."],
  ["Track & SLA","SLA clock, ageing buckets, reminders and an escalation ladder keep cases moving."],
  ["Dispose & learn","Closure and reviewer verdicts feed threshold calibration."],
];

const faqs = [
  ["Do you need to train an AI model?","No. The first version uses rules plus pretrained multilingual embeddings. Fine-tuning is considered only after labelled pilot data exists."],
  ["How do you avoid false matches?","A verified-institution gate, several signals, three alert tiers and a human verdict. Precision and recall are tracked on labelled cases."],
  ["What if the matching service fails?","The complaint is already saved. The job is retried and normal case management continues."],
  ["How is sensitive data protected?","Role-based access, field masking across Bureaus, encryption, an audit log and self-hosted NLP. Synthetic data is used until AICTE authorises real records."],
  ["What do you need from AICTE?","Authorised data access, verified institution IDs, approved routing rules and the prescribed SLA timelines."],
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${on ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Scene({ tilt }) {
  return (
    <div className="stage">
      <div className="scene" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <div className="ring r1" /><div className="ring r2" />
        <div className="panel">
          <div className="pbar"><span /><span /><span /></div>
          <div className="pk">
            {[["14","Total"],["5","Pending"],["5","In process"],["2","Overdue"]].map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
          <div className="pb">{[70, 45, 85, 30, 60, 50, 75].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }} />)}</div>
        </div>
        <div className="f3 alertc" style={{ transform: "translateZ(80px)" }}>
          <div className="bob glass"><b>⚠ Potential Overlapping Cases</b>Coordination Required</div>
        </div>
        <div className="f3 c1" style={{ transform: "translateZ(110px)" }}>
          <div className="bob glass" style={{ animationDelay: "-1s" }}><b>PGRC-1042</b>Labs not available · Pending</div>
        </div>
        <div className="f3 c2" style={{ transform: "translateZ(100px)" }}>
          <div className="bob glass" style={{ animationDelay: "-2.2s" }}><b>RB-2081</b>Verify lab compliance</div>
        </div>
        <div className="f3 badge" style={{ transform: "translateZ(140px)" }}>
          <div className="bob glass" style={{ animationDelay: "-3s" }}>⇄ 87% match</div>
        </div>
        <div className="f3 cubewrap">
          <div className="cube"><i>RB</i><i>PGRC</i><i>AB</i><i>REG</i><i>CL</i><i>✓</i></div>
        </div>
      </div>
    </div>
  );
}

function Demo() {
  const [verdict, setVerdict] = useState("pending");
  const [log, setLog] = useState([]);
  const labels = { pending: ["Pending review","t-amber"], confirmed: ["Linked: coordination started","t-green"], rejected: ["Rejected: not related","t-red"], further: ["Further review requested","t-purple"] };
  const act = (v, text) => { setVerdict(v); setLog((l) => [`${new Date().toLocaleTimeString()} · RB Officer · ${text}`, ...l]); };
  const [lab, cls] = labels[verdict];
  return (
    <div className="card" style={{ transform: "none" }}>
      <div className="alert"><b>Potential Overlapping Cases – Coordination Required.</b> A similarity score is a suggestion, not proof of duplication.</div>
      <div className="row">
        <div><span className="kicker" style={{ color: "var(--mut)" }}>OV-002</span><h3 style={{ margin: 0 }}>Lakshmi College of Engineering</h3></div>
        <div style={{ textAlign: "right" }}><b style={{ fontSize: 24, color: "var(--orange)" }}>87% match</b><br /><span className={`tag ${cls}`}>{lab}</span></div>
      </div>
      <div className="bar" style={{ margin: "12px 0" }}><i style={{ width: "87%" }} /></div>
      <div className="pair">
        <div className="case"><span className="id">CMP-2026-0104</span> <span className="tag t-red">Escalated</span>
          <small>Bureau / Cell</small>RB<small>Officer</small>Dr. S. Menon<small>Last action</small>Escalated to Chairman office
          <q>“Laboratories and library are below the prescribed norms for approved intake.”</q></div>
        <div className="case"><span className="id">CMP-2026-0105</span> <span className="tag t-amber">Pending</span>
          <small>Bureau / Cell</small>PGRC<small>Officer</small>Ms. K. Nair<small>Last action</small>Complaint registered
          <q>“Students say lab equipment is unavailable and practicals are not conducted.”</q></div>
      </div>
      <div className="why">
        <div><b>Why the system suggests a link</b><ul><li>✓ Same institution ID</li><li>✓ Same category: Infrastructure</li><li>✓ Both about laboratory provision</li></ul></div>
        <div><b>Differences to consider</b><ul><li>• Case 0104 is already escalated</li><li>• Case 0105 was raised by students</li></ul></div>
      </div>
      <div className="btns" style={{ marginTop: 0 }}>
        <button className="btn gold" onClick={() => act("confirmed", "Linked cases, coordination started")}>Link cases</button>
        <button className="btn" style={{ background: "#fde9e9", color: "#b32f2f" }} onClick={() => act("rejected", "Marked unrelated")}>Not related</button>
        <button className="btn" style={{ background: "#efeafe", color: "#5638c4" }} onClick={() => act("further", "Requested further review")}>Further review</button>
        <button className="btn" style={{ background: "#eef1f7", color: "var(--mut)" }} onClick={() => { setVerdict("pending"); setLog([]); }}>Reset</button>
      </div>
      <div className="log">
        <b>Audit trail</b>
        {log.length === 0 ? <div>No decisions recorded yet. Choose an action above.</div> : log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [tilt, setTilt] = useState({ x: 6, y: -14 });
  const [pos, setPos] = useState({ x: null, y: null });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    setTilt({ x: (0.5 - y) * 16, y: (x - 0.5) * 26 });
  };
  const bureaus = [
    ["PGRC", 7, [["#e7a020", 3], ["#2f6fed", 2], ["#1fa971", 2]]],
    ["RB", 4, [["#e7a020", 1], ["#2f6fed", 2], ["#e04b4b", 1]]],
    ["Regional Office", 2, [["#e7a020", 1], ["#7c5cf0", 1]]],
    ["Approval Bureau", 1, [["#2f6fed", 1]]],
  ];
  const heroStyle = pos.x == null ? {} : { "--mx": `${pos.x}px`, "--my": `${pos.y}px` };
  return (
    <>
      <style>{css}</style>
      <nav><div className="wrap">
        <a className="brand" href="#top"><span className="logo">CL</span>CASELINK</a>
        <ul>{NAV.map(([id, t]) => <li key={id}><a href={`#${id}`}>{t}</a></li>)}</ul>
      </div></nav>

      <header className="hero" id="top" style={heroStyle} onMouseMove={onMove}>
        <div className="beam b1" /><div className="beam b2" />
        <div className="wrap">
          <div className="heroGrid">
            <div>
              <div className="kicker">Smart India Hackathon 2025 · Software</div>
              <h1>CASELINK</h1>
              <p className="lead">One institution. One consolidated view. Coordinated action across every AICTE Bureau and Cell.</p>
              <div className="chips"><span className="chip">Integrated complaint monitoring</span><span className="chip">Explainable overlap detection</span><span className="chip">Working prototype · synthetic data</span></div>
              <div className="btns"><a className="btn gold" href="#demo">Try the live demo</a><a className="btn ghost" href="#how">See how it works</a></div>
            </div>
            <Scene tilt={tilt} />
          </div>
          <div className="stats">
            {[["14","demo cases"],["4","Bureaus/Cells"],["5","alert types"],["6","report views"],["0","automatic merges"]].map(([n, l]) => <div className="stat" key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
      </header>

      <section id="problem"><div className="wrap">
        <Reveal><div className="kicker">The problem</div>
        <h2>The same institution, handled in silos</h2>
        <p className="sub">AICTE receives complaints from students, faculty and stakeholders. The Regulation Bureau (RB) and the Public Grievance Redressal Cell (PGRC) may each hold a case on the same institution, with no shared, real-time view.</p></Reveal>
        <div className="grid g3">
          {[["Duplicate effort","Two Bureaus investigate related issues independently."],["Conflicting action","A notice goes out without knowing another Bureau's action."],["Unclear ownership","Officials cannot tell who holds the case or what happens next."],["Missed timelines","Pending cases are not visible until they are overdue."],["Fragmented history","No single timeline of everything about one institution."],["Weak accountability","Management cannot see workload or ageing in real time."]]
            .map(([t, d], i) => <Reveal key={t} delay={i * 70}><div className="card"><h3 className="bad">✗ {t}</h3><p>{d}</p></div></Reveal>)}
        </div>
      </div></section>

      <section id="solution" className="alt"><div className="wrap">
        <Reveal><div className="kicker">The solution</div>
        <h2>A single window with an intelligence layer</h2>
        <p className="sub">CaseLink does not replace the working systems of RB or PGRC. It brings their cases into one institution-centric view, detects potential overlap, and gives officers the evidence to coordinate before they act.</p></Reveal>
        <div className="grid g3">
          {features.map(([i, c, t, d], k) => <Reveal key={t} delay={k * 70}><div className="card"><div className="ico" style={{ background: c }}>{i}</div><h3>{t}</h3><p>{d}</p></div></Reveal>)}
        </div>
        <Reveal><div className="note"><b>Design principle.</b> Two complaints about one institution are not automatically duplicates. One may be about approval and another about a fee refund, so CaseLink flags, explains and hands the decision to an authorised officer.</div></Reveal>
      </div></section>

      <section id="demo"><div className="wrap">
        <Reveal><div className="kicker">Live demo</div>
        <h2>Review a potential overlap</h2>
        <p className="sub">Two cases from different Bureaus, worded differently, about the same institution. Make a decision and watch it land in the audit trail. Synthetic demo data.</p></Reveal>
        <Reveal><Demo /></Reveal>
      </div></section>

      <section id="dashboard" className="alt"><div className="wrap">
        <Reveal><div className="kicker">Dashboard</div>
        <h2>Real-time view for every Bureau and Cell</h2>
        <p className="sub">Numbers below are from the prototype's synthetic dataset.</p></Reveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", marginBottom: 20 }}>
          {[["14","Total cases","var(--navy)"],["5","Pending","var(--amber)"],["5","Under process","var(--blue)"],["2","Disposed","var(--green)"],["1","Transferred","var(--purple)"],["2","Beyond timeline","var(--red)"]]
            .map(([n, l, c], i) => <Reveal key={l} delay={i * 60}><div className="card kpi"><b style={{ color: c }}>{n}</b><span style={{ color: "var(--mut)", fontSize: 13 }}>{l}</span></div></Reveal>)}
        </div>
        <Reveal><div className="card" style={{ transform: "none" }}>
          <h3>Bureau / Cell workload by status</h3>
          {bureaus.map(([name, total, parts]) => (
            <div key={name} style={{ margin: "12px 0" }}>
              <div className="row" style={{ fontSize: 14 }}><b>{name}</b><span style={{ color: "var(--mut)" }}>{total} cases</span></div>
              <div className="stack" style={{ width: `${(total / 7) * 100}%` }}>{parts.map(([col, n], i) => <span key={i} style={{ background: col, flex: n }} />)}</div>
            </div>
          ))}
          <div className="chips" style={{ marginTop: 6 }}>
            {[["Pending","t-amber"],["Under process","t-blue"],["Disposed","t-green"],["Transferred","t-purple"],["Escalated","t-red"]].map(([l, c]) => <span key={l} className={`tag ${c}`}>{l}</span>)}
          </div>
        </div></Reveal>
      </div></section>

      <section id="how"><div className="wrap">
        <Reveal><div className="kicker">How it works</div>
        <h2>The complaint lifecycle</h2>
        <p className="sub">Click a stage. Ambiguity always goes to a person, and every decision leaves a trace.</p></Reveal>
        <div className="steps">{lifecycle.map(([t], i) => <button key={t} className={`step ${i === step ? "on" : ""}`} onClick={() => setStep(i)}>{i + 1}. {t}</button>)}</div>
        <div className="card" style={{ transform: "none" }}><h3>{step + 1}. {lifecycle[step][0]}</h3><p>{lifecycle[step][1]}</p></div>
        <div className="grid g3" style={{ marginTop: 20 }}>
          {[["Gate","Same verified institution, other Bureau/Cell, case still open."],["Score","Topic + semantic similarity + shared entities + timing, calibrated on labelled cases."],["Tiers","A: coordinate · B: manual review · C: same institution, info only."]]
            .map(([t, d], i) => <Reveal key={t} delay={i * 80}><div className="card"><span className="tag t-orange">{t}</span><p style={{ marginTop: 8 }}>{d}</p></div></Reveal>)}
        </div>
      </div></section>

      <section id="tech" className="alt"><div className="wrap">
        <Reveal><div className="kicker">Architecture</div>
        <h2>Simple to build, ready to scale</h2>
        <p className="sub">A modular monolith with an asynchronous worker. Load balancer, worker pool and replicas are the production design; the prototype runs lean.</p></Reveal>
        <div className="grid g2">
          <Reveal><div className="card"><h3>Flow</h3>
            <p>Users → React dashboard → Load balancer → FastAPI instances (Auth/RBAC · Identity · Routing · Workflow · Overlap · Alerts · Reports) → PostgreSQL + pgvector, with Redis/Celery workers, object storage and an audit log.</p></div></Reveal>
          <Reveal delay={80}><div className="card"><h3>Technology stack</h3>
            <div className="chips" style={{ marginTop: 8 }}>
              {["React + TypeScript","Python + FastAPI","PostgreSQL","pgvector","Redis + Celery","Sentence-Transformers","OAuth 2.0 / JWT + RBAC","Docker"].map((t) => <span key={t} className="tag t-blue">{t}</span>)}
            </div></div></Reveal>
          <Reveal><div className="card"><h3>Scalability</h3><p>Stateless API instances behind a load balancer, independently scaled workers, indexed queries, connection pooling, and read replicas only when reports compete with case entry.</p></div></Reveal>
          <Reveal delay={80}><div className="card"><h3>Security</h3><p>Role-based access enforced on the server, masked cross-Bureau view, TLS and encryption at rest, an append-only audit log, and self-hosted NLP so complaint text never leaves the environment.</p></div></Reveal>
        </div>
      </div></section>

      <section id="impact"><div className="wrap">
        <Reveal><div className="kicker">Impact</div><h2>Who benefits and how</h2></Reveal>
        <div className="grid g3" style={{ marginTop: 24 }}>
          {[["RB officers","See open grievances before issuing a notice."],["PGRC officers","Know instantly if a regulatory action already exists."],["Regional Offices","Targeted verification tasks with clear status."],["Senior management","Live workload, ageing and hotspot view."],["Complainants","Clear status and faster, consistent decisions."],["AICTE","A single source of truth and a full audit trail."]]
            .map(([t, d], i) => <Reveal key={t} delay={i * 60}><div className="card"><h3>{t}</h3><p>{d}</p></div></Reveal>)}
        </div>
        <Reveal><div className="note"><b>No invented savings.</b> Targets are set after measuring a baseline on real data. Planned KPIs: time to identify case owner, overlaps flagged vs confirmed, SLA breach rate, median age of open cases, match precision and recall.</div></Reveal>
      </div></section>

      <section id="roadmap" className="alt"><div className="wrap">
        <Reveal><div className="kicker">Roadmap</div><h2>From prototype to production</h2></Reveal>
        <div className="tl" style={{ marginTop: 24 }}>
          {[["Prototype","Synthetic data, five screens, overlap review flow, alerts and reports."],["Pilot: RB + PGRC","Read-only sync of real data, calibrate thresholds, collect baselines."],["Rollout","All Bureaus/Cells and Regional Offices, SSO, case detail and documents."],["Harden and scale","High-availability database, disaster-recovery drills, security audit."]]
            .map(([t, d], i) => <Reveal key={t} delay={i * 90}><div className="card"><b className="n">{i + 1}</b><h3>{t}</h3><p>{d}</p></div></Reveal>)}
        </div>
        <Reveal><div className="note" style={{ background: "#fde9e9", borderColor: "var(--red)" }}><b>Honest limits.</b> All data here is synthetic. The prototype is not connected to any AICTE system, routing rules are illustrative until AICTE confirms its allocation, and match percentages are suggestion scores until calibrated on labelled data.</div></Reveal>
      </div></section>

      <section id="faq"><div className="wrap faq">
        <Reveal><div className="kicker">FAQ</div><h2>Questions reviewers ask</h2></Reveal>
        <div style={{ marginTop: 24 }}>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div></section>

      <footer><div className="wrap row">
        <span><b style={{ color: "#fff" }}>CaseLink</b> · Integrated Dashboard for Monitoring and Tracking Institution-Related Complaint Cases Across AICTE Bureaus/Cells</span>
        <span>Smart India Hackathon 2025</span>
      </div></footer>
    </>
  );
}