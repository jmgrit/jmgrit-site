# JMGRIT site v0.14

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

## v0.10 interactive emblem

Hover for a slow rotation. Drag a petal around the center to spin in either direction; faster movement adds more momentum. Release to coast. Dragging the header emblem does not navigate; a normal click still opens home. Space spins the focused header link or homepage emblem. Reduced-motion preference disables automatic hover rotation; direct interaction remains available.

## v0.11 fidget spinner presentation

Homepage emblem moved to the top right and enlarged from 52px to 78px; JMGRIT.COM label removed from the intro. Spinning emblems smoothly cycle colours, with quicker colour changes at higher spin speeds. Original colours return when stopped.

## v0.12 spinner momentum

Homepage emblem enlarged another 40% (78px to 109.2px). Release boosts flick momentum, preserves fast rotation for 3.5 seconds, then gradually slows with lower friction. Near-stationary pointer events no longer erase the last flick.

## v0.13 replacement emblem

Use the newly supplied three-petal image for website logos and tab/touch icons. Preserve its entire transparent canvas when generating asset sizes. Icon URLs refreshed to v0.13. Spinner size and physics retained.

## v0.14 larger homepage spinner

Double the homepage spinner from 109.2px to 218.4px. On tablet and mobile widths it sits at the top right above the slogan so the copy stays readable.
