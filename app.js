(function () {
  "use strict";

  var commandsById = {};
  PWSH_COMMANDS.forEach(function (cmd) {
    commandsById[cmd.id] = cmd;
  });

  var categoryLabel = {};
  PWSH_CATEGORIES.forEach(function (cat) {
    categoryLabel[cat.key] = cat.label;
  });

  var views = {
    idle: document.getElementById("view-idle"),
    results: document.getElementById("view-results"),
    list: document.getElementById("view-list"),
    detail: document.getElementById("view-detail")
  };

  function showView(name) {
    Object.keys(views).forEach(function (key) {
      views[key].hidden = key !== name;
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---- 検索ロジック ----

  function normalize(str) {
    return (str || "").trim().toLowerCase();
  }

  function findByName(query) {
    var q = normalize(query);
    if (!q) return [];

    var exact = PWSH_COMMANDS.filter(function (cmd) {
      if (cmd.name.toLowerCase() === q) return true;
      return (cmd.aliases || []).some(function (a) { return a.toLowerCase() === q; });
    });
    if (exact.length === 1) return exact;

    var partial = PWSH_COMMANDS.filter(function (cmd) {
      if (cmd.name.toLowerCase().indexOf(q) !== -1) return true;
      return (cmd.aliases || []).some(function (a) { return a.toLowerCase().indexOf(q) !== -1; });
    });
    return partial;
  }

  // 「したい」「を」など、意味の絞り込みに寄与しない助詞・語尾を取り除く
  // （あくまで“あいまい一致”の精度を上げるための簡易処理で、厳密な形態素解析ではない）
  var PARTICLE_PATTERN = /(したいこと|したい|すること|してほしい|してください|ください|します|でしたい|でした|する|した|して|たい|ます|です|の|を|が|は|に|で|と|も|へ|や|から|まで|より)/g;

  function stripParticles(str) {
    return str.replace(PARTICLE_PATTERN, "");
  }

  function bigrams(str) {
    var grams = [];
    for (var i = 0; i <= str.length - 2; i++) {
      grams.push(str.substr(i, 2));
    }
    return grams;
  }

  function scoreByIntent(cmd, qRaw, qClean) {
    var score = 0;
    var tags = cmd.tags || [];

    tags.forEach(function (tag) {
      var t = tag.toLowerCase();
      if (!t) return;

      // 完全に文字列として含まれる場合は強い一致とみなす
      if (qRaw.indexOf(t) !== -1 || t.indexOf(qRaw) !== -1) {
        score += 3;
        return;
      }

      // 助詞などを除いた上で、2文字単位の一致率が高ければゆるく一致とみなす
      var tClean = stripParticles(t);
      if (tClean.length < 2) return;
      var grams = bigrams(tClean);
      var matched = grams.filter(function (g) { return qClean.indexOf(g) !== -1; }).length;
      var ratio = matched / grams.length;
      if (ratio >= 0.5) {
        score += 2 * ratio;
      }
    });

    var summary = (cmd.summary || "").toLowerCase();
    if (summary && (qRaw.indexOf(summary) !== -1 || summary.indexOf(qRaw) !== -1)) {
      score += 1;
    }

    return score;
  }

  function findByIntent(query) {
    var qRaw = normalize(query);
    if (!qRaw) return [];
    var qClean = stripParticles(qRaw);

    var scored = PWSH_COMMANDS.map(function (cmd) {
      return { cmd: cmd, score: scoreByIntent(cmd, qRaw, qClean) };
    }).filter(function (entry) {
      return entry.score > 0;
    });

    scored.sort(function (a, b) { return b.score - a.score; });

    return scored.slice(0, 20).map(function (entry) { return entry.cmd; });
  }

  // ---- 描画 ----

  function renderResults(query, matches, searchTypeLabel) {
    document.getElementById("results-heading").textContent =
      searchTypeLabel + "「" + query + "」の検索結果";

    var listEl = document.getElementById("results-list");
    var emptyEl = document.getElementById("results-empty");
    listEl.innerHTML = "";

    if (matches.length === 0) {
      emptyEl.hidden = false;
      showView("results");
      return;
    }
    emptyEl.hidden = true;

    matches.forEach(function (cmd) {
      var li = document.createElement("li");
      li.className = "result-item";
      li.innerHTML =
        '<a href="#/detail/' + encodeURIComponent(cmd.id) + '">' +
        '<div class="cmd-name">' + escapeHtml(cmd.name) + "</div>" +
        '<div class="cmd-summary">' + escapeHtml(cmd.summary) + "</div>" +
        "</a>";
      listEl.appendChild(li);
    });

    showView("results");
  }

  function renderCategoryList() {
    var container = document.getElementById("category-list");
    container.innerHTML = "";

    PWSH_CATEGORIES.forEach(function (cat) {
      var cmdsInCat = PWSH_COMMANDS.filter(function (c) { return c.category === cat.key; });
      if (cmdsInCat.length === 0) return;

      var details = document.createElement("details");
      details.className = "category-group";

      var summary = document.createElement("summary");
      summary.textContent = cat.label + "（" + cmdsInCat.length + "）";
      details.appendChild(summary);

      var ul = document.createElement("ul");
      ul.className = "category-command-list";
      cmdsInCat
        .slice()
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (cmd) {
          var li = document.createElement("li");
          li.innerHTML = '<a href="#/detail/' + encodeURIComponent(cmd.id) + '">' + escapeHtml(cmd.name) + "</a>";
          ul.appendChild(li);
        });
      details.appendChild(ul);
      container.appendChild(details);
    });

    showView("list");
  }

  function renderDetail(id) {
    var cmd = commandsById[id];
    var container = document.getElementById("detail-content");

    if (!cmd) {
      container.innerHTML = '<p class="empty-message">指定されたコマンドが見つかりませんでした。</p>';
      showView("detail");
      return;
    }

    var html = "";

    html += '<div class="detail-header">';
    html += '<div class="detail-name">' + escapeHtml(cmd.name) + "</div>";
    html += '<div class="detail-badges">';
    html += '<span class="badge">' + escapeHtml(categoryLabel[cmd.category] || cmd.category) + "</span>";
    (cmd.aliases || []).forEach(function (alias) {
      html += '<span class="badge">別名: ' + escapeHtml(alias) + "</span>";
    });
    html += "</div>";
    if (cmd.summary) {
      html += '<p class="detail-summary">' + escapeHtml(cmd.summary) + "</p>";
    }
    html += "</div>";

    if (cmd.syntax) {
      html += '<div class="detail-section"><h3>構文</h3><div class="syntax-block">' + escapeHtml(cmd.syntax) + "</div></div>";
    }

    html += '<div class="detail-section"><h3>コマンドの引数（主なパラメーター）</h3>';
    if (cmd.parameters && cmd.parameters.length > 0) {
      html += '<dl class="param-list">';
      cmd.parameters.forEach(function (p) {
        html += "<dt>" + escapeHtml(p.name) + "</dt><dd>" + escapeHtml(p.description) + "</dd>";
      });
      html += "</dl>";
    } else {
      html += '<p class="no-data">主なパラメーターはありません。</p>';
    }
    html += "</div>";

    html += '<div class="detail-section"><h3>使用例</h3>';
    if (cmd.examples && cmd.examples.length > 0) {
      cmd.examples.forEach(function (ex) {
        html += '<div class="example-item">';
        html += '<div class="example-command">' + escapeHtml(ex.command) + "</div>";
        if (ex.description) {
          html += '<p class="example-description">' + escapeHtml(ex.description) + "</p>";
        }
        html += "</div>";
      });
    } else {
      html += '<p class="no-data">使用例は登録されていません。</p>';
    }
    html += "</div>";

    container.innerHTML = html;
    showView("detail");
  }

  // ---- ルーティング ----

  function handleRoute() {
    var hash = window.location.hash || "#/";
    var parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);

    if (parts.length === 0) {
      showView("idle");
      return;
    }

    if (parts[0] === "list") {
      renderCategoryList();
      return;
    }

    if (parts[0] === "detail" && parts[1]) {
      renderDetail(parts[1]);
      return;
    }

    if (parts[0] === "results" && parts[1] && typeof parts[2] !== "undefined") {
      var type = parts[1];
      var query = parts[2];
      var matches = type === "name" ? findByName(query) : findByIntent(query);

      if (matches.length === 1) {
        window.location.hash = "#/detail/" + encodeURIComponent(matches[0].id);
        return;
      }

      renderResults(query, matches, type === "name" ? "コマンド名" : "したいこと");
      return;
    }

    showView("idle");
  }

  function goToSearch(type, query) {
    var q = normalize(query);
    if (!q) return;
    window.location.hash = "#/results/" + type + "/" + encodeURIComponent(query.trim());
  }

  document.getElementById("form-name").addEventListener("submit", function (e) {
    e.preventDefault();
    goToSearch("name", document.getElementById("input-name").value);
  });

  document.getElementById("form-intent").addEventListener("submit", function (e) {
    e.preventDefault();
    goToSearch("intent", document.getElementById("input-intent").value);
  });

  document.getElementById("btn-reset").addEventListener("click", function () {
    document.getElementById("input-name").value = "";
    document.getElementById("input-intent").value = "";
    if (window.location.hash && window.location.hash !== "#/") {
      window.location.hash = "#/";
    } else {
      showView("idle");
    }
  });

  document.getElementById("detail-back").addEventListener("click", function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = "#/";
    }
  });

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
})();
