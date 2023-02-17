const THISURL = "https://paste.silabear.xyz/";

async function processPaste() {
  // Show loading icon
  document.getElementById("press").innerHTML =
    '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
  
  // Parse data
  let name = document.getElementById("nameinput").value;
  if (name === "") {
    name = "Untitled Paste";
  }
  let value = document.getElementById("valueinput").value;
  
  // Check if value actually exists
  if(value === "") {
    document.getElementById("press").style = "width: 350px";
    return document.getElementById("press").innerHTML = "error: paste content can't be empty!";
  }
  
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
  // Get ID from URL
  const myUrl = new URL(window.location.toLocaleString()).searchParams;
  let id = myUrl.get("p");
  
  if (id != undefined) { // Run code if there actually is an ID
    let divbox = document.getElementById("content");
    divbox.innerHTML = ""; // Clear content box
    
    var res = await fetch("https://paste.silabear.workers.dev/" + id, { // Get the paste from the server
      method: "GET",
    }).catch((err) => alert(err));
    
    let t = await res.text();
    
    // Get data and show data
    let o = JSON.parse(t);
    document.getElementById("desc").setAttribute("content", o.name);
    divbox.innerHTML = `<div class="title">${o.name}</div><div class="text">${o.value.replace(/\n/g,"<br />")}</div>`;
  }
}

pageLoad();
