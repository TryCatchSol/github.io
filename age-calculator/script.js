function calculateAge() {
  const dob = document.getElementById("dob").value;
  if (!dob) {
    alert("Please select your date of birth.");
    return;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const result = `🎂 You are ${years} years, ${months} months, and ${days} days old.`;
  document.getElementById("result").innerText = result;
}
document.addEventListener("DOMContentLoaded", function () {
  // 1. Set today's date as max for DOB input
  const dobInput = document.getElementById("dob");
  const today = new Date().toISOString().split("T")[0];
  dobInput.setAttribute("max", today);

  // 2. Panchang Link update based on selected date
  dobInput.addEventListener("change", function () {
    const dob = this.value;
    const parts = dob.split("-");
    if (parts.length === 3) {
      const y = parts[0];
      const m = parts[1];
      const d = parts[2];
      const panchangURL = `https://www.drikpanchang.com/?date=${d}-${m}-${y}`;

      const panchangLink = document.getElementById("panchang-link");
      if (panchangLink) {
        panchangLink.href = panchangURL;
      }
    }
  });
});


