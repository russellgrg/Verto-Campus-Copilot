
    // ===== LOADING SPINNER =====
    window.addEventListener("load", function () {
      const spinner = document.getElementById("loadingSpinner");
      if (spinner) {
        spinner.classList.add("hide");
        setTimeout(() => spinner.remove(), 500);
      }
    });
    
    // ===== SIDEBAR TOGGLE =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('sidebar-active');
      
      // Change arrow direction
      const icon = sidebarToggle.querySelector('i');
      if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-left');
        toggleBtn.style.left = '260px';
      } else {
        icon.classList.remove('fa-angle-left');
        icon.classList.add('fa-angle-right');
        toggleBtn.style.left = '0px';
      }
    });
    
    // ===== CALENDAR NAVIGATION =====
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthEl = document.getElementById('currentMonth');
    
    const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
    
    let currentMonth = 6; // July (0-indexed)
    let currentYear = 2025;
    
    function updateCalendar() {
      currentMonthEl.textContent = `${months[currentMonth]} ${currentYear}`;
      // In a real app, we would update the calendar days here
    }
    
    prevMonthBtn.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateCalendar();
    });
    
    // ===== EVENT MODAL =====
    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    
    // Add event to calendar when clicked
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', function() {
        const date = this.getAttribute('data-date');
        document.getElementById('eventDate').value = date;
        document.getElementById('modalDate').textContent = `Add Event for ${date}`;
        eventModal.show();
      });
    });
    
    // Save event form
    document.getElementById('eventForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('eventTitle').value;
      const type = document.getElementById('eventType').value;
      const date = document.getElementById('eventDate').value;
      const time = document.getElementById('eventTime').value;
      const location = document.getElementById('eventLocation').value;
      const description = document.getElementById('eventDescription').value;
      
      if (title) {
        // Find the calendar day element for the selected date
        const dayElement = document.querySelector(`.calendar-day[data-date="${date}"]`);
        
        if (dayElement) {
          // Create event element
          const eventElement = document.createElement('div');
          eventElement.className = 'calendar-event';
          eventElement.innerHTML = `
            <div class="event-title">${title}</div>
            <span class="event-type event-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
          `;
          
          // Add the event to the calendar day
          dayElement.appendChild(eventElement);
          
          // Show success message
          alert(`Event "${title}" added successfully!`);
        } else {
          alert(`Couldn't find calendar day for ${date}`);
        }
        
        // Close modal and reset form
        eventModal.hide();
        document.getElementById('eventForm').reset();
      }
    });
    
    // ===== SYNC BUTTONS =====
    document.querySelectorAll('.sync-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.textContent;
        alert(`Syncing ${action}... In a real app, this would connect to your accounts.`);
      });
    });
    
    // Calendar sync button
    document.getElementById('syncCalendar').addEventListener('click', function() {
      alert('Syncing calendar with LPU portal...');
    });
    
    // ===== NOTIFICATIONS =====
    setTimeout(() => {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div class="notification-toast" style="position: fixed; bottom: 20px; right: 20px; background: white; padding: 15px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); z-index: 10000; width: 300px; border-left: 4px solid var(--primary);">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="fas fa-bell text-primary"></i>
            <strong>Class Reminder</strong>
          </div>
          <p>Database Management Systems starts in 15 minutes at Block 38, Room 405</p>
          <div class="d-flex justify-content-end gap-2 mt-2">
            <button class="btn btn-sm btn-outline-secondary" onclick="this.parentElement.parentElement.remove()">Dismiss</button>
            <button class="btn btn-sm btn-primary">View Details</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Auto remove after 10 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 10000);
    }, 3000);

    // ===== ACADEMIC PERFORMANCE CHARTS =====
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [85, 15],
          backgroundColor: ['#4CAF50', '#e0e0e0'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

    // CGPA Chart
    const cgpaCtx = document.getElementById('cgpaChart').getContext('2d');
    new Chart(cgpaCtx, {
      type: 'doughnut',
      data: {
        labels: ['CGPA', 'Remaining'],
        datasets: [{
          data: [8.2, 1.8],
          backgroundColor: ['#6a11cb', '#e0e0e0'],
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.raw.toFixed(1);
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
    
    // ===== CHATBOT FUNCTIONALITY =====
    // Elements
const toggle = document.getElementById('chatbotToggle');
const popup = document.getElementById('chatbotPopup');
const close = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatbotBody = document.getElementById('chatbotBody');

// Show chatbot popup
toggle.addEventListener('click', () => {
  popup.style.display = 'flex';
});

// Hide chatbot popup
close.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Send message on click
sendBtn.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg === '') return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.innerText = msg;
  chatbotBody.appendChild(userMsg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  chatInput.value = '';

  // Show loading message
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'bot-message loading';
  loadingMsg.innerText = 'Typing...';
  chatbotBody.appendChild(loadingMsg);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;

  // Simulated bot response after delay
  setTimeout(() => {
    loadingMsg.remove();

    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message';
    botMsg.innerText = generateResponse(msg);
    chatbotBody.appendChild(botMsg);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }, 800);
}

// Simple keyword-based responses
function generateResponse(message) {
  const text = message.toLowerCase();

  if (text.includes("where is my class")) {
    return "📍 Your class is in Room B203.";
  } else if (text.includes("what time is my class") || text.includes("class time")) {
    return "🕒 Your class starts at 10:00 AM.";
  } else if (text.includes("thanks") || text.includes("thank you")) {
    return "You're welcome! 😊 I'm here for you.";
  } else {
    return "I'm just a simple chatbot 😄. Try asking: 'Where is my class?' or 'What time is my class?'";
  }
}
    
    // ===== DARK MODE TOGGLE =====
    document.addEventListener('DOMContentLoaded', function() {
      const toggleBtn = document.querySelector('.toggle-btn');
      const toggleIcon = toggleBtn.querySelector('i');
      const toggleText = toggleBtn.querySelector('.toggle-text');
      
      // Check for saved theme preference or default to light mode
      const currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      // Update button appearance based on current theme
      updateToggleButton(currentTheme);
      
      // Toggle theme on button click
      toggleBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button appearance
        updateToggleButton(newTheme);
        
        // Add click animation
        toggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          toggleBtn.style.transform = '';
        }, 150);
      });
      
      function updateToggleButton(theme) {
        if (theme === 'dark') {
          toggleIcon.className = 'fas fa-sun';
          if (toggleText) toggleText.textContent = 'Light Mode';
        } else {
          toggleIcon.className = 'fas fa-moon';
          if (toggleText) toggleText.textContent = 'Dark Mode';
        }
      }
    });

    // Optional: Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          updateToggleButton(newTheme);
        }
      });
    }

    
