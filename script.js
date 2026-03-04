// ==========================================
// CLIENT-SIDE VALIDATION SCRIPT FOR NEXUS
// ==========================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_PASSWORD_LENGTH = 6;

// ==========================================
// LOGIN FORM VALIDATION
// ==========================================

function validateLoginForm(event) {
  const loginForm = document.querySelector(".login-form");
  if (!loginForm) return;

  event.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  let isValid = true;
  let errorMessage = "";

  clearErrorMessages();

  if (!email.value.trim()) {
    isValid = false;
    errorMessage += "• Email address is required\n";
    highlightError(email);
  } else if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    errorMessage += "• Please enter a valid email address\n";
    highlightError(email);
  }

  if (!password.value) {
    isValid = false;
    errorMessage += "• Password is required\n";
    highlightError(password);
  } else if (password.value.length < MIN_PASSWORD_LENGTH) {
    isValid = false;
    errorMessage += `• Password must be at least ${MIN_PASSWORD_LENGTH} characters long\n`;
    highlightError(password);
  }

  if (!isValid) {
    showErrorAlert(errorMessage);
    return false;
  }

  showSuccessAlert("Login successful! Welcome back. 🚀");

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email.value.trim());

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 1500);
}

// ==========================================
// SIGNUP FORM VALIDATION
// ==========================================

function validateSignupForm(event) {
  const signupForm = document.querySelector(".login-form");
  if (!signupForm) return;

  event.preventDefault();

  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const termsCheckbox = document.querySelector('input[name="terms"]');

  let isValid = true;
  let errorMessage = "";

  clearErrorMessages();

  if (!fullname.value.trim()) {
    isValid = false;
    errorMessage += "• Full name is required\n";
    highlightError(fullname);
  } else if (fullname.value.trim().length < 3) {
    isValid = false;
    errorMessage += "• Full name must be at least 3 characters long\n";
    highlightError(fullname);
  }

  if (!email.value.trim()) {
    isValid = false;
    errorMessage += "• Email address is required\n";
    highlightError(email);
  } else if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    errorMessage += "• Please enter a valid email address\n";
    highlightError(email);
  }

  if (!password.value) {
    isValid = false;
    errorMessage += "• Password is required\n";
    highlightError(password);
  } else if (password.value.length < MIN_PASSWORD_LENGTH) {
    isValid = false;
    errorMessage += `• Password must be at least ${MIN_PASSWORD_LENGTH} characters long\n`;
    highlightError(password);
  }

  if (!confirmPassword.value) {
    isValid = false;
    errorMessage += "• Please confirm your password\n";
    highlightError(confirmPassword);
  } else if (password.value !== confirmPassword.value) {
    isValid = false;
    errorMessage += "• Passwords do not match\n";
    highlightError(password);
    highlightError(confirmPassword);
  }

  if (!termsCheckbox.checked) {
    isValid = false;
    errorMessage += "• You must agree to the Terms & Conditions\n";
  }

  if (!isValid) {
    showErrorAlert(errorMessage);
    return false;
  }

  showSuccessAlert("Account created successfully! Welcome to NEXUS. 🌟");

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email.value.trim());
  localStorage.setItem("userName", fullname.value.trim());

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 1500);
}

// ==========================================
// LOGOUT FUNCTIONALITY
// ==========================================

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");

  showSuccessAlert("You have been logged out successfully. 👋");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function highlightError(inputElement) {
  inputElement.style.borderColor = "#ff6b6b";
  inputElement.style.backgroundColor = "rgba(255, 107, 107, 0.1)";
}

function clearErrorMessages() {
  const inputs = document.querySelectorAll(
    'input[type="email"], input[type="password"], input[type="text"]',
  );
  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.backgroundColor = "";
  });
}

function showErrorAlert(message) {
  alert("❌ Validation Error:\n\n" + message);
}

function showSuccessAlert(message) {
  alert("✅ " + message);
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (
    !isLoggedIn &&
    (window.location.pathname.includes("profile.html") ||
      window.location.pathname.includes("settings.html"))
  ) {
    showErrorAlert("You must be logged in to access this page.");
    window.location.href = "login.html";
  }
}

// ==========================================
// FORM SUBMISSION EVENT LISTENERS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();

  const loginForm = document.querySelector(".login-form");
  if (loginForm && window.location.pathname.includes("login.html")) {
    loginForm.addEventListener("submit", validateLoginForm);
  }

  if (loginForm && window.location.pathname.includes("signup.html")) {
    loginForm.addEventListener("submit", validateSignupForm);
  }

  const logoutBtn = document.querySelector('button[onclick="logout()"]');
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  const logoutButtons = document.querySelectorAll("button");
  logoutButtons.forEach((btn) => {
    if (
      btn.textContent.includes("Logout") ||
      btn.textContent.includes("LOGOUT")
    ) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    }
  });
});
