const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Store the deferred prompt for later use

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();

  // Store the event to use it later when the user clicks the install button
  deferredPrompt = event;

  // Show the install button to the user (assuming you have a button with the ID 'buttonInstall')
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Check if there's a deferred prompt available
  if (deferredPrompt) {
    // Show the install prompt to the user
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Check if the user accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }

    // Reset the deferredPrompt
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The PWA has been successfully installed
  console.log('PWA has been installed.', event);
});

