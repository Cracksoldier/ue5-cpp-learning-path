/*
 * landing.js — fills the landing page from window.CURRICULUM (content.js):
 * hero subtitle, curriculum stats, the per-stage topic cards, and — when the
 * visitor already has saved progress — a "Continue" CTA with a progress bar.
 *
 * Read-only: this page never writes to localStorage; the app (app.js) owns
 * the "ue5-cpp-progress-v1" key.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "ue5-cpp-progress-v1"; // must match js/app.js
  var DATA = window.CURRICULUM;
  if (!DATA) return;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  /* -------------------------------------------------------------- Stats */
  var stages = DATA.stages || [];
  var moduleCount = 0;
  var exerciseCount = 0;
  var validIds = {}; // same id scheme as app.js: "<module>:study" + exercise ids

  stages.forEach(function (st) {
    st.modules.forEach(function (mod) {
      moduleCount++;
      validIds[mod.id + ":study"] = true;
      (mod.exercises || []).forEach(function (ex) {
        exerciseCount++;
        validIds[ex.id] = true;
      });
    });
  });

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  setText("stat-stages", String(stages.length));
  setText("stat-modules", String(moduleCount));
  setText("stat-exercises", String(exerciseCount));
  if (DATA.subtitle) setText("hero-sub", DATA.subtitle);
  if (DATA.engineVersions) setText("engine-versions", "UE " + DATA.engineVersions);

  /* -------------------------------------------------------- Topic cards */
  var cardsRoot = document.getElementById("topic-cards");
  if (cardsRoot) {
    stages.forEach(function (stage, idx) {
      var chips = el("ul", { class: "module-chips" }, stage.modules.map(function (mod) {
        return el("li", { class: "module-chip", text: mod.title });
      }));

      var card = el("a", { class: "topic-card", href: "app.html#" + stage.id }, [
        el("div", { class: "topic-card-head" }, [
          el("span", { class: "stage-index", text: "Stage " + idx }),
          el("span", { class: "level-badge level-" + slug(stage.level), text: stage.level })
        ]),
        el("h3", { class: "topic-card-title", text: stage.title }),
        el("p", { class: "topic-card-summary", text: stage.summary }),
        chips
      ]);
      cardsRoot.appendChild(card);
    });
  }

  /* ------------------------------------------------- Returning visitor */
  // Count completed items the same way the app does: only `true` values
  // whose keys exist in the current curriculum.
  function completedCount() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return 0;
      var parsed = JSON.parse(raw);
      var completed = parsed && parsed.completed;
      if (!completed || typeof completed !== "object" || Array.isArray(completed)) return 0;
      return Object.keys(completed).filter(function (k) {
        return completed[k] === true && validIds[k] === true;
      }).length;
    } catch (e) {
      return 0; // storage unavailable or corrupt — treat as a fresh visitor
    }
  }

  var done = completedCount();
  var total = moduleCount + exerciseCount;
  if (done > 0 && total > 0) {
    var pct = Math.round((done / total) * 100);
    var cta = document.getElementById("cta-start");
    if (cta) cta.textContent = "Continue learning";
    var box = document.getElementById("cta-progress");
    var fill = document.getElementById("cta-progress-fill");
    var label = document.getElementById("cta-progress-label");
    if (box && fill && label) {
      fill.style.width = pct + "%";
      label.textContent = done + " / " + total + " done (" + pct + "%)";
      box.hidden = false;
    }
  }
})();
