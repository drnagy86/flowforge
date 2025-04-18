# Epic: Admin Access & User Management  
## Title: Update User Status (Enable/Disable/Delete)

---

**User Story**  
As an Admin, I want to disable or delete users so that I can revoke access when users leave or no longer need access.

---

**Roles Involved**  
- Admin: manages user status  
- System: updates and enforces status during login/auth checks  
- User: access is revoked or re-enabled

---

**Acceptance Criteria**  
- Admin can disable or re-enable a user from the user list  
- Disabled users cannot log in  
- Admin can optionally delete a user (irreversible)  
- Disabled and deleted users are reflected in the UI  
- Status change is logged with metadata (who, when, why)

---

**Primary Flow (Happy Path)**  
1. Admin navigates to “Users”  
2. Locates user in table  
3. Clicks “Disable User”  
4. Confirms action in modal  
5. System updates user status in backend  
6. User is prevented from logging in

---

**Alternate Flows / Exceptions**  
- Admin tries to disable an already-disabled user → no-op  
- Admin tries to delete self → blocked with error  
- Backend update fails → retry with error message

---

**UX/UI Considerations**  
- Show user status in table (Active / Disabled)  
- Use toggle or action menu for status change  
- Use confirmation modal for disable/delete actions  
- Optionally allow undo within a short time frame for delete

---

**Tracking & Analytics**  
- Log who disabled/deleted a user and when  
- Optional reason/notes field in audit log  
- Visual indicator of status changes in user list

---

**Dependencies / Notes**  
- Status should be checked during login/auth (disabled = block login)  
- Deleted users should be purged from DB/auth system  
- Soft delete may be used initially (set `isDeleted` flag instead of full removal)  
