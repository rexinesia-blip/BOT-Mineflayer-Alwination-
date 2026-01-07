const mineflayer = require('mineflayer')
const aiModule = require('./ai')
const imgModule = require('./img')        // â† CHANGED: dari builderModule
const schemModule = require('./schem')    // â† NEW: untuk schematic builder

// =========================================================
// KONFIGURASI UTAMA
// =========================================================
const serverConfig = {
  host: 'alwination.id',
  port: 25565,
  version: "1.16.5"
}

// Konfigurasi perilaku Bot
const config = {
  world: {
    cmd: '/move earth',
    delay: 6000
  },
  auth: {
    loginDelay: 0,
    registerDelay: 3000
  }
}

// =========================================================
// DAFTAR AKUN
// =========================================================
const accounts = [
  { username: "ChatGPT_API", password: "revan999", type: "ai" },       // Slot 1: ChatGPT Bot
  { username: "BotPvPTest", password: "$revan999", type: "killaura" },  // Slot 2: Kill Aura
  { username: "BotSFTest", password: "$revan999", type: "killaura" },   // Slot 3: Kill Aura
  { username: "BotImg", password: "$revan999", type: "img" },           // Slot 4: Image Builder (CHANGED!)
  { username: "BotSchem", password: "$revan999", type: "schem" }        // Slot 5: Schematic Builder (NEW!)
]

// =========================================================
// LOGIKA UTAMA BOT
// =========================================================
function createBot(account, index) {
  if (!account.username || account.username === "") return

  const bot = mineflayer.createBot({
    host: serverConfig.host,
    port: serverConfig.port,
    username: account.username,
    auth: 'offline',
    version: serverConfig.version,
    hideErrors: true
  })

  let kickReasonLog = ""
  let attackInterval

  // -----------------------------------------------------
  // SPAWN & LOGIN LOGIC
  // -----------------------------------------------------
  bot.once('spawn', () => {
    console.log(`>>> [Slot ${index + 1}] ${account.username} berhasil spawn!`)

    setTimeout(() => {
      bot.chat(`/login ${account.password}`)
      console.log(`[Slot ${index + 1}] Mengetik: /login *****`)
    }, config.auth.loginDelay)

    setTimeout(() => {
      bot.chat(`/register ${account.password}`)
      console.log(`[Slot ${index + 1}] Mengetik: /register *****`)
    }, config.auth.registerDelay)

    setTimeout(() => {
      bot.chat(config.world.cmd)
      console.log(`[Slot ${index + 1}] Mengetik: ${config.world.cmd}`)
    }, config.world.delay)

    // =====================================================
    // INISIALISASI MODUL BERDASARKAN TYPE
    // =====================================================
    if (account.type === "ai") {
      aiModule.initAI(bot, index, config)
    } else if (account.type === "img") {           // â† CHANGED: dari "builder"
      imgModule.initImg(bot, index)
    } else if (account.type === "schem") {         // â† NEW: schematic builder
      schemModule.initSchem(bot, index)
    } else if (account.type === "killaura") {
      console.log(`[Slot ${index + 1}] âš”ï¸ Kill Aura AKTIF`)
      startKillAura()
    }
  })

  // -----------------------------------------------------
  // AUTO TPA (ALL BOTS)
  // -----------------------------------------------------
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message.toLowerCase().includes('!tpa')) {
      console.log(`[Slot ${index + 1}] ðŸ“ TPA dari ${username}`)
      bot.chat('/tpaccept')
    }
  })

  // TPA dari whisper
  bot.on('messagestr', (message) => {
    const whisperRegex1 = /^\[WHISPER\]\s+([^:]+):\s+(.+)$/
    const whisperRegex2 = /âœ‰â¬‡\s+MSG\s+((.+?)\s+[âžºâ†’]\s+(.+?))\s+(.*)/

    let sender = null
    let content = null

    const match1 = message.match(whisperRegex1)
    const match2 = message.match(whisperRegex2)

    if (match1) {
      sender = match1[1]
      content = match1[2]
    } else if (match2) {
      sender = match2[1]
      content = match2[3]
    }

    if (content && content.trim().toLowerCase() === '!tpa') {
      console.log(`[Slot ${index + 1}] ðŸ“ TPA dari ${sender}`)
      bot.chat('/tpaccept')
    }
  })

  // -----------------------------------------------------
  // KILL AURA (SLOTS DENGAN TYPE KILLAURA)
  // -----------------------------------------------------
  function startKillAura() {
    const targetMobs = ['zombie', 'skeleton', 'spider', 'creeper', 'blaze',
                        'magma_cube', 'witch', 'enderman', 'slime', 'piglin']

    attackInterval = setInterval(() => {
      const mobFilter = e => e.type === 'mob' && targetMobs.includes(e.name)
      const mob = bot.nearestEntity(mobFilter)
      if (!mob) return

      const distance = bot.entity.position.distanceTo(mob.position)
      if (distance > 4) {
        bot.lookAt(mob.position.offset(0, mob.height, 0))
        return
      }

      bot.lookAt(mob.position.offset(0, mob.height, 0), true, () => {
        bot.attack(mob)
      })
    }, 1000)
  }

  // -----------------------------------------------------
  // MONITORING & AUTO RECONNECT
  // -----------------------------------------------------
  bot.on('messagestr', (message, position) => {
    if (index === 0 && position !== 'game_info') {
      if (message.includes('/register') || message.includes('/login')) return
      if (message.includes('âœ‰â¬‡') || message.includes('[WHISPER]')) return
      console.log(`[SERVER] ${message}`)
    }
  })

  bot.on('kicked', (reason) => {
    kickReasonLog = JSON.stringify(reason).toLowerCase()
    console.log(`[Slot ${index + 1}] âš ï¸ Kicked: ${kickReasonLog}`)
  })

  bot.on('end', () => {
    if (attackInterval) clearInterval(attackInterval)

    const isMaintenance = kickReasonLog.includes('maintenance') ||
                          kickReasonLog.includes('perbaikan') ||
                          kickReasonLog.includes('tutup') ||
                          kickReasonLog.includes('proxy')

    if (isMaintenance) {
      console.log(`[Slot ${index + 1}] ðŸ”§ Maintenance. Reconnect 60s...`)
      setTimeout(() => createBot(account, index), 60000)
    } else {
      console.log(`[Slot ${index + 1}] ðŸ”„ Reconnect 10s...`)
      setTimeout(() => createBot(account, index), 10000)
    }
  })

  bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      console.log(`[Slot ${index + 1}] âŒ Connection Error. Retry 30s...`)
      setTimeout(() => createBot(account, index), 30000)
    } else {
      console.error(`[Slot ${index + 1}] Error:`, err.message)
    }
  })
}

