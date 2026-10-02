# JMGRIT Website v0.4

Static source for **jmgrit.com** — practical IT projects and living documentation.

## Current guide

- Windows 11 → Proxmox: **v1.2.22**
- Source: `P2VWindows11-v1.2.22-Docs.zip`
- 36 steps / 8 phases
- Website guide is generated directly from the supplied documentation export.
- Saved values, pasted command output, checklist progress, and imported state remain **browser-local only**. No custom guide configuration is stored by JMGRIT servers.
- The generated guide includes local Import saved state / Export saved state controls.

## Deployment

Cloudflare Workers Static Assets:

- Production branch: `main`
- Static asset directory: `./public` (configured by `wrangler.jsonc`)
- Custom domain: `jmgrit.com`

## Version manifests

- `/site-version.json` — website package/current guide versions
- `/guides/windows-11-to-proxmox/version.json` — guide-specific metadata

## Structure

- `/` — homepage
- `/guides/` — living guides
- `/guides/windows-11-to-proxmox/` — current P2V documentation
- `/downloads/` — current and archived offline guide packages
- `/projects/` — project index
