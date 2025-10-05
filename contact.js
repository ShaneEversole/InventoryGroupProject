// this will be in public/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const attachments = document.getElementById("attachments");
  const attachedList = document.getElementById("attached-list");
  const clearBtn = document.getElementById("clear-btn");

  const fakeEmail = "hello@clothingsurplus.example";
  const fakePhone = "(555) 123-4567";

  function isValidPhone(value) {
    if (!value) return true; // optional
    const cleaned = value.replace(/[\s\-().+]/g, "");
    return /^\d{7,15}$/.test(cleaned);
  }

  function showFiles(files) {
    if (!files || !files.length) {
      attachedList.textContent = "";
      return;
    }
    const items = [...files].map(f => `${f.name} (${Math.round(f.size / 1024)} KB)`);
    attachedList.textContent = items.join(" • ");
  }

  attachments?.addEventListener("change", (e) => showFiles(e.target.files));

  clearBtn?.addEventListener("click", () => {
    form.reset();
    attachedList.textContent = "";
    status.textContent = "";
    status.classList.remove("text-success", "text-danger");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("text-success", "text-danger");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name) return showError("Please enter your name.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Please enter a valid email.");
    if (!message) return showError("Please enter a message.");
    if (!isValidPhone(phone)) return showError("Please enter a valid phone number (or leave it blank).");

    showSuccess(`Message sent! We'll reply from ${fakeEmail} or call ${fakePhone}.`);
    form.reset();
    attachedList.textContent = "";
  });

  function showError(msg) {
    status.textContent = msg;
    status.classList.add("text-danger");
    status.classList.remove("text-success");
  }

  function showSuccess(msg) {
    status.textContent = msg;
    status.classList.add("text-success");
    status.classList.remove("text-danger");
  }
});