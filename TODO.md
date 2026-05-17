# TODO

Items logged from Phase 2 reviewer findings. Address before Phase 5 ships.

## Security
- [ ] **Supabase dashboard**: Go to Authentication → Settings → disable "Enable email signups" for the remote project (https://supabase.com/dashboard/project/eysgcnewnmlzpcdtsdsa/auth/configuration). The local config.toml has been updated but the remote setting must be toggled manually.
- [ ] **Supabase dashboard**: Consider enabling `secure_password_change` (Authentication → Settings) — requires re-auth before password changes.
- [ ] **Security headers**: Add Content-Security-Policy header once admin page domains and external scripts are finalized.

## Phase 4 prep
- [ ] Admin invite flow (`/admin/users`) must NOT pass `role` in the metadata payload to `inviteUserByEmail()`. Role is always set to 'lp' by the trigger; admin elevation is a separate explicit action.
