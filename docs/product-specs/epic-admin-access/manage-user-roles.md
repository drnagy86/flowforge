# Epic: Admin Access & User Management  
## Title: Manage User Roles

---

**User Story**  
As an Admin, I want to update user roles so that I can control what parts of the system each user can access.

---

**Roles Involved**  
- Admin: views and updates user roles  
- System: persists updated role and enforces access control  
- User: inherits new permissions after role change

---

**Acceptance Criteria**  
- Admin can view current role for each user in the user list  
- Admin can edit a user and select a new role from a predefined list  
- System updates the role in the backend (e.g., DynamoDB and/or Cognito attributes)  
- Role change takes effect on next login or token refresh  
- Changes are logged for audit purposes

---

**Primary Flow (Happy Path)**  
1. Admin navigates to “Users”  
2. Selects a user from the list  
3. Clicks “Edit” or “Change Role”  
4. Selects new role from dropdown  
5. Clicks “Save”  
6. System updates role in DB/auth provider  
7. User’s new permissions are reflected on next session

---

**Alternate Flows / Exceptions**  
- Admin attempts to assign an invalid or unsupported role → show error  
- Backend fails to update → show retry option or rollback state  
- Admin tries to change their own role → show warning or block

---

**UX/UI Considerations**  
- Use dropdown with valid role options (Sales, Approver, Admin, Partner)  
- Confirm dialog for role changes  
- Optional: Add icon or badge indicating each user's role in the table

---

**Tracking & Analytics**  
- Log role change events with timestamp and acting admin  
- Optional: track how many users are assigned to each role

---

**Dependencies / Notes**  
- Role-based access control is enforced on the backend via JWT claims or middleware  
- Role is stored in DB and/or user token; system must remain in sync  
