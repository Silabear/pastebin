const THISURL = "https://paste.silabear.xyz/";

async function processPaste() {
  document.getElementById("press").innerHTML =
    '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
  let name = document.getElementById("nameinput").value;
  if (name === undefined) {
    name = "Untitled Paste";
  }
  let value = document.getElementById("valueinput").value;
  let data = {
    name: name,
    value: value,
  };
  let res;
  res = await fetch("https://paste.silabear.workers.dev/", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((resp) => {
    let text;
    resp.text().then((t) => {
      navigator.clipboard.writeText(THISURL + "?p=" + t);
      document.getElementById("press").innerHTML = "redirecting..";
      document.location.href = THISURL + "?p=" + t;
    });
  });
}

async function pageLoad() {
  const myUrl = new URL(window.location.toLocaleString()).searchParams;
  let id = myUrl.get("p");
  if (id != undefined) {
    let divbox = document.getElementById("content");
    divbox.innerHTML = "";
    var res = await fetch("https://paste.silabear.workers.dev/" + id, {
      method: "GET",
    }).catch((err) => alert(err));
    let t = await res.text();
    let o = JSON.parse(t);
    // alert(`<div class="title">${o.name}</div><div class="text">${o.value}</div>`)
    divbox.innerHTML = `<div class="title">${o.name}</div><div class="text">${o.value}</div>`;
    // alert("should be didded!")
  }
}

pageLoad();
// plz deploy my code
