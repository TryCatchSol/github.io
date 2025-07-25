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
