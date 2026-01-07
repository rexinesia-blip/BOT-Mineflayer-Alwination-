const axios = require('axios')

// =========================================================
// KONFIGURASI CHATGPT
// =========================================================

const chatGPTConfig = {
  // API Key Anda (ChatAnywhere Free)
  apiKey: 'sk-3ZidMb4KLKWITlINZfR1dRg9MFaHicdCWpjT8HzjdkwQzt8N',

  // Base URL ChatAnywhere
  baseURL: 'https://api.chatanywhere.tech/v1',

  // Model AI
  model: 'gpt-4o-mini',

  // Limit karakter
  maxInputLength: 120,
  maxOutputLength: 120,
  maxTokens: 50,
  temperature: 0.5,

  // Prefix untuk trigger bot (case insensitive)
  prefixes: ['@chatgpt', '@ai'],

  // Pesan "Tunggu" dengan 2 variasi
  waitMessages: [
    "Tunggu Ya {username} Sayangku.. Bot Lagi Mikir...",
    "Sabar Ya {username} Sayangku.. Lagi Diproses..."
  ],

  // Delay setelah AI dapat jawaban (3 detik)
  responseDelay: 3000,

  // Announcement messages setelah masuk earth
  announcements: {
    message1: "@here Hiii everyone, Bot ChatGPT by Vann siap membantu anda. [-masih uji coba-]",
    message2: "untuk menggunakan saya ketik @AI atau @ChatGPT Promt Teks, bisa lewat chat/msg",
    delayMessage1: 1000,
    delayMessage2: 5000
  },

  // System Prompt
  systemPrompt: `Kamu adalah ChatGPT_API, bot Minecraft yang ahli dan sangat ringkas. 

ATURAN KETAT:
- Jawab MAKSIMAL 120 KARAKTER (termasuk spasi dan tanda baca)
- Gunakan bahasa Indonesia yang SANGAT SINGKAT tapi jelas
- Langsung to the point, TANPA basa-basi
- Gunakan singkatan yang umum (mis: "utk" = untuk, "dgn" = dengan, "yg" = yang)
- Hapus kata-kata tidak penting
- FOKUS pada info penting saja
- Jika perlu list, gunakan format minimal

Contoh jawaban bagus:
"Diamond di Y-12. Mining dgn iron pick. Branch mining lebih efisien."
"Nether: bikin portal obsidian 4x5, nyalain dgn flint. Siapkan armor+weapon."
"Enchant: butuh table, 15 bookshelf, lapis. Level 30 utk enchant terbaik."

INGAT: MAX 120 KARAKTER! Singkat, padat, jelas!`
}

// =========================================================
// STATE MANAGEMENT
// =========================================================

let waitMessageIndex = 0
let isProcessingChatGPT = false
let lastRequestTime = 0
const cooldownMs = 3000

// =========================================================
// FUNGSI HELPER
// =========================================================

function detectPrefix(message) {
  const messageLower = message.toLowerCase()
  for (const prefix of chatGPTConfig.prefixes) {
    if (messageLower.includes(prefix)) {
      return prefix
    }
  }
  return null
}

