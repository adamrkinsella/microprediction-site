const home_url = "/";


function Round(item, round_digit) {
  return Math.round((Math.pow(10,round_digit) * item)) / Math.pow(10,round_digit);
}

function CssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

async function get(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function TextDiv(item, pos_neg_color=false, round_digit, exact_color, bold) {
  var div = document.createElement("div");
  div.id = "body-text";
  if (!round_digit) {
    div.innerHTML = item;
  } else {
    var value = parseFloat(item);
    div.innerHTML = Round(value, round_digit);
  }
  if (pos_neg_color) {
    if (parseFloat(item) < 0) {
      div.style.color = "red";
    } else {
      div.style.color = "green";
      div.innerHTML = "+" + div.innerHTML;
    }
  } else if (exact_color) {
    div.style.color = exact_color;
  }
  if (bold) {
    div.style.fontWeight = "bold";
  }
  return div;
}

function JoinDivs(divs, hover, card, display="inline") {
  var parent = document.createElement("div");
  if (hover) {
    parent.id = "div-hover";
  }
  last = divs[divs.length-1];
  for (var child of divs) {
    child.style.display = display;
    parent.appendChild(child);
    child.setAttribute("name",last.textContent);
  }
  if (!hover && !card)
    return parent;
  parent.setAttribute("name",last.textContent);
  parent.onclick = e => {
    name = e.target.getAttribute("name");
    var loc = "";
    if (card === "Active Streams" || card === "Performance" || card === "Stream Search") {
      var horizon_idx = name.indexOf("::");
      if (horizon_idx === -1) {
        loc = "stream_dashboard.html?stream="+name;
      } else {
        loc = "stream_dashboard.html?stream="+name.slice(horizon_idx+2)+"&horizon="+name.slice(0, horizon_idx);
      }
    } else if (card === "Confirmations") {
      loc = "confirmations.html";
    } else if (card === "Transactions") {
      loc = "transactions.html";
    } else if (card === "Errors") {
      ;
    } else if (card === "Warnings") {
      ;
    } else {
      throw "ERROR";
    }
    if (loc)
      window.location = loc;
  }
  return parent;
}

function GetUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function UnixToHMS(unix) {
  var date = new Date(unix * 1000);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = "0" + date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  return month+"/"+day + " " + hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

window.onclick = function(event) {
  if (!event.target.matches('#dropdown-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}