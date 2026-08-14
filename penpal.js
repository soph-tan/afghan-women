document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".penpalSubmitButton");
  const confirmationBox = document.querySelector(".penpalConfirmation");

  const contactPrefSelect = document.querySelector("#contactPref");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message"); // new message field

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form values
    const name = document.querySelector("#name").value.trim();
    const ageRange = document.querySelector("#ageRange").value;
    const languages = document.querySelector("#languages").value.trim();
    const interests = document.querySelector("#interests").value.trim();
    const contactPref = contactPrefSelect.value;
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validation
    if (!ageRange || !languages || !interests || !contactPref || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      (contactPref === "Email" ||
        contactPref === "WhatsApp" ||
        contactPref === "Other" ||
        contactPref === "Mail (letters)") &&
      !email
    ) {
      alert("Please provide your email or WhatsApp contact.");
      return;
    }

    // Google Form URL
    const googleFormURL =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc43291nDMZZ0hj_ezQ-Ccm0YNYtRHDaCdiOUVpMriGgfVZKg/formResponse";

    // Map form inputs to Google Form entry IDs
    const formData = new FormData();
    formData.append("entry.554522591", name); // Your Name or Nickname
    formData.append("entry.493307005", ageRange); // Age Range
    formData.append("entry.2131949918", languages); // Languages
    formData.append("entry.1665650395", interests); // Interests
    formData.append("entry.366440595", contactPref); // Preferred communication
    formData.append("entry.1522726101", email); // Email/WhatsApp/Other contact
    formData.append("entry.750348403", message); // Message

    // Send the POST request using fetch
    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors", // Important: no-cors mode for Google Forms
      body: formData,
    })
      .then(() => {
        confirmationBox.innerHTML = `
        <p>Thank you ${
          name ? name : "for signing up"
        }! 🎉 We will contact you soon with your pen pal match.</p>
        `;
        confirmationBox.style.display = "block";

        // Clear form fields
        document.querySelector("#name").value = "";
        document.querySelector("#ageRange").value = "";
        document.querySelector("#languages").value = "";
        document.querySelector("#interests").value = "";
        contactPrefSelect.value = "";
        emailInput.value = "";
        emailInput.disabled = true;
        messageInput.value = "";
      })
      .catch(() => {
        // Because of no-cors mode, errors are often not caught, so still show confirmation
        confirmationBox.innerHTML = `
          <p>Thank you ${
            name ? name : "for signing up"
          }! 🎉 We will contact you soon with your pen pal match.</p>
        `;

        // Clear form fields anyway
        document.querySelector("#name").value = "";
        document.querySelector("#ageRange").value = "";
        document.querySelector("#languages").value = "";
        document.querySelector("#interests").value = "";
        contactPrefSelect.value = "";
        emailInput.value = "";
        emailInput.disabled = true;
        messageInput.value = "";
      });
  });
});
