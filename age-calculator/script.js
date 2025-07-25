function calculateAge() {
  const dobInput = document.getElementById("dob");
  const result = document.getElementById("result");
  const dobValue = dobInput.value;

  if (!dobValue) {
    result.textContent = "Please enter your date of birth.";
    return;
  }

  const dob = new Date(dobValue);
  const today = new Date();

  // ✅ Manual range validation
  const minDate = new Date("1000-01-01");
  if (dob < minDate || dob > today) {
    result.textContent = "Please enter a date between 01-01-1000 and today.";
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
}

document.addEventListener("DOMContentLoaded", function () {
  const dobInput = document.getElementById("dob");
  const panchangLink = document.getElementById("panchang-link");

  // Set today's date as max
  const today = new Date().toISOString().split("T")[0];
  dobInput.setAttribute("max", today);

  console.log("Script loaded");

  dobInput.addEventListener("change", function () {
    console.log("DOB changed:", this.value);

    const dob = this.value;
    const parts = dob.split("-");
    if (parts.length === 3) {
      const y = parts[0];
      const m = parts[1];
      const d = parts[2];
      const panchangURL = `https://www.drikpanchang.com/?date=${d}-${m}-${y}`;

      if (panchangLink) {
        panchangLink.href = panchangURL;
        panchangLink.textContent = `🔗 View Panchang for ${d}-${m}-${y}`;
        panchangLink.style.display = "inline-block";
      }
    }
  });
});