function removePrefix(message) {
  const messageLower = message.toLowerCase()
  for (const prefix of chatGPTConfig.prefixes) {
    if (messageLower.includes(prefix)) {
      const index = messageLower.indexOf(prefix)
      return message.substring(0, index) + message.substring(index + prefix.length)
    }
  }
  return message
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

function getWaitMessage(username) {
  const template = chatGPTConfig.waitMessages[waitMessageIndex]
  waitMessageIndex = (waitMessageIndex + 1) % chatGPTConfig.waitMessages.length
  return template.replace('{username}', username)
}

// =========================================================
// CHATGPT API CALL
// =========================================================

async function getChatGPTResponse(userMessage) {
  try {
    console.log(`[ChatGPT] 📤 Mengirim request ke ${chatGPTConfig.model}...`)

    const response = await axios.post(
      `${chatGPTConfig.baseURL}/chat/completions`,
      {
        model: chatGPTConfig.model,
        messages: [
          {
            role: 'system',
            content: chatGPTConfig.systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: chatGPTConfig.maxTokens,
        temperature: chatGPTConfig.temperature,
        stream: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${chatGPTConfig.apiKey}`
        },
        timeout: 30000
      }
    )

    let reply = response.data.choices[0].message.content.trim()

    if (reply.length > chatGPTConfig.maxOutputLength) {
      reply = truncateText(reply, chatGPTConfig.maxOutputLength)
      console.log(`[ChatGPT] ⚠️ Response dipotong ke ${chatGPTConfig.maxOutputLength} chars`)
    }

    console.log(`[ChatGPT] ✅ Response ready: ${reply} (${reply.length} chars)`)
    return reply

  } catch (error) {
    console.error(`[ChatGPT] ❌ Error:`, error.message)

    if (error.response) {
      const status = error.response.status
      if (status === 401) return 'API Key invalid!'
      if (status === 429) return 'Limit harian habis, coba besok!'
      if (status === 500) return 'Server sibuk, coba lagi!'
    }

    return 'Error, coba lagi nanti!'
  }
}

// =========================================================
// HANDLER UNTUK CHAT & WHISPER
// =========================================================

async function handleChatMessage(bot, username, message) {
  if (username === bot.username) return

  const detectedPrefix = detectPrefix(message)

  if (detectedPrefix) {
    const now = Date.now()
    if (now - lastRequestTime < cooldownMs) {
      const remaining = Math.ceil((cooldownMs - (now - lastRequestTime)) / 1000)
      console.log(`[ChatGPT] ⏳ Cooldown ${remaining}s...`)
      return
    }

    if (isProcessingChatGPT) {
      console.log(`[ChatGPT] ⏳ Masih processing...`)
      return
    }

    const question = removePrefix(message).trim()

    if (question.length === 0) {
      bot.chat('Halo! Tanya apa? (max 120 huruf)')
      return
    }

    if (question.length > chatGPTConfig.maxInputLength) {
      console.log(`[ChatGPT] ❌ Input terlalu panjang: ${question.length} chars`)
      bot.chat(`Pertanyaan terlalu panjang! Max ${chatGPTConfig.maxInputLength} huruf. Sekarang: ${question.length}`)
      return
    }

    isProcessingChatGPT = true
    lastRequestTime = now

    console.log(`[ChatGPT] 📨 Dari ${username}: "${question}" (${question.length} chars)`)

    const waitMsg = getWaitMessage(username)
    bot.chat(waitMsg)
    console.log(`[ChatGPT] 💬 Sent wait message: "${waitMsg}"`)

    const response = await getChatGPTResponse(question)
    console.log(`[ChatGPT] 🎯 Got response, waiting ${chatGPTConfig.responseDelay}ms...`)

    setTimeout(() => {
      bot.chat(response)
      console.log(`[ChatGPT] ✅ Sent final answer: "${response}" (${response.length} chars)`)
      isProcessingChatGPT = false
    }, chatGPTConfig.responseDelay)
  }
}

async function handleWhisperMessage(bot, message) {
  const whisperRegex1 = /^[WHISPER]s+([^:]+):s+(.+)$/
  const whisperRegex2 = /✉⬇s+MSGs+((.+?)s+[➺→]s+(.+?))s+(.*)/

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

  if (content) {
    const detectedPrefix = detectPrefix(content)

    if (detectedPrefix) {
      const now = Date.now()
      if (now - lastRequestTime < cooldownMs || isProcessingChatGPT) {
        console.log(`[ChatGPT Whisper] ⏳ Cooldown...`)
        return
      }

      isProcessingChatGPT = true
      lastRequestTime = now

      const question = removePrefix(content).trim()

      console.log(`[ChatGPT Whisper] 📨 Dari ${sender}: "${question}"`)

      if (question.length > 0) {
        const waitMsg = getWaitMessage(sender)
        bot.chat(`/msg ${sender} ${waitMsg}`)
        console.log(`[ChatGPT Whisper] 💬 Sent wait message to ${sender}`)

        const response = await getChatGPTResponse(question)
        console.log(`[ChatGPT Whisper] 🎯 Got response, waiting ${chatGPTConfig.responseDelay}ms...`)

        setTimeout(() => {
          bot.chat(`/msg ${sender} ${response}`)
          console.log(`[ChatGPT Whisper] ✅ Sent final answer to ${sender}`)
          isProcessingChatGPT = false
        }, chatGPTConfig.responseDelay)
      } else {
        isProcessingChatGPT = false
      }
    }
  }
}

// =========================================================
// INISIALISASI MODULE
// =========================================================

function initAI(bot, index, config) {
  console.log(`[Slot ${index + 1}] 🤖 ChatGPT Bot AKTIF`)
  console.log(`[Slot ${index + 1}] 📝 Prefix: @ChatGPT atau @AI`)
  console.log(`[Slot ${index + 1}] 📊 Model: ${chatGPTConfig.model}`)

  // Announcement messages
  setTimeout(() => {
    bot.chat(chatGPTConfig.announcements.message1)
    console.log(`[Slot ${index + 1}] 📢 Announcement 1`)
  }, config.world.delay + chatGPTConfig.announcements.delayMessage1)

  setTimeout(() => {
    bot.chat(chatGPTConfig.announcements.message2)
    console.log(`[Slot ${index + 1}] 📢 Announcement 2`)
  }, config.world.delay + chatGPTConfig.announcements.delayMessage2)

  // Event listeners
  bot.on('chat', (username, message) => handleChatMessage(bot, username, message))
  bot.on('messagestr', (message) => handleWhisperMessage(bot, message))
}

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  initAI,
  chatGPTConfig
}