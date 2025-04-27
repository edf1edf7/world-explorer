// User data structure
const userData = {
    users: [],
    currentUser: null
};

// Avatar options
const avatarOptions = {
    bodyTypes: ['slim', 'average', 'athletic'],
    skinColors: ['light', 'medium', 'dark'],
    hairStyles: {
        male: ['short', 'medium', 'long'],
        female: ['short', 'medium', 'long']
    },
    clothingStyles: {
        male: ['casual', 'formal', 'sporty'],
        female: ['casual', 'formal', 'sporty']
    }
};

// Initialize the registration form
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const avatarSection = document.getElementById('avatarSection');
    const saveAvatarButton = document.getElementById('saveAvatar');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Only initialize registration form if it exists
    if (registrationForm) {
        // Password validation
        const passwordRequirements = {
            length: document.getElementById('length'),
            uppercase: document.getElementById('uppercase'),
            lowercase: document.getElementById('lowercase'),
            number: document.getElementById('number')
        };

        // Create admin user if it doesn't exist
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!users.some(user => user.username === 'admin')) {
            const adminUser = {
                firstName: 'Admin',
                lastName: 'User',
                grade: '8',
                username: 'admin',
                password: 'Admin123!',
                isAdmin: true,
                progress: {
                    africa: { points: 0, completed: 0 },
                    asia: { points: 0, completed: 0 },
                    europe: { points: 0, completed: 0 },
                    'north-america': { points: 0, completed: 0 },
                    'central-america': { points: 0, completed: 0 },
                    caribbean: { points: 0, completed: 0 },
                    'south-america': { points: 0, completed: 0 },
                    oceania: { points: 0, completed: 0 }
                }
            };
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Password validation function
        function validatePassword(password) {
            const hasLength = password.length >= 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);

            if (passwordRequirements.length) {
                passwordRequirements.length.classList.toggle('valid', hasLength);
                passwordRequirements.length.classList.toggle('invalid', !hasLength);
            }
            if (passwordRequirements.uppercase) {
                passwordRequirements.uppercase.classList.toggle('valid', hasUppercase);
                passwordRequirements.uppercase.classList.toggle('invalid', !hasUppercase);
            }
            if (passwordRequirements.lowercase) {
                passwordRequirements.lowercase.classList.toggle('valid', hasLowercase);
                passwordRequirements.lowercase.classList.toggle('invalid', !hasLowercase);
            }
            if (passwordRequirements.number) {
                passwordRequirements.number.classList.toggle('valid', hasNumber);
                passwordRequirements.number.classList.toggle('invalid', !hasNumber);
            }

            return hasLength && hasUppercase && hasLowercase && hasNumber;
        }

        // Real-time password validation
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                validatePassword(passwordInput.value);
            });
        }

        // Confirm password validation
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                const errorElement = document.getElementById('confirmPasswordError');
                if (errorElement) {
                    if (confirmPasswordInput.value !== passwordInput.value) {
                        errorElement.textContent = 'Passwords do not match';
                        errorElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'none';
                    }
                }
            });
        }

        // Form submission
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const grade = document.getElementById('grade').value;
            const username = document.getElementById('username').value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validate form
            let isValid = true;

            // First Name validation
            if (firstName.length < 2) {
                document.getElementById('firstNameError').textContent = 'First name must be at least 2 characters long';
                document.getElementById('firstNameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('firstNameError').style.display = 'none';
            }

            // Last Name validation
            if (lastName.length < 2) {
                document.getElementById('lastNameError').textContent = 'Last name must be at least 2 characters long';
                document.getElementById('lastNameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('lastNameError').style.display = 'none';
            }

            // Grade validation
            if (!grade) {
                document.getElementById('gradeError').textContent = 'Please select a grade';
                document.getElementById('gradeError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('gradeError').style.display = 'none';
            }

            // Username validation
            if (username.length < 4) {
                document.getElementById('usernameError').textContent = 'Username must be at least 4 characters long';
                document.getElementById('usernameError').style.display = 'block';
                isValid = false;
            } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                document.getElementById('usernameError').textContent = 'Username can only contain letters, numbers, and underscores';
                document.getElementById('usernameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('usernameError').style.display = 'none';
            }

            // Password validation
            if (!validatePassword(password)) {
                document.getElementById('passwordError').textContent = 'Password does not meet requirements';
                document.getElementById('passwordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('passwordError').style.display = 'none';
            }

            // Confirm password validation
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                document.getElementById('confirmPasswordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('confirmPasswordError').style.display = 'none';
            }

            if (!isValid) {
                return;
            }

            // Check if username already exists
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            if (existingUsers.some(user => user.username === username)) {
                document.getElementById('usernameError').textContent = 'Username already exists';
                document.getElementById('usernameError').style.display = 'block';
                return;
            }

            // Create user object
            const user = {
                firstName,
                lastName,
                grade,
                username,
                password,
                isAdmin: false,
                progress: {
                    africa: { points: 0, completed: 0 },
                    asia: { points: 0, completed: 0 },
                    europe: { points: 0, completed: 0 },
                    'north-america': { points: 0, completed: 0 },
                    'central-america': { points: 0, completed: 0 },
                    caribbean: { points: 0, completed: 0 },
                    'south-america': { points: 0, completed: 0 },
                    oceania: { points: 0, completed: 0 }
                }
            };

            // Store user data temporarily
            sessionStorage.setItem('pendingUser', JSON.stringify(user));

            // Show avatar customization
            registrationForm.style.display = 'none';
            avatarSection.style.display = 'block';
            initializeAvatarSelection();
        });

        // Initialize avatar selection
        function initializeAvatarSelection() {
            const avatarOptions = document.querySelectorAll('.avatar-option');
            
            avatarOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Remove selected class from all options
                    avatarOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected class to clicked option
                    option.classList.add('selected');
                });
            });
        }

        // Handle avatar saving
        if (saveAvatarButton) {
            saveAvatarButton.addEventListener('click', () => {
                const selectedAvatar = document.querySelector('.avatar-option.selected');
                
                if (!selectedAvatar) {
                    alert('Please select an avatar');
                    return;
                }
                
                // Get pending user data
                const pendingUser = JSON.parse(sessionStorage.getItem('pendingUser'));
                if (!pendingUser) {
                    alert('Registration data not found. Please try again.');
                    return;
                }
                
                // Add avatar data to user
                pendingUser.avatar = {
                    gender: selectedAvatar.getAttribute('data-gender'),
                    avatarId: selectedAvatar.getAttribute('data-avatar'),
                    src: selectedAvatar.querySelector('img').src
                };
                
                // Save user data
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
                existingUsers.push(pendingUser);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                localStorage.setItem('currentUser', JSON.stringify(pendingUser));
                
                // Clear session storage
                sessionStorage.removeItem('pendingUser');
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }
    }
});

// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    const nextStepButton = document.getElementById('nextStep');
    const backButton = document.getElementById('backButton');
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const sendRecoveryButton = document.getElementById('sendRecovery');
    const cancelRecoveryButton = document.getElementById('cancelRecovery');
    const passwordRecovery = document.getElementById('passwordRecovery');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // Only initialize login functionality if the elements exist
    if (nextStepButton && backButton && loginButton) {
        let currentUsername = '';

        // Handle next step (username verification)
        nextStepButton.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.some(user => user.username === username)) {
                currentUsername = username;
                step1.classList.remove('active');
                step2.classList.add('active');
            } else {
                alert('Username not found!');
            }
        });

        // Handle back button
        backButton.addEventListener('click', () => {
            step2.classList.remove('active');
            step1.classList.add('active');
        });

        // Handle login
        loginButton.addEventListener('click', () => {
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === currentUsername);

            if (user && user.password === password) {
                userData.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect based on user type
                if (user.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Invalid password!');
            }
        });

        // Handle forgot password
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                step1.style.display = 'none';
                passwordRecovery.classList.add('active');
            });
        }

        // Handle cancel recovery
        if (cancelRecoveryButton) {
            cancelRecoveryButton.addEventListener('click', () => {
                passwordRecovery.classList.remove('active');
                step1.style.display = 'block';
            });
        }

        // Handle send recovery email
        if (sendRecoveryButton) {
            sendRecoveryButton.addEventListener('click', () => {
                const email = document.getElementById('recoveryEmail').value;
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email);

                if (user) {
                    // Generate recovery code
                    const recoveryCode = Math.floor(100000 + Math.random() * 900000);
                    
                    // In a real application, you would send this code via email
                    console.log('Recovery code:', recoveryCode); // For testing purposes

                    // Store recovery data temporarily
                    sessionStorage.setItem('recoveryEmail', email);
                    sessionStorage.setItem('recoveryCode', recoveryCode);

                    // Show verification section
                    passwordRecovery.innerHTML = `
                        <h2>Verify Your Email</h2>
                        <p>We've sent a 6-digit verification code to your email. Please enter it below:</p>
                        <div class="verification-code">
                            <input type="text" maxlength="1" pattern="[0-9]">
                            <input type="text" maxlength="1" pattern="[0-9]">
                            <input type="text" maxlength="1" pattern="[0-9]">
                            <input type="text" maxlength="1" pattern="[0-9]">
                            <input type="text" maxlength="1" pattern="[0-9]">
                            <input type="text" maxlength="1" pattern="[0-9]">
                        </div>
                        <button id="verifyRecovery" class="cta-button">Verify Code</button>
                        <button id="cancelRecovery" class="cta-button secondary">Cancel</button>
                    `;

                    // Add verification handler
                    document.getElementById('verifyRecovery').addEventListener('click', () => {
                        const codeInputs = document.querySelectorAll('.verification-code input');
                        const enteredCode = Array.from(codeInputs).map(input => input.value).join('');
                        const storedCode = sessionStorage.getItem('recoveryCode');

                        if (enteredCode === storedCode) {
                            // Show new password form
                            passwordRecovery.innerHTML = `
                                <h2>Set New Password</h2>
                                <div class="form-group">
                                    <label for="newPassword">New Password</label>
                                    <input type="password" id="newPassword" required>
                                </div>
                                <div class="form-group">
                                    <label for="confirmNewPassword">Confirm New Password</label>
                                    <input type="password" id="confirmNewPassword" required>
                                </div>
                                <button id="saveNewPassword" class="cta-button">Save Password</button>
                                <button id="cancelRecovery" class="cta-button secondary">Cancel</button>
                            `;

                            // Add password save handler
                            document.getElementById('saveNewPassword').addEventListener('click', () => {
                                const newPassword = document.getElementById('newPassword').value;
                                const confirmPassword = document.getElementById('confirmNewPassword').value;

                                if (newPassword === confirmPassword) {
                                    const email = sessionStorage.getItem('recoveryEmail');
                                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                                    const userIndex = users.findIndex(u => u.email === email);

                                    if (userIndex !== -1) {
                                        users[userIndex].password = newPassword;
                                        localStorage.setItem('users', JSON.stringify(users));
                                        alert('Password updated successfully!');
                                        window.location.reload();
                                    }
                                } else {
                                    alert('Passwords do not match!');
                                }
                            });
                        } else {
                            alert('Invalid verification code!');
                        }
                    });
                } else {
                    alert('Email not found!');
                }
            });
        }
    }
});

// Helper function to get skin color hex code
function getSkinColorHex(color) {
    const colors = {
        light: '#FFE4C4',
        medium: '#DEB887',
        dark: '#8B4513'
    };
    return colors[color] || '#FFE4C4';
} 