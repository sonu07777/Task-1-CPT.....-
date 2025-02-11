document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input[required]");
  const termsCheckbox = document.getElementById("check");
  const termsError = document.getElementById("Terms-condition");
  console.log(inputs);
  
  const alertBox = document.createElement("div");
  alertBox.id = "custom-alert";
  alertBox.style.display = "none";
  alertBox.style.position = "fixed";
  alertBox.style.bottom = "20px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.padding = "15px";
  alertBox.style.backgroundColor = "#DB4A87";
  alertBox.style.color = "white";
  alertBox.style.fontSize = "16px";
  alertBox.style.borderRadius = "5px";
  document.body.appendChild(alertBox);
  
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateField(input);
    });
  });

  termsCheckbox.addEventListener("change", function () {
    if (termsCheckbox.checked) {
      termsError.textContent = "";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false; 
      }
    });
    
    if (!termsCheckbox.checked) {
      termsError.textContent = "You must agree to the terms and conditions.";
      isValid = false;
    }
    
    if (isValid) {
      alertBox.textContent = "Form submitted successfully!";
      alertBox.style.display = "block";
      
      setTimeout(() => {
        alertBox.style.display = "none";
        form.reset();
        clearErrors();
      }, 3000);
    }
  });

  function validateField(input) {
    let errorDiv = document.getElementById(`${input.id}-error`);
    if (!errorDiv) return true;

    if (!input.validity.valid) {
      errorDiv.textContent = getErrorMessage(input);
      return false;
    } 
    
    if (isStringOnlyField(input.id) && !/^[A-Za-z\s]+$/.test(input.value)) {
      errorDiv.textContent = "Please enter only letters.";
      return false;
    }
    
    if (input.id === "date" && !isValidDateOfBirth(input.value)) {
      errorDiv.textContent = "Date of birth must be after January 1, 1970.";
      return false;
    }
    
    if (input.id === "tel" && !/^\d{10}$/.test(input.value)) {
      errorDiv.textContent = "Phone number must be exactly 10 digits.";
      return false;
    }
    
    errorDiv.textContent = "";
    return true;
  }

  function getErrorMessage(input) {
    if (input.validity.valueMissing) {
      return "This field is required.";
    }
    if (input.type === "email" && input.validity.typeMismatch) {
      return "Please enter a valid email address.";
    }
    return "Invalid input.";
  }

  function isStringOnlyField(id) {
    const stringOnlyFields = ["name", "city", "gender", "state", "country", "message"];
    return stringOnlyFields.includes(id);
  }

  function isValidDateOfBirth(date) {
    const selectedDate = new Date(date);
    const minDate = new Date("1970-01-01");
    return selectedDate >= minDate;
  }

  function clearErrors() {
    document.querySelectorAll(".text-[#FF0000]").forEach((errorDiv) => {
      errorDiv.textContent = "";
    });
  }
});

