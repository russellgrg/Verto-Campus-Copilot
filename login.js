// Form switching functionality
document.getElementById('showRegister').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('showLogin').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Password visibility toggle
function setupPasswordToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  toggle.addEventListener('click', function () {
    if (input.type === 'password') {
      input.type = 'text';
      toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      input.type = 'password';
      toggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });
}

// Set up toggles
setupPasswordToggle('loginPasswordToggle', 'loginPassword');
setupPasswordToggle('registerPasswordToggle', 'registerPassword');
setupPasswordToggle('confirmPasswordToggle', 'confirmPassword');

// Register logic
document.getElementById('registerFormElement').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }

  // Save to localStorage
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);

  alert('Registered successfully! Now log in.');

  // Switch to login form
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

// Login logic
document.getElementById('loginFormElement').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  if (email === storedEmail && password === storedPassword) {
    alert('Login successful!');
    localStorage.setItem('loggedInUser', email); // Store who logged in
    window.location.href = 'dashboard.html';
  } else {
    alert('Incorrect email or password.');
  }
});
// In your register form submit handler
localStorage.setItem("user", JSON.stringify({
  email: registerEmail.value,
  password: registerPassword.value,
  firstName: firstName.value,
  lastName: lastName.value
}));