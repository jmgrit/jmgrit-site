# JMGRIT site v0.9

Static site for `jmgrit.com`.

## Current P2V guide

- Windows 11 → Proxmox: **v1.2.27 only**
- 36 steps
- 7 phases
- Offline ZIP: `public/downloads/files/p2v-windows-11-offline-v1.2.27.zip`

## Visual source of truth

The public website now follows the visual system embedded in the supplied P2V v1.2.27 documentation: navy/blue/teal palette, Inter/system typography, bordered white/dark surfaces, and matching light/dark modes.

The previous marketing homepage hero/profile artwork has been removed. The homepage is now a documentation-style landing page focused on the current guide.

## Saved state

P2V progress, variables, imported state, and other custom reader state remain local to the browser/device. The website does not store custom guide state server-side.

## v0.8 emblem update

Chrome trefoil emblem in the shared header and homepage title. Browser favicon (ICO and PNG) and Apple touch icon added across all online HTML pages. Icon and stylesheet URLs include v0.8 to refresh cached branding. P2V reader content and offline download unchanged.

## Push this update

Extract this ZIP outside your repository. Copy the contents of its jmgrit-site-v0.9 folder into the existing repository root, merging folders and replacing matching files. Do not delete the repository or its .git folder.

From the repository root:

```sh
git status
git add README.md public
git diff --cached --stat
git commit -m "Add JMGRIT trefoil branding and favicon"
git push
```

The existing hosting configuration is retained. If your hosting is connected to this branch, the push triggers its usual deployment.

## v0.9 project context messaging

Homepage explains Build → Document → Troubleshoot anywhere, with provider-independent prompts and saved-state portability. All four online P2V guide page titles link to the website homepage. The prompt generator still reads the original project title. Reader logic, storage namespace, and offline guide ZIP remain unchanged.
