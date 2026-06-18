/* =======================================================
   Golden Touch Hair Style — AI Chat Widget
   Handles all pages. Embed with:
   <script src="chatbot.js"></script>  (before </body>)
   ======================================================= */

(function () {

  /* ── Knowledge Base ─────────────────────────────────── */
  const KB = [
    {
      keys: ['hour', 'open', 'close', 'time', 'when', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'late'],
      reply: `<strong>Our opening hours vary by location:</strong><br><br>
📍 <strong>Jordan Springs</strong><br>Mon–Wed & Fri: 9am – 6pm<br>Thu: 9am – 9pm (late night!)<br>Sat: 8:30am – 5:30pm | Sun: 9am – 5pm<br><br>
📍 <strong>Camden</strong><br>Mon–Fri: 9am – 6pm<br>Sat: 8:30am – 5pm | Sun: Closed<br><br>
📍 <strong>St Marys</strong><br>Mon–Fri: 9am – 6pm<br>Sat: 9am – 5pm<br><br>
📍 <strong>Pitt Town</strong><br>Mon–Fri: 9am – 6pm<br>Sat: 9am – 5pm<br><br>
Walk-ins welcome at all locations! 🎉`
    },
    {
      keys: ['location', 'address', 'where', 'find', 'suburb', 'near', 'shop'],
      reply: `<strong>We have 4 locations across Western Sydney:</strong><br><br>
📍 <strong>Jordan Springs</strong> — 11/56 Lakeside Parade, Jordan Springs NSW 2747<br><br>
📍 <strong>Camden</strong> — 106 Argyle St, Camden NSW 2570<br><br>
📍 <strong>St Marys</strong> — St Marys Village Shopping Centre, St Marys NSW 2760<br><br>
📍 <strong>Pitt Town</strong> — Hawkesbury / Pitt Town NSW<br><br>
<a href="contact.html" style="color:#c9a84c;">View full details →</a>`
    },
    {
      keys: ['price', 'cost', 'how much', 'charge', 'fee', 'rate', 'dollar', '$'],
      reply: `<strong>Our service prices (starting from):</strong><br><br>
✂ Men's Haircut — <strong>$35</strong><br>
💈 Fade / Skin Fade — <strong>$40</strong><br>
🧔 Beard Trim & Shape — <strong>$20</strong><br>
🪒 Hot Towel Shave — <strong>$45</strong><br>
✨ Hair & Beard Combo — <strong>$55</strong><br>
👦 Kids' Haircut — <strong>$25</strong><br>
🌟 VIP Package — <strong>$90</strong><br><br>
<a href="services.html" style="color:#c9a84c;">See full pricing →</a>`
    },
    {
      keys: ['book', 'appointment', 'reserve', 'schedule', 'slot'],
      reply: `<strong>Booking is easy! You have two options:</strong><br><br>
📅 <strong>Book online</strong> — <a href="contact.html" style="color:#c9a84c;">Fill in our booking form</a> and we'll confirm via phone or SMS.<br><br>
🚶 <strong>Walk in</strong> — All locations welcome walk-ins during opening hours. No appointment needed!<br><br>
📞 <strong>Call us</strong> — For same-day bookings, a quick call is always fastest.`
    },
    {
      keys: ['fade', 'skin fade', 'bald fade', 'taper'],
      reply: `<strong>Our fades are our most popular service!</strong><br><br>
💈 We do all types: skin fade, bald fade, low fade, mid fade, high fade, and taper. Every fade is blended with precision — no choppy lines, ever.<br><br>
Starting from <strong>$40</strong> · 40–55 mins<br><br>
<a href="contact.html" style="color:#c9a84c;">Book a fade →</a>`
    },
    {
      keys: ['haircut', 'cut', 'trim', 'scissor', 'style'],
      reply: `<strong>Men's Haircuts at Golden Touch</strong><br><br>
✂ We offer standard clipper cuts, scissor cuts, textured cuts, and styled finishes — all tailored to your face shape and lifestyle.<br><br>
Starting from <strong>$35</strong> · 30–45 mins<br><br>
Not sure what style suits you? Our barbers will consult with you before picking up the scissors.`
    },
    {
      keys: ['beard', 'shave', 'hot towel', 'straight razor'],
      reply: `<strong>Beard & Shave Services</strong><br><br>
🧔 <strong>Beard Trim & Shape</strong> — Define your lines, shape your beard, finish with balm. From <strong>$20</strong><br><br>
🪒 <strong>Hot Towel Shave</strong> — The full traditional experience. Warm towels, rich lather, straight razor finish. Pure relaxation. From <strong>$45</strong><br><br>
Pair it with a haircut for the full combo from <strong>$55</strong>.`
    },
    {
      keys: ['kid', 'child', 'son', 'boy', 'junior', 'young', 'first', 'toddler'],
      reply: `<strong>Kids are very welcome at Golden Touch! 👦</strong><br><br>
Our barbers are patient and experienced at making kids feel comfortable — even for their very first haircut.<br><br>
Kids' haircut starting from <strong>$25</strong> · 20–30 mins<br><br>
We recommend booking ahead for kids on weekends.`
    },
    {
      keys: ['walk', 'walk-in', 'walkin', 'no appointment', 'without booking', 'drop in'],
      reply: `<strong>Yes — walk-ins are welcome at all locations! 🚶</strong><br><br>
You can come in anytime during opening hours without an appointment. We always try to fit walk-ins in as quickly as possible.<br><br>
For weekends and Thursday evenings, booking ahead is recommended to avoid a wait.`
    },
    {
      keys: ['park', 'parking', 'car'],
      reply: `<strong>Parking at each location:</strong><br><br>
📍 <strong>Jordan Springs</strong> — Free parking directly outside the shop at Lakeside Parade.<br><br>
📍 <strong>Camden</strong> — Street parking available on Argyle St and surrounding streets.<br><br>
📍 <strong>St Marys</strong> — Free parking at St Marys Village Shopping Centre.<br><br>
📍 <strong>Pitt Town</strong> — Parking available at the shopfront.`
    },
    {
      keys: ['jordan', 'lakeside', '2747'],
      reply: `<strong>Jordan Springs Location:</strong><br><br>
📍 11/56 Lakeside Parade, Jordan Springs NSW 2747<br><br>
🕐 Mon–Wed & Fri: 9am–6pm<br>Thu: 9am–9pm (late!) | Sat: 8:30am–5:30pm | Sun: 9am–5pm<br><br>
Free parking directly outside. Walk-ins welcome!`
    },
    {
      keys: ['camden', 'argyle', '2570'],
      reply: `<strong>Camden Location:</strong><br><br>
📍 106 Argyle St, Camden NSW 2570<br><br>
🕐 Mon–Fri: 9am–6pm<br>Sat: 8:30am–5pm | Sun: Closed<br><br>
Walk-ins welcome. Find us on Instagram @goldentouchbarber1`
    },
    {
      keys: ['st mary', 'saint mary', 'marys', 'village', '2760'],
      reply: `<strong>St Marys Location:</strong><br><br>
📍 St Marys Village Shopping Centre, St Marys NSW 2760<br><br>
🕐 Mon–Fri: 9am–6pm | Sat: 9am–5pm<br><br>
Plenty of free parking at the shopping centre!`
    },
    {
      keys: ['pitt', 'pitttown', 'hawkesbury'],
      reply: `<strong>Pitt Town Location:</strong><br><br>
📍 Pitt Town, Hawkesbury NSW<br><br>
🕐 Mon–Fri: 9am–6pm | Sat: 9am–5pm<br><br>
Serving the Hawkesbury community!`
    },
    {
      keys: ['instagram', 'facebook', 'social', 'follow', 'tiktok', 'ig'],
      reply: `<strong>Follow Golden Touch online! 📱</strong><br><br>
📸 Instagram: <a href="https://instagram.com/goldentouchbarber1" target="_blank" style="color:#c9a84c;">@goldentouchbarber1</a><br><br>
👍 Facebook: <a href="https://facebook.com/goldentouchbarber" target="_blank" style="color:#c9a84c;">@goldentouchbarber</a><br><br>
Check out our work, latest cuts, and special offers there!`
    },
    {
      keys: ['vip', 'package', 'special', 'full', 'everything'],
      reply: `<strong>Our VIP Package 🌟</strong><br><br>
The full Golden Touch experience — haircut + beard shaping + hot towel shave + scalp massage. Walk in looking regular, walk out looking elite.<br><br>
From <strong>$90</strong> · 80–100 mins<br><br>
Perfect for special occasions, job interviews, or just treating yourself. <a href="contact.html" style="color:#c9a84c;">Book in advance →</a>`
    },
    {
      keys: ['hi', 'hello', 'hey', 'g\'day', 'sup', 'help', 'start'],
      reply: `<strong>G'day! Welcome to Golden Touch Hair Style 💈</strong><br><br>
I can help you with:<br>
• 📍 Our 4 locations & hours<br>
• 💰 Pricing & services<br>
• 📅 Booking an appointment<br>
• ✂ Any questions about what we do<br><br>
What would you like to know?`
    },
    {
      keys: ['thank', 'thanks', 'cheers', 'great', 'awesome', 'perfect'],
      reply: `You're welcome! See you in the chair soon 💈✂<br><br>
Is there anything else I can help you with?`
    }
  ];

  const FALLBACK = `Great question! Our team can give you the best answer on that.<br><br>
📞 <strong>Call us</strong> at your nearest location<br>
📅 <strong><a href="contact.html" style="color:#c9a84c;">Book online</a></strong> and mention your question<br><br>
We're open 7 days and love hearing from you! ✂`;

  /* ── Inject Styles ───────────────────────────────────── */
  const css = `
    #gt-chat-btn {
      position: fixed;
      bottom: 28px; right: 28px;
      width: 60px; height: 60px;
      background: linear-gradient(135deg, #a07c30, #c9a84c, #e8c96d);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 6px 24px rgba(201,168,76,.45);
      cursor: pointer;
      z-index: 9999;
      border: none;
      transition: transform .25s ease, box-shadow .25s ease;
      color: #0d0d0d;
    }
    #gt-chat-btn:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(201,168,76,.6); }
    #gt-chat-btn .notif {
      position: absolute; top: -2px; right: -2px;
      width: 16px; height: 16px;
      background: #4caf7d;
      border-radius: 50%;
      border: 2px solid #0d0d0d;
      animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%,100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }

    #gt-chat-box {
      position: fixed;
      bottom: 100px; right: 28px;
      width: 360px;
      max-height: 520px;
      background: #141414;
      border: 1px solid #2c2c2c;
      border-radius: 20px;
      box-shadow: 0 16px 60px rgba(0,0,0,.7);
      display: flex; flex-direction: column;
      z-index: 9998;
      overflow: hidden;
      transform: scale(.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease;
    }
    #gt-chat-box.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .gt-chat-head {
      background: linear-gradient(135deg, #0d0d0d, #1a1700);
      border-bottom: 1px solid #2c2c2c;
      padding: 1rem 1.25rem;
      display: flex; align-items: center; gap: .75rem;
      flex-shrink: 0;
    }
    .gt-chat-avatar {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #a07c30, #e8c96d);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      font-weight: 900;
      color: #0d0d0d;
      flex-shrink: 0;
    }
    .gt-chat-head-info { flex: 1; }
    .gt-chat-head-name { color: #fff; font-weight: 700; font-size: .88rem; }
    .gt-chat-head-status {
      font-size: .72rem; color: #4caf7d;
      display: flex; align-items: center; gap: 4px;
    }
    .gt-chat-head-status::before {
      content: ''; width: 6px; height: 6px;
      background: #4caf7d; border-radius: 50%; display: inline-block;
    }
    .gt-close-btn {
      background: none; border: none; color: #7a7a7a;
      cursor: pointer; font-size: 1.2rem; padding: 4px;
      line-height: 1; transition: color .2s;
    }
    .gt-close-btn:hover { color: #fff; }

    .gt-chat-msgs {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex; flex-direction: column; gap: .75rem;
      scroll-behavior: smooth;
    }
    .gt-chat-msgs::-webkit-scrollbar { width: 4px; }
    .gt-chat-msgs::-webkit-scrollbar-track { background: transparent; }
    .gt-chat-msgs::-webkit-scrollbar-thumb { background: #2c2c2c; border-radius: 4px; }

    .gt-msg {
      display: flex; gap: .5rem;
      animation: msgIn .3s ease both;
    }
    @keyframes msgIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .gt-msg.user { flex-direction: row-reverse; }
    .gt-msg-avatar {
      width: 28px; height: 28px; min-width: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a07c30, #e8c96d);
      display: flex; align-items: center; justify-content: center;
      font-size: .65rem; font-weight: 900; color: #0d0d0d;
      margin-top: 2px; flex-shrink: 0;
    }
    .gt-msg.user .gt-msg-avatar { background: #2c2c2c; }
    .gt-msg-bubble {
      max-width: 85%;
      background: #1a1a1a;
      border: 1px solid #2c2c2c;
      border-radius: 14px 14px 14px 4px;
      padding: .65rem .9rem;
      font-size: .82rem;
      line-height: 1.65;
      color: #d8cfc0;
    }
    .gt-msg.user .gt-msg-bubble {
      background: linear-gradient(135deg, #a07c30, #c9a84c);
      border-color: transparent;
      color: #0d0d0d;
      border-radius: 14px 14px 4px 14px;
      font-weight: 600;
    }
    .gt-msg-bubble a { color: #c9a84c; }
    .gt-msg.user .gt-msg-bubble a { color: #0d0d0d; text-decoration: underline; }

    .gt-typing {
      display: flex; gap: 5px; padding: .65rem .9rem;
      background: #1a1a1a; border: 1px solid #2c2c2c;
      border-radius: 14px 14px 14px 4px;
      width: fit-content;
    }
    .gt-typing span {
      width: 6px; height: 6px; border-radius: 50%;
      background: #7a7a7a;
      animation: typing-bounce .9s infinite;
    }
    .gt-typing span:nth-child(2) { animation-delay: .15s; }
    .gt-typing span:nth-child(3) { animation-delay: .30s; }
    @keyframes typing-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-6px); background: #c9a84c; }
    }

    .gt-quick-replies {
      display: flex; flex-wrap: wrap; gap: .4rem;
      padding: 0 1rem .75rem;
    }
    .gt-qr {
      background: rgba(201,168,76,.10);
      border: 1px solid rgba(201,168,76,.3);
      border-radius: 9999px;
      padding: .28rem .75rem;
      font-size: .72rem;
      color: #c9a84c;
      cursor: pointer;
      transition: all .2s ease;
      white-space: nowrap;
    }
    .gt-qr:hover { background: #c9a84c; color: #0d0d0d; }

    .gt-chat-input-row {
      padding: .75rem 1rem;
      border-top: 1px solid #2c2c2c;
      display: flex; gap: .5rem; align-items: center;
      flex-shrink: 0;
    }
    .gt-input {
      flex: 1;
      background: #0d0d0d;
      border: 1px solid #2c2c2c;
      border-radius: 9999px;
      padding: .5rem 1rem;
      font-size: .82rem;
      color: #fff;
      outline: none;
      font-family: inherit;
      transition: border-color .2s;
    }
    .gt-input::placeholder { color: #555; }
    .gt-input:focus { border-color: #c9a84c; }
    .gt-send-btn {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, #a07c30, #c9a84c);
      border: none; border-radius: 50%;
      color: #0d0d0d;
      font-size: 1rem;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: transform .2s, box-shadow .2s;
    }
    .gt-send-btn:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(201,168,76,.4); }

    @media (max-width: 480px) {
      #gt-chat-box { width: calc(100vw - 24px); right: 12px; bottom: 90px; }
      #gt-chat-btn { bottom: 20px; right: 20px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Build Widget HTML ────────────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', `
    <button id="gt-chat-btn" aria-label="Chat with us">
      ✂
      <span class="notif"></span>
    </button>

    <div id="gt-chat-box" role="dialog" aria-label="Golden Touch Chat">
      <div class="gt-chat-head">
        <div class="gt-chat-avatar">GT</div>
        <div class="gt-chat-head-info">
          <div class="gt-chat-head-name">Golden Touch Assistant</div>
          <div class="gt-chat-head-status">Online now · 4 locations</div>
        </div>
        <button class="gt-close-btn" id="gt-close-btn" aria-label="Close chat">✕</button>
      </div>

      <div class="gt-chat-msgs" id="gt-chat-msgs"></div>

      <div class="gt-quick-replies" id="gt-quick-replies">
        <span class="gt-qr" data-msg="What are your hours?">⏰ Hours</span>
        <span class="gt-qr" data-msg="Where are your locations?">📍 Locations</span>
        <span class="gt-qr" data-msg="How much does a haircut cost?">💰 Pricing</span>
        <span class="gt-qr" data-msg="How do I book an appointment?">📅 Booking</span>
        <span class="gt-qr" data-msg="Do you cut kids hair?">👦 Kids</span>
      </div>

      <div class="gt-chat-input-row">
        <input class="gt-input" id="gt-input" type="text" placeholder="Ask me anything..." maxlength="200" />
        <button class="gt-send-btn" id="gt-send-btn" aria-label="Send">➤</button>
      </div>
    </div>
  `);

  /* ── References ───────────────────────────────────────── */
  const chatBtn  = document.getElementById('gt-chat-btn');
  const chatBox  = document.getElementById('gt-chat-box');
  const closeBtn = document.getElementById('gt-close-btn');
  const msgs     = document.getElementById('gt-chat-msgs');
  const input    = document.getElementById('gt-input');
  const sendBtn  = document.getElementById('gt-send-btn');
  const qrs      = document.querySelectorAll('.gt-qr');

  let opened = false;

  /* ── Helpers ──────────────────────────────────────────── */
  function scrollBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addMsg(html, who = 'bot') {
    const initials = who === 'bot' ? 'GT' : 'You';
    const div = document.createElement('div');
    div.className = `gt-msg ${who}`;
    div.innerHTML = `
      <div class="gt-msg-avatar">${initials}</div>
      <div class="gt-msg-bubble">${html}</div>`;
    msgs.appendChild(div);
    scrollBottom();
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'gt-msg bot';
    row.id = 'gt-typing-row';
    row.innerHTML = `
      <div class="gt-msg-avatar">GT</div>
      <div class="gt-typing"><span></span><span></span><span></span></div>`;
    msgs.appendChild(row);
    scrollBottom();
  }

  function hideTyping() {
    const el = document.getElementById('gt-typing-row');
    if (el) el.remove();
  }

  function getReply(text) {
    const t = text.toLowerCase();
    for (const entry of KB) {
      if (entry.keys.some(k => t.includes(k))) return entry.reply;
    }
    return FALLBACK;
  }

  function sendMessage(text) {
    const msg = text.trim();
    if (!msg) return;
    addMsg(msg, 'user');
    input.value = '';
    showTyping();
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();
      addMsg(getReply(msg), 'bot');
    }, delay);
  }

  /* ── Events ───────────────────────────────────────────── */
  chatBtn.addEventListener('click', () => {
    chatBox.classList.add('open');
    chatBtn.querySelector('.notif')?.remove();
    input.focus();
    if (!opened) {
      opened = true;
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          hideTyping();
          addMsg(`<strong>G\'day! Welcome to Golden Touch Hair Style ✂</strong><br><br>I\'m here to help with locations, hours, pricing, and booking across all <strong>4 of our shops</strong>.<br><br>What can I help you with?`, 'bot');
        }, 900);
      }, 300);
    }
  });

  closeBtn.addEventListener('click', () => chatBox.classList.remove('open'));

  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });

  qrs.forEach(qr => {
    qr.addEventListener('click', () => {
      if (!chatBox.classList.contains('open')) chatBox.classList.add('open');
      sendMessage(qr.dataset.msg);
    });
  });

})();
