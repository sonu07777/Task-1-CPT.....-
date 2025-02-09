document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm()
      .then(() => {
        document.getElementById("submit-error").innerText = "Submitting...";
        setTimeout(() => {
          alert("Form submitted successfully!");
          document.getElementById("submit-error").innerText = "";
        }, 3000);
      })
      .catch((error) => {
        document.getElementById("submit-error").innerText =error;
      });
  });

function validateForm() {
  return new Promise((resolve, reject) => {
    let valid = true;
    let errorMessage = "";

    const fields = [
      "name",
      "email",
      "tel",
      "date",
      "gender",
      "city",
      "state",
      "country",
      "address",
      "message",
    ];
    fields.forEach((field) => {
      const input = document.getElementById(field);
      const errorDiv = document.getElementById(`${field}-error`);
      if (!input || !errorDiv) return; // Ensure elements exist before accessing them
      if (!input.value.trim()) {
        errorDiv.innerText = `${field.replace("-", " ")} is required.`;
        errorMessage=`${field.replace("-", " ")} is required.`
        valid = false;
      } else {
        errorDiv.innerText = "";
      }
    });

    const emailInput = document.getElementById("email");
    if (
      emailInput &&
      emailInput.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())
    ) {
      document.getElementById("email-error").innerText =
        "Invalid email format.";
      valid = false;
    }

    const phoneInput = document.getElementById("tel");
    if (
      phoneInput &&
      phoneInput.value.trim() &&
      !/^\d{10}$/.test(phoneInput.value.trim())
    ) {
      document.getElementById("tel-error").innerText =
        "Phone number must be 10 digits.";
        errorMessage="phone must be 10 digit"
      valid = false;
    }

    const termsCheckbox = document.getElementById("check");
    if (termsCheckbox && !termsCheckbox.checked) {
      errorMessage = "You must agree to terms and conditions.";
      document.getElementById("Terms-condition").innerText =
        "You must agree to terms and conditions.";
      valid = false;
    }

    if (valid) {
      resolve();
    } else {
      reject(errorMessage || "Please fill out all required fields correctly.");
    }
  });
}
