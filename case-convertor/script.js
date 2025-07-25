function translateTo(lang) {
  const text = `
    This utility offers two powerful features in one simple interface:
    1. Text Case Conversion: Convert any block of text into UPPERCASE, lowercase, Title Case, Sentence case, or Toggle Case.
    2. Smart Find & Replace: Replace a specific word like "Hello" with "Hi", or remove multiple unwanted characters like "*" and "_" — all in one step!
    This tool is designed to clean and format long texts (e.g., WhatsApp forwards, articles, etc.) with minimal effort.
  `;

  const encodedText = encodeURIComponent(text.trim());
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodedText}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const translated = data[0].map(item => item[0]).join(" ");
      document.getElementById("translatedText").innerText = translated;
    })
    .catch(() => {
      document.getElementById("translatedText").innerText = "Translation failed. Please try again.";
    });
}

function convertCase(type) {
  const input = document.getElementById("inputText").value;
  let result = "";

  switch (type) {
    case "upper":
      result = input.toUpperCase();
      break;
    case "lower":
      result = input.toLowerCase();
      break;
    case "title":
      result = input.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      break;
    case "sentence":
      result = input.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
      break;
    case "toggle":
      result = Array.from(input).map(c =>
        c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
      ).join('');
      break;
            }

  document.getElementById("outputText").value = result;
}

function copyToClipboard() {
  const output = document.getElementById("outputText");
  output.select();
  output.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");
  alert("Converted text copied to clipboard!");
                          }
function replaceAll() {
  const input = document.getElementById("inputText").value;
  const find = document.getElementById("findText").value;
  const replace = document.getElementById("replaceText").value;

  if (!find) {
    alert("Please enter text to find.");
    return;
  }

  let result = input;

  // If user enters more than 1 character and it's a full word (like 'Hello'), replace whole word
  if (find.length > 1 && !find.includes(' ')) {
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, replace);
  } else {
    // Replace each character individually (like *, _ etc.)
    for (const char of find) {
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(regex, replace);
    }
  }

  document.getElementById("outputText").value = result;
}



