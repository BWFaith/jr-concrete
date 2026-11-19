/* EDIT THIS FILE: owner email, EmailJS keys and pricing */
window.JR = {
  ownerEmail: "OWNER_EMAIL@example.com",
  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
  },
  // price per sq ft (USD) – low / high
  rates: {
    driveway: [6, 10],
    sidewalk: [6, 9],
    patio: [7, 12],
    slab: [6, 10],
    paving: [7, 11],
    retaining: [28, 48],
    breakout: [5, 9],
    spray: [9, 14],
    sawcut: [3, 6],
  },
  finish: {
    broom: 0,
    stamped: [4, 7],
    aggregate: [3, 5],
    color: [1.5, 3],
    spray: [2, 4],
  },
  minJob: [650, 900],
  rebar: [0.9, 1.4],
  thick: { 4: 1, 5: 1.15, 6: 1.3 },
  zone: { near: 0, mid: 150, far: 300 },
};
