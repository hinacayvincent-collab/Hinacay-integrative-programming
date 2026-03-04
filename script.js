// ==========================================
// CLIENT-SIDE VALIDATION SCRIPT FOR NEXUS
// ==========================================

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password minimum length requirement
const MIN_PASSWORD_LENGTH = 6;

// ==========================================
// LOGIN FORM VALIDATION
// ==========================================

function validateLoginForm(event) {
  const loginForm = document.querySelector(".login-form");
  if (!loginForm) return;

  event.preventDefault();

  // Get form inputs
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  let isValid = true;
  let errorMessage = "";

  // Clear previous error messages
  clearErrorMessages();

  // Validate email
  if (!email.value.trim()) {
    isValid = false;
    errorMessage += "• Email address is required\n";
    highlightError(email);
  } else if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    errorMessage += "• Please enter a valid email address\n";
    highlightError(email);
  }

  // Validate password
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

  // If validation passes, show success message
  showSuccessAlert("Login successful! Welcome back. 🚀");

  // Store user session (localStorage)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email.value.trim());

  // Redirect to profile after 1.5 seconds
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

  // Get form inputs
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const termsCheckbox = document.querySelector('input[name="terms"]');

  let isValid = true;
  let errorMessage = "";

  // Clear previous error messages
  clearErrorMessages();

  // Validate full name
  if (!fullname.value.trim()) {
    isValid = false;
    errorMessage += "• Full name is required\n";
    highlightError(fullname);
  } else if (fullname.value.trim().length < 3) {
    isValid = false;
    errorMessage += "• Full name must be at least 3 characters long\n";
    highlightError(fullname);
  }

  // Validate email
  if (!email.value.trim()) {
    isValid = false;
    errorMessage += "• Email address is required\n";
    highlightError(email);
  } else if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    errorMessage += "• Please enter a valid email address\n";
    highlightError(email);
  }

  // Validate password
  if (!password.value) {
    isValid = false;
    errorMessage += "• Password is required\n";
    highlightError(password);
  } else if (password.value.length < MIN_PASSWORD_LENGTH) {
    isValid = false;
    errorMessage += `• Password must be at least ${MIN_PASSWORD_LENGTH} characters long\n`;
    highlightError(password);
  }

  // Validate password confirmation
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

  // Validate terms acceptance
  if (!termsCheckbox.checked) {
    isValid = false;
    errorMessage += "• You must agree to the Terms & Conditions\n";
  }

  if (!isValid) {
    showErrorAlert(errorMessage);
    return false;
  }

  // If validation passes, show success message
  showSuccessAlert("Account created successfully! Welcome to NEXUS. 🌟");

  // Store user session
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email.value.trim());
  localStorage.setItem("userName", fullname.value.trim());

  // Redirect to profile after 1.5 seconds
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 1500);
}

// ==========================================
// LOGOUT FUNCTIONALITY
// ==========================================

function logout() {
  // Clear user session
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");

  showSuccessAlert("You have been logged out successfully. 👋");

  // Redirect to home page after 1 second
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Highlight input field with error
function highlightError(inputElement) {
  inputElement.style.borderColor = "#ff6b6b";
  inputElement.style.backgroundColor = "rgba(255, 107, 107, 0.1)";
}

// Remove error highlighting from all inputs
function clearErrorMessages() {
  const inputs = document.querySelectorAll(
    'input[type="email"], input[type="password"], input[type="text"]',
  );
  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.backgroundColor = "";
  });
}

// Show error alert
function showErrorAlert(message) {
  alert("❌ Validation Error:\n\n" + message);
}

// Show success alert
function showSuccessAlert(message) {
  alert("✅ " + message);
}

// Check if user is logged in
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
  // Check login status on protected pages
  checkLoginStatus();

  // Attach validation to login form
  const loginForm = document.querySelector(".login-form");
  if (loginForm && window.location.pathname.includes("login.html")) {
    loginForm.addEventListener("submit", validateLoginForm);
  }

  // Attach validation to signup form
  if (loginForm && window.location.pathname.includes("signup.html")) {
    loginForm.addEventListener("submit", validateSignupForm);
  }

  // Attach logout button
  const logoutBtn = document.querySelector('button[onclick="logout()"]');
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  // Alternative logout button click handler
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