// =========================================================
// STARTUP SEQUENCE
// =========================================================
console.log(`
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘ MINECRAFT MODULAR BOT SYSTEM V4                          â•‘
â•‘ "AI + IMG Builder + SCHEM Builder + Kill Aura"           â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
`)

console.log(`ðŸ“‹ Konfigurasi:`)
console.log(` Server: ${serverConfig.host}:${serverConfig.port}`)
console.log(` Version: ${serverConfig.version}`)
console.log(``)
console.log(`ðŸ¤– Modul Aktif:`)
console.log(` âœ… AI Module (ChatGPT)`)
console.log(` âœ… IMG Module (Image to Blocks) + Database`)
console.log(` âœ… SCHEM Module (Schematic Builder) + Database`)
console.log(` âœ… Kill Aura Module`)
console.log(``)
console.log(`ðŸ’¾ Features:`)
console.log(` âœ… Auto-create folders`)
console.log(` âœ… Database tracking`)
console.log(` âœ… Auto-teleport to build location`)
console.log(` âœ… Resume from anywhere`)
console.log(` âœ… Whisper support (/msg reply via /r)`)
console.log(``)
console.log(`ðŸš€ Starting bots...`)
console.log(``)

let currentBotIndex = 0

function startNextBot() {
  if (currentBotIndex < accounts.length) {
    const acc = accounts[currentBotIndex]
    if (acc.username && acc.username !== "") {
      createBot(acc, currentBotIndex)
      setTimeout(() => {
        currentBotIndex++
        startNextBot()
      }, 5000)
    } else {
      currentBotIndex++
      startNextBot()
    }
  }
}

startNextBot()