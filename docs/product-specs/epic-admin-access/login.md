# Epic: Admin Access & User Management  
## Title: User Login

---

**User Story**  
As an Admin, I want to securely log into the system so I can manage users and workflows.

---

**Roles Involved**  
- Admin: logs in to access the dashboard and system features  
- System: authenticates user and generates session/token

---

**Acceptance Criteria**  
- User can log in using email and password  
- System validates credentials via authentication provider (e.g., Cognito)  
- On successful login, user is redirected to the admin dashboard  
- Invalid credentials return clear error messaging  
- Auth token is stored securely (not in localStorage)  
- Auth is persisted across refresh and logout works

---

**Primary Flow (Happy Path)**  
1. Admin navigates to login screen  
2. Enters valid credentials  
3. Clicks “Log In”  
4. System authenticates and returns token  
5. Admin is redirected to dashboard  
6. Auth state is stored in frontend

---

**Alternate Flows / Exceptions**  
- Invalid credentials → show error message  
- Account disabled → show “Contact your admin” message  
- Network issue → show “Could not reach server” message  
- Already logged in → redirect to dashboard on load

---

**UX/UI Considerations**  
- Password input should have visibility toggle  
- “Forgot password?” link (optional early on)  
- Loading spinner on submit  
- Disable login button until form is valid

---
    
**Tracking & Analytics**  
- Log successful and failed login attempts  
- Track time of login and session duration (if needed)

---

**Dependencies / Notes**  
- Uses Cognito user pool (initially only admin user seeded)  
- JWT token should include role claim for role-based access later  
