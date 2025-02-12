document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input[required], select[required]");
  const termsCheckbox = document.getElementById("check");
  const termsError = document.getElementById("Terms-condition");
 

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const indianStatesLower = indianStates.map((state) => state.toLowerCase());

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


  const addressInput = document.getElementById("address");
  const messageInput = document.getElementById("message");
  const addressCharCount = document.getElementById("address-charCount");
  const messageCharCount = document.getElementById("message-charCount");

  const maxAddressLength = 50;
  const maxMessageLength = 200;

  function updateCharCount(input, counterElement, maxLength) {
    const currentLength = input.value.length;
    counterElement.textContent = `${currentLength}/${maxLength}`;
    counterElement.style.color = currentLength > maxLength ? "red" : "gray";
  }

  function validateLength(input, maxLength, errorDiv) {
    if (input.value.length > maxLength) {
      errorDiv.textContent = `Maximum ${maxLength} characters allowed.`;
      return false;
    }
    errorDiv.textContent = "";
    return true;
  }

  addressInput.addEventListener("input", function () {
    updateCharCount(addressInput, addressCharCount, maxAddressLength);
    validateLength(addressInput, maxAddressLength, document.getElementById("address-error"));
  });

  messageInput.addEventListener("input", function () {
    updateCharCount(messageInput, messageCharCount, maxMessageLength);
    validateLength(messageInput, maxMessageLength, document.getElementById("message-error"));
  });

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
      inputs.forEach((checksIcons)=>{
        const check = document.getElementById(`${checksIcons.id}-icon-check`);
        check.classList.add("!hidden");
      })
    }
  });

  function validateField(input) {
    let errorDiv = document.getElementById(`${input.id}-error`);
    let errorIcon = document.getElementById(`${input.id}-icon`);
    let checkIcon = document.getElementById(`${input.id}-icon-check`);

    if (!errorDiv || !errorIcon || !checkIcon) return true;

    if (!input.validity.valid) {
      errorDiv.textContent = getErrorMessage(input);
      errorIcon.classList.remove("!hidden");
      errorIcon.classList.add("block");
      checkIcon.classList.add("!hidden");
      return false;
    }

    if (isStringOnlyField(input.id) && !/^[A-Za-z\s]+$/.test(input.value)) {
      errorDiv.textContent = "Please enter only letters.";
      errorIcon.classList.remove("!hidden");
      errorIcon.classList.add("block");
      checkIcon.classList.add("!hidden");
      return false;
    }

    if (input.id === "state") {
      const stateValue = input.value.trim();
      if (
        !indianStates.includes(stateValue) &&
        !indianStatesLower.includes(stateValue.toLowerCase())
      ) {
        errorDiv.textContent = "Please enter a valid Indian state name.";
        errorIcon.classList.remove("!hidden");
        errorIcon.classList.add("block");
        checkIcon.classList.add("!hidden");
        return false;
      }
    }

    if (input.id === "date" && !isValidDateOfBirth(input.value)) {
      errorDiv.textContent = "Date of birth must be after January 1, 1970.";
      errorIcon.classList.remove("!hidden");
      errorIcon.classList.add("block");
      checkIcon.classList.add("!hidden");
      return false;
    }

    if (input.id === "tel" && !/^\d{10}$/.test(input.value)) {
      errorDiv.textContent = "Phone number must be exactly 10 digits.";
      errorIcon.classList.remove("!hidden");
      errorIcon.classList.add("block");
      checkIcon.classList.add("!hidden");
      return false;
    }

    errorDiv.textContent = "";
    errorIcon.classList.add("!hidden");
    errorIcon.classList.remove("block");
    checkIcon.classList.remove("!hidden");
    checkIcon.classList.add("block");
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
    const stringOnlyFields = ["name", "city", "state", "country", "message"];
    return stringOnlyFields.includes(id);
  }

  function isValidDateOfBirth(date) {
    const selectedDate = new Date(date);
    const minDate = new Date("2000-01-01");
    return selectedDate >= minDate;
  }

  function clearErrors() {
    document.querySelectorAll(".text-[#FF0000]").forEach((errorDiv) => {
      errorDiv.textContent = "";
    });
    document.querySelectorAll("i.fa-circle-exclamation").forEach((icon) => {
      icon.classList.add("!hidden");
      icon.classList.remove("block");
    });
    document.querySelectorAll("i.fa-check").forEach((icon) => {
      icon.classList.add("!hidden");
      icon.classList.remove("block");
    });
  }
});

