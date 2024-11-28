function filterConsultations(filter) {
    // Mettre à jour les boutons actifs
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Filtrer les consultations
    const cards = document.querySelectorAll('.consultation-card');
    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'grid';
        } else {
            card.style.display = card.classList.contains(filter) ? 'grid' : 'none';
        }
    });
}

// Activer le bouton "Rejoindre" 15 minutes avant la consultation
function updateJoinButtons() {
    const upcomingConsultations = document.querySelectorAll('.consultation-card.upcoming');
    upcomingConsultations.forEach(card => {
        const dateText = card.querySelector('.consultation-details p:nth-child(3)').textContent;
        const timeText = card.querySelector('.consultation-details p:nth-child(4)').textContent;
        
        // Extraire la date et l'heure
        const consultationDate = new Date(dateText.split(': ')[1] + ' ' + timeText.split(': ')[1]);
        const now = new Date();
        
        // Activer le bouton si on est dans les 15 minutes avant la consultation
        const joinButton = card.querySelector('.btn-join');
        if (consultationDate - now <= 15 * 60 * 1000 && consultationDate > now) {
            joinButton.disabled = false;
        }
    });
}

// Mettre à jour les boutons toutes les minutes
setInterval(updateJoinButtons, 60000);
updateJoinButtons(); 