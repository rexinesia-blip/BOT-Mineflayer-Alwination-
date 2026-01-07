# ðŸš€ INSTALLATION - Minecraft Modular Bot V4

## âš¡ QUICK FIX (Untuk Error di Screenshot)

### Pterodactyl Panel (seperti di screenshot Anda):

```bash
# 1. Stop bot (klik STOP di panel)

# 2. Masuk ke File Manager atau Console

# 3. Jalankan command ini:
rm -rf node_modules package-lock.json
npm install

# 4. START bot lagi
```

---

## ðŸ“¦ DEPENDENCIES YANG DIBUTUHKAN

### âœ… Sudah Termasuk di package.json:

| Package | Version | Purpose |
|---------|---------|---------|
| **mineflayer** | 4.20.1 | Bot framework utama |
| **axios** | 1.7.9 | HTTP client (ChatGPT API) |
| **vec3** | 0.1.8 | Vector math |
| **minecraft-data** | 3.69.0 | Minecraft data |
| **jimp** | 0.22.12 | Image processing |
| **nearest-color** | 0.4.4 | Color matching |
| **mineflayer-pathfinder** | 2.4.4 | Pathfinding |
| **mineflayer-schem** | 1.2.0 | Schematic builder |
| **prismarine-schematic** | 1.5.1 | Schematic parser |

**Total: 9 dependencies**

---

## ðŸŽ¯ INSTALLATION METHODS

### Method 1: Auto-Install Script (RECOMMENDED)

#### Linux/Mac/Pterodactyl:
```bash
chmod +x fix-install.sh
./fix-install.sh
```

#### Windows PowerShell:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\fix-install.ps1
```

### Method 2: Manual Install (ONE COMMAND)
```bash
npm install mineflayer axios vec3 minecraft-data jimp nearest-color mineflayer-pathfinder mineflayer-schem prismarine-schematic
```

### Method 3: Using package.json (SIMPLEST)
```bash
npm install
```

---

## âœ… VERIFICATION

### Check Installed Packages:
```bash
npm list --depth=0
```

### Expected Output:
```
â”œâ”€â”€ axios@1.7.9
â”œâ”€â”€ jimp@0.22.12
â”œâ”€â”€ minecraft-data@3.69.0
â”œâ”€â”€ mineflayer@4.20.1
â”œâ”€â”€ mineflayer-pathfinder@2.4.4
â”œâ”€â”€ mineflayer-schem@1.2.0
â”œâ”€â”€ nearest-color@0.4.4
â”œâ”€â”€ prismarine-schematic@1.5.1
â””â”€â”€ vec3@0.1.8
```

### Test Modules:
```bash
node -e "require('mineflayer'); console.log('âœ… OK')"
node -e "require('jimp'); console.log('âœ… OK')"
node -e "require('mineflayer-pathfinder'); console.log('âœ… OK')"
```

---

## ðŸƒ RUN BOT

### Start Bot:
```bash
node index.js
```

### Expected Console Output:
```
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘ MINECRAFT MODULAR BOT SYSTEM V4                          â•‘
â•‘ "AI + IMG Builder + SCHEM Builder + Kill Aura"           â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

ðŸ“‹ Konfigurasi:
   Server: alwination.id:25565
   Version: 1.16.5

ðŸ¤– Modul Aktif:
   âœ… AI Module (ChatGPT)
   âœ… IMG Module (Image to Blocks) + Database
   âœ… SCHEM Module (Schematic Builder) + Database
   âœ… Kill Aura Module

ðŸ’¾ Features:
   âœ… Auto-create folders
   âœ… Database tracking
   âœ… Auto-teleport to build location
   âœ… Resume from anywhere
   âœ… Whisper support (/msg reply via /r)

ðŸš€ Starting bots...

