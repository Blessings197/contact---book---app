/* -----------------------------
script.js - Contact Book Logic
-----------------------------*/

// Wait for the page to load fully
document.addEventListener("DOMContentLoader", () => {

    // Get the contact list container
    const contactList = document.getElementById("contact-list");

    // Create a function to load contacts
    function loadContacts() {
        // Clear previous content
        contactList.innerHTML = "<p>Loading contacts...</p>";

        // Fetch data from API
        fetch(`${rootPath}contacts`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Failed to fetch contacts.");
            }
            return response.json();
        })
        .then(data => {
            // Clear and populate contact list
            contactList.innerHTML = "";

            // Loop through contacts
            data.forEach(contact => {
                const card = document.createElement("div");
                card.className = "contact-card";

                // Fill card with contact info
                card.innerHTML = `
                <img src="${contact.avatar}" alt="${contact.name}" />
                <h3>${contact.name}</h3>
                <p>${contact.email}</p>
                `;

                // Add card to the list
                contactList.appendChild(card);
            });
        })
        .catch(error => {
            contactList.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    }

    // Call the function initially
    loadContacts();

    // Add a refresh button if needed
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", loadContacts);
    }
});