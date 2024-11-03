const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const extraCategoryText = document.getElementById("extra-category"); // Elemen baru untuk kategori tambahan
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
  extraCategoryText.textContent = ""; // Reset kategori tambahan
}

function handleSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Masukkan berat dan tinggi badan yang valid");
    return;
  }

  const heightInMeters = height / 100; // cm -> m
  const bmi = weight / Math.pow(heightInMeters, 2);
  const { label, cssClass, extraCategory } = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = cssClass;
  descText.innerHTML = `<strong>${label}</strong>`;
  extraCategoryText.textContent = extraCategory; // Tampilkan kategori tambahan
}

function interpretBMI(bmi) {
  const bmiLabels = {
    underweight: "berat badan kurang",
    healthy: "berat badan normal",
    overweight: "kelebihan berat badan",
    obese1: "Obesitas 1",
    obese2: "Obesitas 2"
  };

  const extraCategories = {
    veryUnderweight: "Kurus berat",
    underweight: "Kurus ringan",
    normal: "Normal",
    slightlyOverweight: "Gemuk ringan",
    overweight: "Gemuk berat"
  };

  let label, cssClass, extraCategory;

  if (bmi < 18.5) {
    label = bmiLabels.underweight;
    cssClass = "underweight";
    extraCategory = extraCategories.veryUnderweight;
  } else if (bmi < 22.9) {
    label = bmiLabels.healthy;
    cssClass = "healthy";
    extraCategory = extraCategories.normal;
  } else if (bmi < 24.9) {
    label = bmiLabels.overweight;
    cssClass = "overweight";
    extraCategory = extraCategories.slightlyOverweight;
  } else if (bmi < 29.9) {
    label = bmiLabels.obese1;
    cssClass = "obese1";
    extraCategory = extraCategories.overweight;
  } else {
    label = bmiLabels.obese2;
    cssClass = "obese2";
    extraCategory = extraCategories.overweight;
  }

  return { label, cssClass, extraCategory };
}
