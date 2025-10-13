// 📅 DAY DISPLAY ADDON - Ultra-Simple Responsive
class DayDisplayAddon {
    constructor() {
        this.container = document.getElementById('dateContainer')
        this.dayElement = document.getElementById('dayOfWeek')
        this.dimensions = { width: 0, height: 0 }
        this.layerId = window.MYWALLPAPER_LAYER_ID
        this.readySignalSent = false

        // ✅ Read pre-injected config from MyWallpaper (avoids race condition)
        const config = window.MYWALLPAPER_CONFIG || {}

        // Default settings merged with pre-injected config
        this.settings = {
            fontUrl: config.fontUrl ?? 'https://fonts.cdnfonts.com/css/anurati',
            fontFamily: config.fontFamily ?? 'Anurati, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textColor: config.textColor ?? '#FFFFFF',
            language: config.language ?? 'en-US',
            letterSpacingPercent: config.letterSpacingPercent ?? 8
        }

        this.updateDimensions()
        this.loadCustomFont()
        this.setupEventListeners()
        this.startUpdating()
        this.applyResponsiveSize()

        console.log('📅 Day Display initialized with config:', this.settings)
    }
    
    updateDimensions() {
        this.dimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    
    applyResponsiveSize() {
        if (!this.dayElement) return
        
        // Formule magique : 100% de la plus petite dimension
        const fontSize = Math.min(this.dimensions.width, this.dimensions.height)
        
        // Espacement entre lettres responsive : configurable via settings
        const letterSpacing = fontSize * (this.settings.letterSpacingPercent / 100)
        console.log(`💬 Letter spacing calculation: fontSize=${fontSize}px × ${this.settings.letterSpacingPercent}% = ${letterSpacing}px`)
        
        // Pour éviter les limites browser sur font-size, utiliser transform scale pour très petites tailles
        if (fontSize < 12) {
            // Utiliser une taille de base de 12px et scaler vers le bas
            this.dayElement.style.fontSize = '12px'
            const baseLetterSpacing = 12 * (this.settings.letterSpacingPercent / 100)
            this.dayElement.style.letterSpacing = `${baseLetterSpacing}px`
            // Validation immédiate de la propriété appliquée
            const computedSpacing = window.getComputedStyle(this.dayElement).letterSpacing
            console.log(`✅ Tiny mode letterSpacing: ${baseLetterSpacing}px, computed: ${computedSpacing}`)
            
            const scaleFactor = fontSize / 12
            this.dayElement.style.transform = `scale(${scaleFactor})`
            this.dayElement.style.transformOrigin = 'center'
            console.log(`🔽 Tiny scaling: fontSize=12px, letterSpacing=${baseLetterSpacing}px, scale=${scaleFactor}, target=${fontSize}px`)
        } else {
            // Taille normale, pas besoin de transform
            this.dayElement.style.fontSize = `${fontSize}px`
            this.dayElement.style.letterSpacing = `${letterSpacing}px`
            // Validation immédiate de la propriété appliquée
            const computedSpacing = window.getComputedStyle(this.dayElement).letterSpacing
            console.log(`✅ Applied letterSpacing: ${letterSpacing}px, computed: ${computedSpacing}`)
            this.dayElement.style.transform = 'none'
            console.log(`📏 Normal scaling: fontSize=${fontSize}px, letterSpacing=${letterSpacing}px`)
        }
    }
    
    setupEventListeners() {
        // Settings updates from MyWallpaper
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'SETTINGS_UPDATE' && event.data?.settings) {
                this.updateSettings(event.data.settings)
            }
        })
        
        // Window resize listener
        window.addEventListener('resize', () => {
            this.updateDimensions()
            this.applyResponsiveSize()
        })
    }
    
    updateSettings(newSettings) {
        console.log('🔧 Updating settings:', newSettings)
        
        const oldFontUrl = this.settings.fontUrl
        // Merge settings
        Object.assign(this.settings, newSettings)
        
        // Load new font if URL changed
        if (oldFontUrl !== this.settings.fontUrl && this.settings.fontUrl) {
            this.loadCustomFont()
        } else {
            this.updateStyles()
            this.updateDisplay()
            this.applyResponsiveSize() // Recalcule la taille ET l'espacement
        }
    }
    
    loadCustomFont() {
        if (!this.settings.fontUrl) {
            this.signalReadyIfNeeded()
            return
        }

        // Remove existing font
        const existingLink = document.querySelector('link[data-custom-font]')
        if (existingLink) existingLink.remove()

        // Create font link element
        const fontLink = document.createElement('link')
        fontLink.rel = 'stylesheet'
        fontLink.href = this.settings.fontUrl
        fontLink.setAttribute('data-custom-font', 'true')

        fontLink.onload = () => {
            this.updateStyles()
            this.applyResponsiveSize()
            this.signalReadyIfNeeded()
        }

        fontLink.onerror = () => {
            console.warn('⚠️ Font failed to load, using fallback')
            this.signalReadyIfNeeded()
        }

        document.head.appendChild(fontLink)
    }

    signalReadyIfNeeded() {
        if (this.readySignalSent || !this.layerId) return
        if (!this.dayElement || !this.dayElement.textContent) return

        this.readySignalSent = true
        window.parent.postMessage({
            type: 'ADDON_READY',
            layerId: this.layerId
        }, '*')
        console.log('✅ Day display ready signal sent')
    }
    
    updateStyles() {
        // Apply only configurable styles
        this.container.style.fontFamily = this.settings.fontFamily
        this.container.style.color = this.settings.textColor
        this.container.setAttribute('lang', this.settings.language)
    }
    
    startUpdating() {
        this.updateDisplay()
        
        // Update every minute for day changes
        setInterval(() => {
            this.updateDisplay()
        }, 60000)
    }
    
    updateDisplay() {
        const now = new Date()
        const locale = this.settings.language

        try {
            const dayName = now.toLocaleDateString(locale, { weekday: 'long' })
            this.dayElement.textContent = dayName
        } catch (error) {
            console.error('Error updating display:', error)
            const dayName = now.toLocaleDateString('en-US', { weekday: 'long' })
            this.dayElement.textContent = dayName
        }

        // ✅ Signal ready after first display update
        this.signalReadyIfNeeded()
    }
    
    destroy() {
        const fontLink = document.querySelector('link[data-custom-font]')
        if (fontLink) fontLink.remove()
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dayDisplay = new DayDisplayAddon()
})