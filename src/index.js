const synth = new Tone.Synth();
synth.oscillator.type = "sine";
synth.toMaster();

let notes = [
  { key: "z", note: "C3" },
  { key: "s", note: "C#3" },
  { key: "x", note: "D3" },
  { key: "d", note: "D#3" },
  { key: "c", note: "E3" },
  { key: "v", note: "F3" },
  { key: "g", note: "F#3" },
  { key: "b", note: "G3" },
  { key: "h", note: "G#3" },
  { key: "n", note: "A3" },
  { key: "j", note: "A#3" },
  { key: "m", note: "B3" },
  { key: "q", note: "C4" },
  { key: "2", note: "C#4" },
  { key: "w", note: "D4" },
  { key: "3", note: "D#4" },
  { key: "e", note: "E4" },
  { key: "r", note: "F4" },
  { key: "5", note: "F#4" },
  { key: "t", note: "G4" },
  { key: "6", note: "G#4" },
  { key: "y", note: "A4" },
  { key: "7", note: "A#4" },
  { key: "u", note: "B4" }
];
let html = "";
for (let i in notes) {
  let { key, note } = notes[i];
  if (note.includes("#")) {
    html += `<div data-note="${note}" class='key blackKey'>${key}</div>`;
  } else {
    html += `<div data-note="${note}" class='key'>${key}</div>`;
  }
}

document.getElementById("keyboardContainer").innerHTML = html;

const keyboard = document.getElementById("keyboardContainer");

keyboard.addEventListener("mousedown", e => {
  let className = e.target.className;
  if (className.includes("blackKey")) {
    e.target.setAttribute("style", "background-color: black;");
  } else if (className.includes("key")) {
    e.target.setAttribute("style", "background-color: #d4d7d6;");
  }
  synth.triggerAttack(e.target.dataset.note);
});

keyboard.addEventListener("mouseup", e => {
  e.target.style.removeProperty("background-color");
  synth.triggerRelease();
});

document.addEventListener("keydown", e => {
  let item = notes.find(note => note.key === `${e.key}`);
  if (item != null) {
    let el = document.querySelector(`div[data-note="${item.note}"]`);
    let className = el.className;
    if (className.includes("blackKey")) {
      el.setAttribute("style", "background-color: black;");
    } else if (className.includes("key")) {
      el.setAttribute("style", "background-color: #d4d7d6;");
    }
    return synth.triggerAttack(`${item.note}`);
  }
});

document.addEventListener("keyup", e => {
  let item = notes.find(note => note.key === `${e.key}`);
  if (item != null) {
    let el = document.querySelector(`div[data-note="${item.note}"]`);
    el.style.removeProperty("background-color");
    synth.triggerRelease();
  }
});
