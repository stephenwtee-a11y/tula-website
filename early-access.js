(() => {
  "use strict";

  const EARLY_ACCESS_ENDPOINT =
    "https://ekirxibafacfedgeimmr.supabase.co/functions/v1/early-access-signup";

  const form = document.getElementById("early-access-form");
  const emailInput = document.getElementById("early-access-email");
  const honeypotInput = document.getElementById("company-website");
  const errorElement = document.getElementById("signup-error");
  const successElement = document.getElementById("signup-success");

  if (!form || !emailInput || !honeypotInput || !errorElement || !successElement) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');

  function showError(message) {
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearError() {
    errorElement.textContent = "";
    errorElement.hidden = true;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();

    if (!emailInput.checkValidity()) {
      showError("Enter a valid email address.");
      emailInput.focus();
      return;
    }

    const email = emailInput.value.trim();
    const website = honeypotInput.value;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Joining…";
    }

    try {
      const response = await fetch(EARLY_ACCESS_ENDPOINT, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, website })
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        showError(
          payload?.message ||
          "We couldn't add you just now. Please try again."
        );
        return;
      }

      form.hidden = true;
      successElement.hidden = false;
      successElement.focus();
    } catch {
      showError("We couldn't add you just now. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Join early access";
      }
    }
  });
})();