>>> [Slot 1] ChatGPT_API berhasil spawn!
[IMG] ðŸ“ Folder dibuat: images
[IMG] ðŸ“ Folder dibuat: database
[SCHEM] ðŸ“ Folder dibuat: schematics
```

---

## ðŸ“ FOLDER STRUCTURE

### After First Run:
```
project/
â”œâ”€â”€ node_modules/          âœ… Created after npm install
â”œâ”€â”€ package.json           âœ… Dependencies list
â”œâ”€â”€ package-lock.json      âœ… Auto-generated
â”œâ”€â”€ index.js               âœ… Main bot file
â”œâ”€â”€ ai.js                  âœ… ChatGPT module
â”œâ”€â”€ img.js                 âœ… Image builder
â”œâ”€â”€ schem.js               âœ… Schematic builder
â”œâ”€â”€ images/                âœ… Auto-created by bot
â”œâ”€â”€ schematics/            âœ… Auto-created by bot
â””â”€â”€ database/              âœ… Auto-created by bot
    â”œâ”€â”€ img_builds.json
    â””â”€â”€ schem_builds.json
```

---

## âš ï¸ TROUBLESHOOTING

### Error: "Cannot find module 'X'"
```bash
# Install missing module
npm install X
```

### Error: "EACCES permission denied"
```bash
# Fix permissions
sudo chown -R $USER ~/.npm
```

### Error: "gyp ERR! build error"
```bash
# Install build tools
# Ubuntu/Debian:
sudo apt-get install build-essential

# Windows:
npm install --global windows-build-tools
```

### Error: "npm ERR! code ENOTFOUND"
```bash
# Check internet connection or try different registry
npm config set registry https://registry.npmmirror.com/
npm install
```

### Bot Starts But No Folders Created
```bash
# Check permissions
ls -la

# Folders will be created after bot spawns in world
# Wait for "berhasil spawn!" message
```

---

## ðŸ”§ FOR PTERODACTYL USERS

### In Pterodactyl Panel:

1. **STOP** bot terlebih dahulu
2. Buka **File Manager**
3. Upload semua file:
   - index.js
   - ai.js
   - img.js
   - schem.js
   - package.json
4. Buka **Console**
5. Run command:
   ```bash
   npm install
   ```
6. Wait hingga selesai (beberapa menit)
7. **START** bot

### Alternative via SFTP:
```bash
# Connect via SFTP
# Upload all files
# Then via console:
npm install
```

---

## ðŸ’¡ TIPS

### Speed Up Installation:
```bash
# Use yarn (faster than npm)
npm install -g yarn
yarn install
```

### Clean Install:
```bash
# Remove everything and start fresh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Check Installation Size:
```bash
du -sh node_modules/
# Should be ~200-300 MB
```

---

## ðŸ“ž NEED HELP?

### Check These Files:
- `INSTALL_GUIDE.md` - Full troubleshooting guide
- `QUICKSTART.md` - Usage guide
- `CHANGE_LOG.md` - What's new in V4

### Quick Tests:
```bash
# Node.js version (should be 16+)
node --version

# npm version (should be 8+)
npm --version

# Check if package.json exists
cat package.json

# List installed packages
npm list --depth=0
```

---

## âœ¨ SUCCESS INDICATORS

You know installation is successful when:

âœ… `npm install` completes without errors  
âœ… `node_modules/` folder exists (~300 MB)  
âœ… All 9 dependencies show in `npm list`  
âœ… `node index.js` starts without "Cannot find module" errors  
âœ… Bot connects to server  
âœ… Folders auto-created (images/, schematics/, database/)  
âœ… Console shows "Modul Aktif" messages  

---

## ðŸŽ‰ READY TO USE!

After successful installation:

```bash
# Start bot
node index.js

# Test commands in game:
/msg BotImg !helpimg
/msg BotSchem !helpschem
```

**Installation complete! Happy building! ðŸ—ï¸**

# ðŸš€ INSTALLATION GUIDE
## Minecraft Modular Bot System V4

---

## âš ï¸ FIXING CURRENT ERRORS

Berdasarkan screenshot error Anda, berikut adalah solusi lengkap:

