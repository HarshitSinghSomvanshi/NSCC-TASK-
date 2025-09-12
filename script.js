document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const userTableBody = document.getElementById('userTableBody');

    // Error message elements
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- FUNCTIONS ---

    // Function to get users from localStorage
    const getUsers = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    // Function to save users to localStorage
    const saveUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Function to display users in the dashboard table
    const displayUsers = () => {
        const users = getUsers();
        userTableBody.innerHTML = ''; // Clear existing rows

        if (users.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="3" style="text-align:center;">No users found.</td>`;
            userTableBody.appendChild(row);
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><button class="delete-btn" data-username="${user.username}">Delete</button></td>
            `;
            userTableBody.appendChild(row);
        });
    };
    
    // Function to validate inputs and return a boolean
    const validateInputs = () => {
        let isValid = true;
        // Reset errors
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        
        // Validate Username
        if (usernameInput.value.trim().length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters.';
            isValid = false;
        }
        
        // Validate Email
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Password
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters.';
            isValid = false;
        }
        
        return isValid;
    };


    // --- EVENT LISTENERS ---

    // Handle form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateInputs()) {
            return; // Stop if validation fails
        }

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const users = getUsers();
        
        // Check if user already exists
        const userExists = users.some(user => user.username === username || user.email === email);
        if (userExists) {
            alert('Username or email already exists.');
            return;
        }

        // Hash the password using CryptoJS SHA256
        // NOTE: For a real-world application, hashing should ALWAYS be done on the server-side using a strong, salted algorithm like bcrypt.
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Add new user to the array
        users.push({
            username: username,
            email: email,
            password: hashedPassword // Store the hashed password
        });

        // Save updated user list to localStorage
        saveUsers(users);

        // Reset the form
        signupForm.reset();

        // Refresh the user table
        displayUsers();
        
        alert('Signup successful!');
    });
    
    // Handle delete button clicks using event delegation
    userTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const usernameToDelete = e.target.getAttribute('data-username');
            
            if (confirm(`Are you sure you want to delete the user "${usernameToDelete}"?`)) {
                let users = getUsers();
                // Filter out the user to be deleted
                users = users.filter(user => user.username !== usernameToDelete);
                // Save the updated list
                saveUsers(users);
                // Refresh the table
                displayUsers();
            }
        }
    });

    // --- INITIAL LOAD ---
    // Display users when the page first loads
    displayUsers();
});
