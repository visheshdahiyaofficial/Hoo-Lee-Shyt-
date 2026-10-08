# ⚡ MIDNIGHT PANTRY // 3AM SQUAD HUB

> **The Holy Trinity of Late-Night Sustenance: Diet Coke, Monster Ultra, and Blue Lays.**  
> A high-velocity, Gen-Z neo-brutalist web dashboard built for **Shubham**, **Darshil**, and **Kush**.

---

## 🚀 Live GitHub Deployment (Zero Setup Needed)

This project is built with **100% pure static web technology** (`HTML5`, `CSS3`, `Vanilla JavaScript`, `Web Audio API`, and inline vector SVGs). There are no build steps, no Node modules, and no external audio or icon files needed.

### Steps to Deploy directly to GitHub Pages:
1. Initialize git and commit the files (or upload them directly on GitHub.com):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of midnight pantry"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, navigate to your repository's **Settings** tab.
3. Click on **Pages** in the left sidebar (under "Code and automation").
4. Under **Build and deployment** -> **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Within 1 minute, your site will be live at `https://<your-username>.github.io/<your-repo-name>/`!

---

## 🔒 Admin Controls & Hardened Security Architecture

Only authorized administrators can modify inventory stock and squad active states.

- **Master Access Key:** `M!dn1ght#99`
  - 11 characters long with a mix of uppercase letters (`M`), lowercase letters (`dn`, `ght`), numbers (`1`, `99`), and symbols (`!`, `#`).
- **Clean & Hint-Free Login Interface:**
  - The login modal reveals **zero hints**, **zero character requirements**, and **no cryptographic puzzle jargon**.
  - Simple, stealth password field with show/hide eye toggle.
- **Mil-Spec Cryptographic Hashing:**
  - The plaintext key is **never** saved in code or `localStorage`.
  - Stored exclusively as a salted `SHA-256` hash via the browser's native **Web Crypto API** (`crypto.subtle.digest`).
- **Brute-Force Rate Limiting & Lockout Guard:**
  - Maximum **3 failed attempts**.
  - Rate-limit penalty temporarily locks the console for **30 seconds** on the 3rd strike, doubling on subsequent failures.
  - Active real-time countdown display with disabled input fields during lockout.
- **Session Auto-Lock (Inactivity Timer):**
  - Authenticated admin sessions automatically terminate after **10 minutes** of inactivity.
  - Live auto-lock timer countdown shown in the admin header.
- **Shortcut:** Press <kbd>Alt</kbd> + <kbd>A</kbd> or click **ADMIN LOCKED** in the top bar.

---

## ✨ Features & Interactive Animations

- **Zero Emojis Policy:** Crafted completely using inline SVGs, vector badges, and brutalist typography.
- **Custom Interactive Vector Graphics:**
  - **Diet Coke:** Silver metallic can with fizzy condensation and carbonation bubbles. Click to pop and hear the fizz!
  - **Monster Ultra:** Textured frosted matte white can with embossed silver filigree laser details, silver claws, and icy frost glow. Click for ultra frost citrus surge!
  - **Blue Lays:** Glossy Magic Masala bag with textured chips and masala flecks. Click for a crispy chip blast!
- **Late Night 3 AM Study Station:**
  - Glowing animated desk with laptop, code editor, desk lamp, midnight moon, and floating stickers.
  - **Trigger Buttons:** "Trigger Caffeine Storm", "Spawn Chip Blast", and "Unleash Fizz Explosion".
- **Squad Status Radar:**
  - Live pulse indicators for Shubham, Darshil, and Kush.
  - Ping button that transmits alert toast notifications.
  - Dynamic Caffeine Index that recalculates in real-time based on inventory and active squad count.
- **Synthesized Audio Engine:** Built using the browser's native **Web Audio API** (produces realistic can pop, electric zap, and chip crunch sounds without downloading external audio files). SFX can be muted anytime.
- **Mobile & Desktop Responsive:** Optimized with fluid typography, responsive CSS grid, and touch-friendly controls.