### Error yang Terlihat:
```
Error: Cannot find module 'mineflayer'
Error: Cannot find module 'axios'
Error: Cannot find module 'jimp'
Error: Cannot find module 'nearest-color'
Error: Cannot find module 'mineflayer-pathfinder'
```

---

## ðŸ“¦ STEP-BY-STEP INSTALLATION

### Step 1: Check Node.js Version
```bash
node --version
# Should be v16 or higher
# If not: https://nodejs.org/
```

### Step 2: Clean Install (RECOMMENDED)
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules
rm -rf package-lock.json

# Install fresh
npm install
```

### Step 3: Install All Dependencies
```bash
# Core dependencies
npm install mineflayer@4.20.1
npm install axios@1.7.9
npm install vec3@0.1.8
npm install minecraft-data@3.69.0

# Image builder dependencies
npm install jimp@0.22.12
npm install nearest-color@0.4.4

# Pathfinding (untuk img.js dan schem.js)
npm install mineflayer-pathfinder@2.4.4

# Schematic builder dependencies
npm install mineflayer-schem@1.2.0
npm install prismarine-schematic@1.5.1
```

### Step 4: Install All at Once (FASTEST)
```bash
npm install mineflayer axios vec3 minecraft-data jimp nearest-color mineflayer-pathfinder mineflayer-schem prismarine-schematic
```

---

## ðŸ”§ TROUBLESHOOTING

### Issue 1: npm ERR! EACCES
```bash
# Fix permission error
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Issue 2: npm ERR! code ENOTFOUND
```bash
# Check internet connection
ping registry.npmjs.org

# Or use different registry
npm config set registry https://registry.npmmirror.com/
```

### Issue 3: Python/node-gyp Error
```bash
# Install build tools
# For Ubuntu/Debian:
sudo apt-get install build-essential

# For Windows:
npm install --global windows-build-tools

# For MacOS:
xcode-select --install
```

### Issue 4: Canvas/jimp Installation Failed
```bash
# Install system dependencies first
# Ubuntu/Debian:
sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# Then install jimp
npm install jimp --build-from-source
```

---

## âœ… VERIFICATION

### Check Installation
```bash
# List all installed packages
npm list --depth=0

# Should show:
# â”œâ”€â”€ axios@1.7.9
# â”œâ”€â”€ jimp@0.22.12
# â”œâ”€â”€ minecraft-data@3.69.0
# â”œâ”€â”€ mineflayer@4.20.1
# â”œâ”€â”€ mineflayer-pathfinder@2.4.4
# â”œâ”€â”€ mineflayer-schem@1.2.0
# â”œâ”€â”€ nearest-color@0.4.4
# â”œâ”€â”€ prismarine-schematic@1.5.1
# â””â”€â”€ vec3@0.1.8
```

### Test Import
```bash
node -e "require('mineflayer'); console.log('âœ… mineflayer OK')"
node -e "require('axios'); console.log('âœ… axios OK')"
node -e "require('jimp'); console.log('âœ… jimp OK')"
node -e "require('mineflayer-pathfinder'); console.log('âœ… pathfinder OK')"
```

---

## ðŸŽ® RUNNING THE BOT

### Start Bot
```bash
# Normal start
node index.js

# Or with auto-restart (development)
npm run dev

# Or using nodemon directly
nodemon index.js
```

### Expected Output
```
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘ MINECRAFT MODULAR BOT SYSTEM V4                          â•‘
â•‘ "AI + IMG Builder + SCHEM Builder + Kill Aura"           â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

ðŸ“‹ Konfigurasi:
   Server: alwination.id:25565
   Version: 1.16.5

ðŸ¤– Modul Aktif:
   âœ… AI Module (ChatGPT)
   âœ… IMG Module (Image to Blocks) + Database
   âœ… SCHEM Module (Schematic Builder) + Database
   âœ… Kill Aura Module

ðŸ’¾ Features:
   âœ… Auto-create folders
   âœ… Database tracking
   âœ… Auto-teleport to build location
   âœ… Resume from anywhere
   âœ… Whisper support (/msg reply via /r)

ðŸš€ Starting bots...

>>> [Slot 1] ChatGPT_API berhasil spawn!
[IMG] ðŸ“ Folder dibuat: /path/to/project/images
[IMG] ðŸ“ Folder dibuat: /path/to/project/database
[SCHEM] ðŸ“ Folder dibuat: /path/to/project/schematics
```

