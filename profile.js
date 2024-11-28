// Stockage des données
const USER_DATA_KEY = 'userData';
const USER_IMAGE_KEY = 'userProfileImage';

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadProfileImage();
});

// Fonction pour sauvegarder les données utilisateur
function saveUserData(data) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

// Fonction pour charger les données utilisateur
function loadUserData() {
    const savedData = localStorage.getItem(USER_DATA_KEY);
    if (savedData) {
        const data = JSON.parse(savedData);
        updateDisplayInfo(data);
    }
}

// Fonction pour mettre à jour l'affichage
function updateDisplayInfo(data) {
    const infoItems = document.querySelectorAll('#infoDisplay .info-item p');
    infoItems[0].textContent = data.fullName;
    infoItems[1].textContent = data.email;
    infoItems[2].textContent = data.phone;
    infoItems[3].textContent = data.birthdate;
    infoItems[4].textContent = data.address;
    infoItems[5].textContent = data.bloodGroup;

    // Mise à jour du nom dans l'en-tête
    document.querySelector('.profile-details h1').textContent = data.fullName;
}

// Fonction pour démarrer l'édition
function startEdit() {
    const infoDisplay = document.getElementById('infoDisplay');
    const editForm = document.getElementById('editForm');
    const currentInfo = infoDisplay.querySelectorAll('.info-item p');

    document.getElementById('fullName').value = currentInfo[0].textContent;
    document.getElementById('email').value = currentInfo[1].textContent;
    document.getElementById('phone').value = currentInfo[2].textContent;
    document.getElementById('birthdate').value = formatDateForInput(currentInfo[3].textContent);
    document.getElementById('address').value = currentInfo[4].textContent;
    document.getElementById('bloodGroup').value = currentInfo[5].textContent;

    infoDisplay.style.display = 'none';
    editForm.style.display = 'block';
    document.querySelector('.btn-edit').style.display = 'none';
}

// Fonction pour annuler l'édition
function cancelEdit() {
    const infoDisplay = document.getElementById('infoDisplay');
    const editForm = document.getElementById('editForm');

    infoDisplay.style.display = 'grid';
    editForm.style.display = 'none';
    document.querySelector('.btn-edit').style.display = 'block';
}

// Gestion de l'image de profil
function saveProfileImage(imageUrl) {
    localStorage.setItem(USER_IMAGE_KEY, imageUrl);
}

function loadProfileImage() {
    const savedImage = localStorage.getItem(USER_IMAGE_KEY);
    if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
    }
}

// Gestionnaire du formulaire
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newInfo = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: formatDateForDisplay(document.getElementById('birthdate').value),
        address: document.getElementById('address').value,
        bloodGroup: document.getElementById('bloodGroup').value
    };

    saveUserData(newInfo);
    updateDisplayInfo(newInfo);
    cancelEdit();
    showSuccessMessage('Informations mises à jour avec succès !');
});

// Gestionnaire d'upload d'image
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('L\'image ne doit pas dépasser 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('imagePreview').src = event.target.result;
            document.getElementById('imageModal').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Fonctions utilitaires
function formatDateForInput(dateString) {
    const parts = dateString.split('/');
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
}

function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Gestionnaires de la modal
document.querySelector('.modal .close').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
});

document.querySelector('.modal .btn-save').addEventListener('click', function() {
    const newImageUrl = document.getElementById('imagePreview').src;
    document.getElementById('profileImage').src = newImageUrl;
    saveProfileImage(newImageUrl);
    document.getElementById('imageModal').style.display = 'none';
    showSuccessMessage('Photo de profil mise à jour avec succès !');
});

document.querySelector('.modal .btn-cancel').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = 'none';
});

// Fermeture de la modal en cliquant en dehors
window.addEventListener('click', function(e) {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}); 