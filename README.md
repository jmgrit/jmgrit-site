# JMGRIT site v0.18

Static site for jmgrit.com.

## Recommended project order

1. Windows 11 → Proxmox (P2V), v1.2.32 — 36 steps, 7 phases.
2. OpenWrt Virtual Router, v1.2.12 — 15 steps, 3 phases.

These projects are best completed in this order. Readers with an existing Proxmox foundation may continue at project 2. Other projects remain listed separately as work in progress; no further sequence is assigned yet.

## Published guides and downloads

- /guides/windows-11-to-proxmox/
- /guides/openwrt-virtual-router/
- /downloads/files/p2v-windows-11-offline-v1.2.32.zip
- /downloads/files/openwrt-virtual-router-offline-v1.2.12.zip

Offline ZIPs preserve their source packages. The online guides add a homepage title link and series navigation; their embedded reader scripts are unchanged. OpenWrt's bundled favicon assets are included. Each guide retains its own saved-state namespace and shares the website theme preference.

## Update

Extract the release ZIP and copy the contents of jmgrit-site-v0.18 into the existing repository root. Keep .git and the existing hosting configuration. Stage README.md and public with git add -A, review the staged summary, commit, and push origin main. Only the current P2V and OpenWrt ZIPs are included in this release.

## P2V v1.2.32 replacement

Only P2V v1.2.32 is published or offered for download. Replace the whole existing P2V guide directory and remove older p2v-windows-11-offline-v*.zip files before copying the new release. The supplied reader runtime, favicon assets, and full offline ZIP are preserved. OpenWrt stays at v1.2.12 as project 2.
