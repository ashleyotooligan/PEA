# Upload PEA to GitHub

**Owner:** `ashleyotooligan`  
**Repository name:** `pea`  
**Project name:** `PEA — Pump Engineer Everything`  
**Description:** `An evidence-led Pump.fun AI agent design. Reconstruct launches, inspect wallet routes, and turn public traces into reviewable cases.`  
**First commit:** `Introduce PEA: agent identity, investigation workbench, and launch reconstruction design`

## Browser upload

1. Create an empty repository named `pea` at [github.com/new](https://github.com/new). Choose your visibility. Leave generated README, license, and gitignore options off because this package already includes them.
2. Extract `PEA-GitHub.zip` and open its **inner `pea` folder**. `README.md`, `PEA.html`, `assets`, `src`, `fixtures`, `docs`, `schemas`, `specs`, `prompts`, `examples`, and `scripts` should be together.
3. On GitHub, select **Add file → Upload files**. Drag all contents from inside that folder, including the folders themselves. Selecting only root files in a file picker can omit every nested image and source file.
4. Before committing, verify the upload list includes `assets/brand/pea-agent.png`, `assets/brand/pea-cover.png`, `assets/screenshots/01-desk.png`, and `src/render.mjs`.
5. Enter the first-commit text above and commit to `main`. If the browser omits `.github`, upload it separately or use Git below.
6. Return to the repository. Check that `assets/` is beside `README.md` and that the logo, cover, and screenshot gallery render.

Do not upload the ZIP as the repository source. Do not add an extra outer `pea` directory above the README. Preserve file paths and letter case. This release stays under the browser's 100-file budget and 25 MiB per-file limit.

## Git alternative

Create the empty remote first, then open a terminal inside the extracted inner `pea` folder:

```sh
git init
git branch -M main
git add .
git commit -m "Introduce PEA: agent identity, investigation workbench, and launch reconstruction design"
git remote add origin https://github.com/ashleyotooligan/pea.git
git push -u origin main
```

Authenticate normally. If the remote already contains commits, clone it and copy these files into the clone instead of force pushing.

## Verify the result

- The repository root contains the README, embedded preview, and all folders.
- `assets/brand/pea-agent.png` opens and the icon appears at the README top.
- `assets/screenshots/01-desk.png` and `14-portrait.png` open.
- `docs/GALLERY.md` displays all fourteen images.
- The GitHub Actions validation workflow runs on the source upload.

Suggested topics: `ai-agent`, `solana`, `pumpfun`, `reverse-engineering`, `onchain-analysis`, `pixel-art`, `design-system`.

Optional social preview: repository Settings → General → Social preview → upload the separate `PEA-Preview.png`. The transparent agent icon is supplied as `PEA-Agent.png`. A repository's social preview is distinct from the owner's avatar.

Upload publishes the repository files. The preview can be downloaded and opened locally as `PEA.html`; no website deployment is required. The release is a design workbench, with future backend interfaces clearly identified in its README.

[Official GitHub upload documentation](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
