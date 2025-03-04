
    
    // מתחיל ברגע שה-DOM נטען במלואו
    document.addEventListener('DOMContentLoaded', function() {
        // מייצר אובייקט המכיל את כל שדות הטופס, אלמנטי השגיאה שלהם, ופונקציות ולידציה מותאמות
        const form = document.getElementById('carOrderForm');
        const fields = {
            carModel: {
                element: document.getElementById('carModel'),         // אלמנט השדה
                error: document.getElementById('carModelError'),      // אלמנט הודעת השגיאה
                validate: value => value !== ''                       // פונקצית ולידציה: בודקת שהשדה אינו ריק
            },
            carYear: {
                element: document.getElementById('carYear'),
                error: document.getElementById('carYearError'),
                validate: value => value !== ''                       // בודקת שהשדה אינו ריק
            },
            carColor: {
                element: document.getElementById('carColor'),
                error: document.getElementById('carColorError'),
                validate: value => value !== ''                       // בודקת שהשדה אינו ריק
            },
            firstName: {
                element: document.getElementById('firstName'),
                error: document.getElementById('firstNameError'),
                validate: value => /^[\u0590-\u05FF\s]{2,}$/.test(value)  // בודקת שהשם בעברית ומכיל לפחות 2 תווים
            },
            lastName: {
                element: document.getElementById('lastName'),
                error: document.getElementById('lastNameError'),
                validate: value => /^[\u0590-\u05FF\s]{2,}$/.test(value)  // בודקת שהשם משפחה בעברית ומכיל לפחות 2 תווים
            },
            idNumber: {
                element: document.getElementById('idNumber'),
                error: document.getElementById('idNumberError'),
                validate: validateIsraeliID                          // משתמש בפונקציה חיצונית לולידציה של ת.ז. ישראלית
            },
            phone: {
                element: document.getElementById('phone'),
                error: document.getElementById('phoneError'),
                validate: value => /^05\d-?\d{7}$/.test(value.replace(/\D/g, ''))  // בודקת תבנית מספר טלפון ישראלי
            },
            email: {
                element: document.getElementById('email'),
                error: document.getElementById('emailError'),
                validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)  // בודקת תבנית כתובת דוא"ל תקינה
            },
            termsAgree: {
                element: document.getElementById('termsAgree'),
                error: document.getElementById('termsAgreeError'),
                validate: value => value                              // בודקת שתיבת הסימון מסומנת
            }
        };
    
            // מוסיף מאזינים לכל השדות בטופס
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                
            // מאזין לאירוע 'blur' (עזיבת השדה) כדי לבצע ולידציה
            field.element.addEventListener('blur', () => {
                validateField(fieldName);
            });
            
            // מאזין לאירוע 'input' (הקלדה) כדי לנקות הודעות שגיאה בזמן הקלדה
            field.element.addEventListener('input', () => {
                field.element.classList.remove('invalid');  // מסיר סימון שגיאה ויזואלי
                field.error.style.display = 'none';         // מסתיר הודעת שגיאה
            });
        });
        
            // מאזין לאירוע שליחת הטופס
             form.addEventListener('submit', function(e) {
            e.preventDefault();  // מונע את שליחת הטופס לשרת בצורה רגילה
         
            // בודק את כל השדות בטופס לפני שליחה
            let isValid = true;
            Object.keys(fields).forEach(fieldName => {
                if (!validateField(fieldName)) {
                    isValid = false;  // אם אחד השדות לא תקין, הטופס לא תקין
                }
            });
            
            if (isValid) {
                // אם הטופס תקין, מציג הודעת הצלחה
                alert('הטופס נשלח בהצלחה');
            } else {
                // אם הטופס לא תקין, מתמקד בשדה הראשון שאינו תקין
                const firstInvalid = document.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
        
            // מאזין לאירוע איפוס הטופס
             form.addEventListener('reset', function() {
            // מנקה את סימוני השגיאה מכל השדות
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                field.element.classList.remove('invalid');  // מסיר סימון שגיאה ויזואלי
                field.error.style.display = 'none';         // מסתיר הודעת שגיאה
            });
        });
       
        // פונקציה לולידציה של שדה בודד
        function validateField(fieldName) {
            const field = fields[fieldName];
            // מפעיל את פונקצית הולידציה המותאמת לשדה
            let isValid = field.validate(field.element.value);
            
            // מציג או מסתיר שגיאה בהתאם לתוצאת הולידציה
            if (!isValid && field.element.required) {
                field.element.classList.add('invalid');     // מוסיף סימון שגיאה ויזואלי
                field.error.style.display = 'block';        // מציג הודעת שגיאה
            } else {
                field.element.classList.remove('invalid');  // מסיר סימון שגיאה ויזואלי
                field.error.style.display = 'none';         // מסתיר הודעת שגיאה
            }
            
            return isValid;  // מחזיר את תוצאת הולידציה
        }
        
        // פונקציה לולידציה של תעודת זהות ישראלית
        function validateIsraeliID(id) {
            id = id.replace(/\D/g, '');                  // מסיר תווים שאינם ספרות
            if (id.length !== 9) return false;           // ת.ז. ישראלית חייבת להיות 9 ספרות
            
            // אלגוריתם לבדיקת ספרת ביקורת של ת.ז. ישראלית
            let sum = 0;
            for (let i = 0; i < 8; i++) {
                let digit = parseInt(id.charAt(i), 10);  // מקבל את הספרה הנוכחית
                if (i % 2 === 0) digit *= 1;             // ספרות במיקום זוגי (0,2,4,6) מוכפלות ב-1
                else digit *= 2;                         // ספרות במיקום אי-זוגי (1,3,5,7) מוכפלות ב-2
                
                // אם התוצאה דו-ספרתית, מחשב את סכום הספרות שלה
               if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10);
                sum += digit;                           // מוסיף לסכום הכולל
            }
            
            // ספרת הביקורת צריכה להשלים את הסכום ל-10 (מודולו 10)
            const checkDigit = (10 - (sum % 10)) % 10;
            // בודק אם ספרת הביקורת שחושבה תואמת לספרה התשיעית בת.ז.
            return parseInt(id.charAt(8), 10) === checkDigit; 
        }
    });
