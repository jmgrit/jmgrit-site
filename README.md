# JMGRIT site v0.15

Static website for jmgrit.com.

## Current guide

- Windows 11 → Proxmox: v1.2.29 only
- 36 steps, 7 phases
- Published reader: public/guides/windows-11-to-proxmox/
- Offline ZIP: public/downloads/files/p2v-windows-11-offline-v1.2.29.zip
- Offline ZIP is the supplied Docs ZIP, byte for byte. Extract it and open P2VWindows11-v1.2.29/index.html.

## Saved state

Progress and collected values remain in the reader's browser. The existing reader namespace is retained. The first saved-state export offers password-protected or unencrypted output. Saved State → Saved State Security… changes this preference. The guide's supplied encryption/import/reset runtime is preserved without modifications. This option protects exported files; it does not imply that every browser-stored value is encrypted.

## Website features

Provider-independent troubleshooting context messaging, theme synchronisation, updated trefoil branding, and the 218.4px homepage fidget spinner remain in place. All four online guide titles return to the website homepage.

## Replace and push

Extract jmgrit-site-v0.15.zip into Downloads. In the existing repository, remove public/guides/windows-11-to-proxmox and older p2v-windows-11-offline-v*.zip downloads before copying the new public directory. Stage with git add -A -- README.md public to include deletions, then commit and push origin main. Keep the repository's .git directory and hosting configuration.
