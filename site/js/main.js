(function () {
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const hd = $("header"),
    pr = $("#prog");
  addEventListener(
    "scroll",
    () => {
      hd.classList.toggle("s", scrollY > 50);
      pr.style.width =
        (scrollY /
          (document.body.scrollHeight - innerHeight)) *
          100 +
        "%";
    },
    { passive: true },
  );
  const bg = $(".burger"),
    ul = $("nav ul");
  bg.onclick = () => {
    const o = ul.classList.toggle("o");
    bg.setAttribute("aria-expanded", o);
  };
  $$("nav a").forEach(
    (a) => (a.onclick = () => ul.classList.remove("o")),
  );
  /* reveal */
  const io = new IntersectionObserver(
    (e) =>
      e.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          io.unobserve(x.target);
        }
      }),
    { threshold: 0.12 },
  );
  $$(".rv").forEach((el) => io.observe(el));
  /* counters */
  const co = new IntersectionObserver(
    (e) =>
      e.forEach((x) => {
        if (!x.isIntersecting) return;
        const el = x.target,
          t = +el.dataset.n,
          s = el.dataset.s || "";
        let n = 0;
        const st = performance.now();
        (function f(now) {
          const p = Math.min((now - st) / 1600, 1);
          el.textContent =
            Math.round(t * (1 - Math.pow(1 - p, 3))) + s;
          if (p < 1) requestAnimationFrame(f);
        })(st);
        co.unobserve(el);
      }),
    { threshold: 0.5 },
  );
  $$("[data-n]").forEach((el) => co.observe(el));
  /* hero */
  const sl = $$(".slides div");
  if (sl.length) {
    let i = 0;
    sl[0].classList.add("on");
    setInterval(() => {
      sl[i].classList.remove("on");
      i = (i + 1) % sl.length;
      sl[i].classList.add("on");
    }, 7000);
  }
  const rot = $(".rot");
  if (rot) {
    const w = rot.dataset.w.split(","),
      r = 0;
    let k = 0;
    setInterval(() => {
      rot.classList.add("x");
      setTimeout(() => {
        k = (k + 1) % w.length;
        rot.textContent = w[k];
        rot.classList.remove("x");
      }, 450);
    }, 2600);
  }
  const hc = $(".hc");
  if (hc && matchMedia("(hover:hover)").matches)
    addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 14,
        y = (e.clientY / innerHeight - 0.5) * 10;
      $(".slides").style.transform =
        `translate(${-x}px,${-y}px) scale(1.04)`;
    });
  /* faq */
  $$(".fq button").forEach(
    (b) =>
      (b.onclick = () =>
        b.parentElement.classList.toggle("on")),
  );
  /* gallery */
  const fb = $$(".fl button"),
    figs = $$(".gal figure");
  fb.forEach(
    (b) =>
      (b.onclick = () => {
        fb.forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        figs.forEach(
          (f) =>
            (f.style.display =
              b.dataset.f === "all" ||
              f.dataset.c === b.dataset.f
                ? ""
                : "none"),
        );
      }),
  );
  const lb = $(".lb");
  if (lb)
    (figs.forEach(
      (f) =>
        (f.onclick = () => {
          $("img", lb).src = f.querySelector("img").src;
          lb.classList.add("on");
        }),
    ),
      (lb.onclick = () => lb.classList.remove("on")));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb) lb.classList.remove("on");
  });
  /* quote calculator */
  const F = $("#qf");
  if (F) {
    const C = JR,
      $f = (n) => F.elements[n],
      fmt = (n) => "$" + Math.round(n).toLocaleString();
    const dt = $f("date");
    dt.min = new Date(Date.now() + 864e5)
      .toISOString()
      .slice(0, 10);
    function calc() {
      const s = $f("service").value,
        a = Math.max(+$f("area").value || 0, 0),
        th = C.thick[$f("thick").value] || 1;
      let lo =
          C.rates[s][0] * a * (s === "retaining" ? 1 : th),
        hi =
          C.rates[s][1] * a * (s === "retaining" ? 1 : th);
      const rows = [
        [
          $f("service").selectedOptions[0].text +
            " (" +
            a +
            " sq ft)",
          fmt(lo) + " – " + fmt(hi),
        ],
      ];
      const fin = $f("finish").value;
      if (C.finish[fin]) {
        const f = C.finish[fin];
        lo += f[0] * a;
        hi += f[1] * a;
        rows.push([
          $f("finish").selectedOptions[0].text,
          "+" + fmt(f[0] * a) + " – " + fmt(f[1] * a),
        ]);
      }
      if ($f("rebar").checked) {
        lo += C.rebar[0] * a;
        hi += C.rebar[1] * a;
        rows.push([
          "Rebar reinforcement",
          "+" +
            fmt(C.rebar[0] * a) +
            " – " +
            fmt(C.rebar[1] * a),
        ]);
      }
      if ($f("demo").checked) {
        const d = C.rates.breakout;
        lo += d[0] * a;
        hi += d[1] * a;
        rows.push([
          "Demolition & haul-off",
          "+" + fmt(d[0] * a) + " – " + fmt(d[1] * a),
        ]);
      }
      const z = C.zone[$f("zone").value];
      if (z) {
        lo += z;
        hi += z;
        rows.push(["Travel / distance", "+" + fmt(z)]);
      }
      if (a > 0) {
        lo = Math.max(lo, C.minJob[0]);
        hi = Math.max(hi, C.minJob[1]);
      } else lo = hi = 0;
      $("#er").textContent = a
        ? fmt(lo) + " – " + fmt(hi)
        : "$0";
      $("#tb").innerHTML = rows
        .map(
          (r) =>
            `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`,
        )
        .join("");
      return {
        range: a ? fmt(lo) + " – " + fmt(hi) : "N/A",
        rows,
      };
    }
    F.addEventListener("input", calc);
    calc();
    F.onsubmit = async (e) => {
      e.preventDefault();
      const m = $("#msg"),
        q = calc(),
        d = Object.fromEntries(new FormData(F));
      if (!(+d.area > 0)) {
        m.className = "msg er";
        m.textContent =
          "Enter the project size in square feet to get an estimate.";
        return;
      }
      const summary = q.rows
        .map((r) => r.join(": "))
        .join("\n");
      const p = {
        to_email: d.email,
        owner_email: C.ownerEmail,
        customer_name: d.name,
        phone: d.phone,
        address: d.address,
        service: $f("service").selectedOptions[0].text,
        date: d.date,
        time: d.time,
        notes: d.notes || "None",
        estimate: q.range,
        breakdown: summary,
      };
      const btn = $("button[type=submit]", F);
      btn.disabled = true;
      btn.textContent = "Sending…";
      try {
        if (
          !window.emailjs ||
          C.emailjs.publicKey.startsWith("YOUR")
        )
          throw 0;
        emailjs.init(C.emailjs.publicKey);
        await emailjs.send(
          C.emailjs.serviceId,
          C.emailjs.templateId,
          p,
        );
        m.className = "msg ok";
        m.textContent =
          "Booking received! A copy of your quote was sent to " +
          d.email +
          ". We will call you to confirm.";
        F.reset();
        calc();
      } catch (x) {
        m.className = "msg er";
        m.innerHTML =
          'Email service is not connected yet. <a href="mailto:' +
          C.ownerEmail +
          "?subject=" +
          encodeURIComponent(
            "Booking request – " + p.service,
          ) +
          "&body=" +
          encodeURIComponent(
            summary +
              "\nName: " +
              p.customer_name +
              "\nPhone: " +
              p.phone +
              "\nDate: " +
              p.date +
              " " +
              p.time +
              "\nAddress: " +
              p.address +
              "\nEstimate: " +
              p.estimate,
          ) +
          '"><u>Send this booking by email instead</u></a> or call 346-438-7834.';
      }
      btn.disabled = false;
      btn.textContent = "Book & email my quote";
    };
  }
})();
