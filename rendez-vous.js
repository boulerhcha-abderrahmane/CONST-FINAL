function proceedToPayment() {
    // Récupérer la méthode de paiement sélectionnée
    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Récupérer le prix de la consultation
    const price = document.getElementById('consultation-price').textContent;
    
    // Stocker les informations de la consultation dans localStorage
    const consultationData = {
        service: document.getElementById('service').value,
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        price: price
    };
    localStorage.setItem('consultationData', JSON.stringify(consultationData));
    
    // Rediriger vers la page de paiement appropriée
    if (selectedPaymentMethod === 'card') {
        window.location.href = 'paiement_carte.html';
    } else if (selectedPaymentMethod === 'paypal') {
        window.location.href = 'paiement_paypal.html';
    }
}

function submitAppointmentRequest(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire
    const consultationData = {
        service: document.getElementById('service').value,
        doctor: document.getElementById('doctor').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        symptoms: document.getElementById('symptoms').value
    };

    // Envoyer la demande au serveur (simulé ici)
    console.log('Demande de rendez-vous envoyée:', consultationData);

    // Simuler une réponse du serveur
    setTimeout(() => {
        alert('Votre demande de rendez-vous a été envoyée. Vous serez notifié une fois que le médecin l\'aura acceptée.');
    }, 1000);
} 