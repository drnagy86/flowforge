# Epic: Admin Access & User Management  
## Title: Create New Users

---

**User Story**  
As an Admin, I want to create new users in the system so that they can access the app with specific roles.

---

**Roles Involved**  
- Admin: creates users and assigns roles  
- New User: receives credentials or invite link  
- System: stores user info and roles in database or auth provider

---

**Acceptance Criteria**  
- Admin can access a “Users” section in the dashboard  
- Admin can create a new user with:
  - Name
  - Email
  - Role (Sales, Approver, Partner)  
- System creates the user in the auth provider (e.g., Cognito)  
- System stores metadata (e.g., role) in a user table (e.g., DynamoDB)  
- User receives email invitation (optional, based on future email setup)

---

**Primary Flow (Happy Path)**  
1. Admin navigates to “Users” section  
2. Clicks “Create New User”  
3. Fills in name, email, selects role  
4. Clicks “Create”  
5. System calls backend to create user and persist role  
6. New user appears in user list

---

**Alternate Flows / Exceptions**  
- Email already in use → show validation error  
- Missing fields → prevent submission with inline validation  
- Role not selected → show error  
- Backend failure → show error message

---

**UX/UI Considerations**  
- Use modal or dedicated page for form  
- Show confirmation message/toast after creation  
- Email input should be validated  
- Include ability to filter/search user list

---

**Tracking & Analytics**  
- Track user creation events  
- Optionally log who created the user and when

---

**Dependencies / Notes**  
- Integration with Cognito for user creation  
- DynamoDB stores custom user fields (e.g., role, status)  
- May require email invite service in future  