---

## ðŸ“ PROJECT STRUCTURE

### After Installation:
```
project/
â”œâ”€â”€ node_modules/          â† All dependencies (auto-created)
â”œâ”€â”€ package.json           â† Dependencies list
â”œâ”€â”€ package-lock.json      â† Lock file (auto-created)
â”œâ”€â”€ index.js               â† Main entry point
â”œâ”€â”€ ai.js                  â† ChatGPT module
â”œâ”€â”€ img.js                 â† Image builder module
â”œâ”€â”€ schem.js               â† Schematic builder module
â”œâ”€â”€ images/                â† Auto-created by bot
â”œâ”€â”€ schematics/            â† Auto-created by bot
â””â”€â”€ database/              â† Auto-created by bot
    â”œâ”€â”€ img_builds.json
    â””â”€â”€ schem_builds.json
```

---

## ðŸŒ ALTERNATIVE REGISTRIES

### If NPM is Slow:
```bash
# Use Taobao mirror (China)
npm config set registry https://registry.npmmirror.com/
npm install

# Or Aliyun (China)
npm config set registry https://registry.npm.taobao.org/
npm install

# Reset to default
npm config set registry https://registry.npmjs.org/
```

---

## ðŸ” COMMON ERRORS & FIXES

### 1. "Cannot find module 'X'"
```bash
# Missing dependency - install it
npm install X
```

### 2. "Error: ENOSPC: System limit for number of file watchers reached"
```bash
# Increase file watcher limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 3. "gyp ERR! build error"
```bash
# Rebuild native modules
npm rebuild

# Or force rebuild
npm install --build-from-source
```

### 4. "Module version mismatch"
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## ðŸ“Š DISK SPACE

### Check Space:
```bash
# Check available space
df -h

# Check node_modules size
du -sh node_modules/
# Should be ~200-300 MB
```

### If Low Disk Space:
```bash
# Clean npm cache
npm cache clean --force

# Remove old node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```

---

## ðŸš€ QUICK FIX COMMAND

### All-in-One Fix:
```bash
#!/bin/bash
echo "ðŸ”§ Fixing Minecraft Bot Installation..."

# Clean
rm -rf node_modules package-lock.json
npm cache clean --force

# Install
npm install mineflayer axios vec3 minecraft-data
npm install jimp nearest-color mineflayer-pathfinder
npm install mineflayer-schem prismarine-schematic

# Verify
echo "âœ… Installation complete!"
npm list --depth=0

echo "ðŸŽ® Ready to run: node index.js"
```

Save as `fix-install.sh`, then:
```bash
chmod +x fix-install.sh
./fix-install.sh
```

---

## ðŸ“ž STILL HAVING ISSUES?

### Check:
1. âœ… Node.js version >= 16
2. âœ… npm version >= 8
3. âœ… Internet connection
4. âœ… Disk space > 1GB
5. âœ… package.json exists
6. âœ… No proxy/firewall blocking npm

### Debug Commands:
```bash
# Check npm config
npm config list

# Check node/npm versions
node --version
npm --version

# Check registry
npm config get registry

# Verbose install
npm install --verbose
```

---

## âœ¨ SUCCESS CHECKLIST

- [ ] Node.js installed (v16+)
- [ ] package.json exists
- [ ] `npm install` completed without errors
- [ ] node_modules/ folder created
- [ ] All 9 dependencies installed
- [ ] Test imports pass
- [ ] `node index.js` runs
- [ ] Folders auto-created (images/, schematics/, database/)
- [ ] Bots connect to server

---

**After installation success, check QUICKSTART.md untuk cara penggunaan!**

Good luck! ðŸŽ‰
