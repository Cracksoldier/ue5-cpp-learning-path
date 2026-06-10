/*
 * app.js — rendering, progress tracking, persistence and import/export.
 *
 * Vanilla JS, classic <script> (no modules, no fetch) so it runs from file://
 * and from GitHub Pages identically. Loaded AFTER content.js, so the global
 * window.CURRICULUM is already defined.
 *
 * Progress model
 * --------------
 * Every trackable item has a stable string id:
 *   - "<moduleId>:study"  -> the "I've studied this module" checkbox
 *   - "<exerciseId>"      -> one per exercise/challenge
 * State is { version, completed: { [id]: true }, updatedAt } in localStorage.
 *
 * Two progress bars:
 *   - Total            = all completed items / all items (study + exercises)
 *   - Exercises only   = completed exercises / total exercises
 */
(function () {
  "use strict";

  var STORAGE_KEY = "ue5-cpp-progress-v1";
  var DATA = window.CURRICULUM;

  /* -------------------------------------------------------------------------
   * State
   * ---------------------------------------------------------------------- */
  var state = { version: 1, completed: {}, updatedAt: null };

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.completed) {
          state.completed = parsed.completed || {};
          state.version = parsed.version || 1;
          state.updatedAt = parsed.updatedAt || null;
        }
      }
    } catch (e) {
      // localStorage may be unavailable (some file:// + privacy settings).
      // The app still works for the session; progress just won't persist.
      console.warn("Could not load saved progress:", e);
    }
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Could not save progress (storage unavailable):", e);
    }
  }

  function isDone(id) {
    return state.completed[id] === true;
  }

  function setDone(id, done) {
    if (done) {
      state.completed[id] = true;
    } else {
      delete state.completed[id];
    }
    saveState();
  }

  /* -------------------------------------------------------------------------
   * Item enumeration & progress maths
   * ---------------------------------------------------------------------- */

  // Returns { totalAll, doneAll, totalEx, doneEx } across the whole curriculum
  // or, if a stage is passed, scoped to that stage.
  function computeProgress(stage) {
    var stages = stage ? [stage] : DATA.stages;
    var totalAll = 0, doneAll = 0, totalEx = 0, doneEx = 0;
    stages.forEach(function (st) {
      st.modules.forEach(function (mod) {
        // study item
        totalAll++;
        if (isDone(mod.id + ":study")) doneAll++;
        // exercises
        (mod.exercises || []).forEach(function (ex) {
          totalAll++;
          totalEx++;
          if (isDone(ex.id)) { doneAll++; doneEx++; }
        });
      });
    });
    return { totalAll: totalAll, doneAll: doneAll, totalEx: totalEx, doneEx: doneEx };
  }

  function pct(done, total) {
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }

  /* -------------------------------------------------------------------------
   * Small DOM helpers
   * ---------------------------------------------------------------------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "for") node.htmlFor = attrs[k]; // <label for> is the htmlFor DOM property
        else if (k.indexOf("data-") === 0 || k === "role" || k.indexOf("aria-") === 0)
          node.setAttribute(k, attrs[k]);
        else node[k] = attrs[k];
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var RESOURCE_ICON = { doc: "📄", video: "🎬", book: "📘", repo: "💾" };

  /* -------------------------------------------------------------------------
   * Rendering
   * ---------------------------------------------------------------------- */
  var contentRoot;

  function render() {
    contentRoot.innerHTML = "";
    DATA.stages.forEach(function (stage, idx) {
      contentRoot.appendChild(renderStage(stage, idx));
    });
    updateHeaderBars();
  }

  function renderStage(stage, idx) {
    var prog = computeProgress(stage);
    var stagePct = pct(prog.doneAll, prog.totalAll);

    var badge = el("span", { class: "level-badge level-" + slug(stage.level), text: stage.level });
    var miniFill = el("span", {
      class: "stage-mini-fill",
      role: "progressbar",
      "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(stagePct)
    });
    miniFill.style.width = stagePct + "%";
    var miniLabel = el("span", { class: "stage-mini-label", text: stagePct + "%" });
    var mini = el("span", { class: "stage-mini" }, [el("span", { class: "stage-mini-track" }, [miniFill]), miniLabel]);

    var caret = el("span", { class: "caret", text: "▸" });
    var header = el("button", {
      class: "stage-header",
      type: "button",
      "aria-expanded": idx === 0 ? "true" : "false"
    }, [
      caret,
      el("span", { class: "stage-index", text: "Stage " + idx }),
      el("span", { class: "stage-title", text: stage.title }),
      badge,
      mini
    ]);

    var body = el("div", { class: "stage-body" }, [
      el("p", { class: "stage-summary", text: stage.summary })
    ]);
    stage.modules.forEach(function (mod) {
      body.appendChild(renderModule(mod));
    });

    var wrapper = el("section", { class: "stage" + (idx === 0 ? " open" : "") }, [header, body]);

    header.addEventListener("click", function () {
      var open = wrapper.classList.toggle("open");
      header.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // expose a refresh hook for the per-stage mini bar
    wrapper._refreshMini = function () {
      var p = computeProgress(stage);
      var pp = pct(p.doneAll, p.totalAll);
      miniFill.style.width = pp + "%";
      miniFill.setAttribute("aria-valuenow", String(pp));
      miniLabel.textContent = pp + "%";
    };
    return wrapper;
  }

  function renderModule(mod) {
    var studyId = mod.id + ":study";

    var studyCheck = el("input", { type: "checkbox", id: studyId, class: "study-check" });
    studyCheck.checked = isDone(studyId);
    studyCheck.addEventListener("change", function () {
      setDone(studyId, studyCheck.checked);
      onProgressChanged(moduleNode);
    });

    var objectives = el("ul", { class: "objectives" },
      (mod.objectives || []).map(function (o) { return el("li", { text: o }); }));

    var resources = el("ul", { class: "resources" },
      (mod.resources || []).map(function (r) {
        var icon = RESOURCE_ICON[r.type] || "🔗";
        return el("li", {}, [
          el("span", { class: "res-icon", text: icon }),
          el("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", text: r.title })
        ]);
      }));

    var exercises = el("div", { class: "exercises" },
      (mod.exercises || []).map(renderExercise));

    var studyLabel = el("label", { class: "study-label", "for": studyId, text: "Mark module as studied" });

    var moduleNode = el("article", { class: "module" }, [
      el("div", { class: "module-head" }, [
        el("h3", { class: "module-title", text: mod.title })
      ]),
      el("h4", { class: "section-label", text: "Objectives" }),
      objectives,
      el("h4", { class: "section-label", text: "Learning resources" }),
      resources,
      el("div", { class: "study-row" }, [studyCheck, studyLabel]),
      el("h4", { class: "section-label", text: "Exercises & challenges" }),
      exercises
    ]);
    return moduleNode;
  }

  function renderExercise(ex) {
    var check = el("input", { type: "checkbox", id: ex.id, class: "ex-check" });
    check.checked = isDone(ex.id);

    var kindBadge = el("span", { class: "kind-badge kind-" + (ex.kind || "exercise"), text: ex.kind === "challenge" ? "Challenge" : "Exercise" });
    var diffBadge = el("span", { class: "diff-badge diff-" + (ex.difficulty || "medium"), text: ex.difficulty || "medium" });

    var card = el("div", { class: "exercise" + (check.checked ? " completed" : "") });

    var titleRow = el("label", { class: "ex-title-row", "for": ex.id }, [
      check,
      el("span", { class: "ex-title", text: ex.title }),
      kindBadge,
      diffBadge
    ]);

    var body = el("div", { class: "ex-body" }, [
      el("p", { class: "ex-goal" }, [el("strong", { text: "Goal: " }), document.createTextNode(ex.goal || "")])
    ]);

    if (ex.steps && ex.steps.length) {
      body.appendChild(el("p", { class: "ex-sub", text: "Steps" }));
      body.appendChild(el("ol", { class: "ex-steps" }, ex.steps.map(function (s) { return el("li", { text: s }); })));
    }
    if (ex.acceptance && ex.acceptance.length) {
      body.appendChild(el("p", { class: "ex-sub", text: "Done when" }));
      body.appendChild(el("ul", { class: "ex-acceptance" }, ex.acceptance.map(function (s) { return el("li", { text: s }); })));
    }
    if (ex.hints && ex.hints.length) {
      var hintList = el("ul", { class: "ex-hints" }, ex.hints.map(function (s) { return el("li", { text: s }); }));
      var details = el("details", { class: "hints" }, [
        el("summary", { text: "Hints" }),
        hintList
      ]);
      body.appendChild(details);
    }

    card.appendChild(titleRow);
    card.appendChild(body);

    check.addEventListener("change", function () {
      setDone(ex.id, check.checked);
      card.classList.toggle("completed", check.checked);
      onProgressChanged(card);
    });

    return card;
  }

  /* -------------------------------------------------------------------------
   * Progress bar updates
   * ---------------------------------------------------------------------- */
  function onProgressChanged(fromNode) {
    updateHeaderBars();
    // refresh the enclosing stage's mini bar
    var stageEl = fromNode && fromNode.closest ? fromNode.closest(".stage") : null;
    if (stageEl && stageEl._refreshMini) stageEl._refreshMini();
  }

  function updateHeaderBars() {
    var p = computeProgress(null);
    setBar("total", p.doneAll, p.totalAll);
    setBar("ex", p.doneEx, p.totalEx);
  }

  function setBar(prefix, done, total) {
    var fill = document.getElementById(prefix + "-fill");
    var label = document.getElementById(prefix + "-label");
    var percentage = pct(done, total);
    fill.style.width = percentage + "%";
    fill.setAttribute("aria-valuenow", String(percentage));
    label.textContent = done + " / " + total + " (" + percentage + "%)";
  }

  /* -------------------------------------------------------------------------
   * Import / Export / Reset
   * ---------------------------------------------------------------------- */
  function exportProgress() {
    var payload = {
      app: "ue5-cpp-learning-path",
      version: state.version || 1,
      exportedAt: new Date().toISOString(),
      completed: state.completed
    };
    var json = JSON.stringify(payload, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: "ue5-cpp-progress-" + dateStamp() + ".json" });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke after a tick so the download has started.
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    flash("Progress exported.", "ok");
  }

  function importProgressFromFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        var completed = parsed && parsed.completed;
        if (!completed || typeof completed !== "object" || Array.isArray(completed)) {
          throw new Error("Missing or invalid 'completed' map.");
        }
        // Keep only truthy boolean entries — defensive against tampered files.
        var clean = {};
        Object.keys(completed).forEach(function (k) {
          if (completed[k] === true) clean[k] = true;
        });
        state.completed = clean;
        state.version = parsed.version || state.version || 1;
        saveState();
        render();
        flash("Progress imported (" + Object.keys(clean).length + " items).", "ok");
      } catch (e) {
        flash("Import failed: " + e.message, "err");
      }
    };
    reader.onerror = function () { flash("Could not read the file.", "err"); };
    reader.readAsText(file);
  }

  function resetProgress() {
    var count = Object.keys(state.completed).length;
    if (count === 0) { flash("Nothing to reset.", "ok"); return; }
    if (!window.confirm("Reset all progress? This clears " + count + " completed items. Export first if you want a backup.")) {
      return;
    }
    state.completed = {};
    saveState();
    render();
    flash("Progress reset.", "ok");
  }

  /* -------------------------------------------------------------------------
   * Toast / flash messages
   * ---------------------------------------------------------------------- */
  var flashTimer = null;
  function flash(msg, kind) {
    var box = document.getElementById("flash");
    box.textContent = msg;
    box.className = "flash show " + (kind || "ok");
    if (flashTimer) clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { box.className = "flash"; }, 3500);
  }

  /* -------------------------------------------------------------------------
   * Misc helpers
   * ---------------------------------------------------------------------- */
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  function dateStamp() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
  }

  function expandAll(open) {
    var stages = contentRoot.querySelectorAll(".stage");
    stages.forEach(function (s) {
      s.classList.toggle("open", open);
      var h = s.querySelector(".stage-header");
      if (h) h.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* -------------------------------------------------------------------------
   * Boot
   * ---------------------------------------------------------------------- */
  function init() {
    if (!DATA || !DATA.stages) {
      document.body.innerHTML = "<p style='padding:2rem;color:#f88'>Could not load curriculum (content.js missing).</p>";
      return;
    }

    // Fill the header title/subtitle from data.
    var titleEl = document.getElementById("app-title");
    var subEl = document.getElementById("app-subtitle");
    if (titleEl) titleEl.textContent = DATA.title + " — UE " + DATA.engineVersions;
    if (subEl) subEl.textContent = DATA.subtitle;

    contentRoot = document.getElementById("content");

    loadState();
    render();

    // Toolbar wiring
    document.getElementById("btn-export").addEventListener("click", exportProgress);
    document.getElementById("btn-reset").addEventListener("click", resetProgress);

    var fileInput = document.getElementById("import-file");
    document.getElementById("btn-import").addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        importProgressFromFile(fileInput.files[0]);
      }
      fileInput.value = ""; // allow re-importing the same filename later
    });

    document.getElementById("btn-expand").addEventListener("click", function () { expandAll(true); });
    document.getElementById("btn-collapse").addEventListener("click", function () { expandAll(false); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
