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
  const today = new Date().toISOString().split("T")[0];

  dobInput.setAttribute("max", today);

  
});
