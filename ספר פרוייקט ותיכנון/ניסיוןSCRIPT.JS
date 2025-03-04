
// פונקציה לבדיקת תקינות טופס
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (name.length < 2) {
        alert('נא להזין שם מלא');
        return false;
    }

    if (!email.includes('@') || !email.includes('.com') || !email.includes('co.il')) {
        alert('נא להזין כתובת אימייל תקינה');
        return false;
    }

    if (phone.length < 9) {
        alert('נא להזין מספר טלפון תקין');
        return false;
    }

    return true;
}

// מערך דגמים לחיפוש
const models = [
    { name: 'BMW M3', price: 600000 },
    { name: 'BMW i4', price: 450000 },
    { name: 'BMW X5', price: 550000 }
];

// פונקציה לחיפוש דגם
function searchModel(query) {
    return models.filter(model => 
        model.name.toLowerCase().includes(query.toLowerCase())
    );
}

// הוספת אינטראקטיביות למעבר בין תמונות
document.querySelectorAll('.models-grid img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});