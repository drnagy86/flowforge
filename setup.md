## Getting Started

Use the following command to review the current directory structure (up to 4 levels deep), excluding common build and system files:

```bash
tree -L 4 -I "node_modules|dist|.git|.DS_Store|.env|cdk.out|coverage|.turbo|.next|build"
```

---

### ✅ Setup Checklist

- [ ] Run `cdk bootstrap` for your target environment
- [ ] Run `cdk deploy` to provision all infrastructure
- [ ] Confirm Cognito user pool and client are configured
- [ ] Verify frontend environment variables are set correctly
- [ ] Confirm frontend builds (`npm run dev` or `vite`) without error

---


