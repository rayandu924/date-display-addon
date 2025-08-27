// 📅 DAY DISPLAY ADDON - Ultra simple responsive
class DayDisplayAddon {
    constructor() {
        this.container = document.getElementById('dateContainer')
        this.dayElement = document.getElementById('dayOfWeek')
        
        // Default settings
        this.settings = {
            fontUrl: '',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textColor: '#FFFFFF',
            language: 'en-US'
        }
        
        this.setupEventListeners()
        this.startUpdating()
        
        console.log('📅 Day Display Addon initialized')
    }
    
    setupEventListeners() {
        // Settings updates from MyWallpaper
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'SETTINGS_UPDATE' && event.data?.settings) {
                this.updateSettings(event.data.settings)
            }
        })
    }
    
    updateSettings(newSettings) {
        console.log('🔧 Updating day settings:', newSettings)
        
        const oldFontUrl = this.settings.fontUrl
        // Merge settings
        for (const key in newSettings) {
            if (newSettings.hasOwnProperty(key)) {
                this.settings[key] = newSettings[key]
            }
        }
        
        // Load new font if URL changed
        if (oldFontUrl !== this.settings.fontUrl && this.settings.fontUrl) {
            this.loadCustomFont()
        }
        
        // Update visual styles
        this.updateStyles()
        
        // Update content immediately
        this.updateDisplay()
    }
    
    loadCustomFont() {
        if (!this.settings.fontUrl) return
        
        // Remove existing font
        const existingLink = document.querySelector('link[data-custom-font]')
        if (existingLink) {
            existingLink.remove()
        }
        
        // Create font link element
        const fontLink = document.createElement('link')
        fontLink.rel = 'stylesheet'
        fontLink.href = this.settings.fontUrl
        fontLink.setAttribute('data-custom-font', 'true')
        
        fontLink.onload = () => {
            console.log('✅ Custom font loaded successfully')
            this.updateStyles()
        }
        
        fontLink.onerror = () => {
            console.warn('❌ Failed to load custom font, using fallback')
            this.updateStyles()
        }
        
        document.head.appendChild(fontLink)
        console.log('🔤 Loading custom font:', this.settings.fontUrl)
    }
    
    updateStyles() {
        // Only apply configurable styles - CSS handles all responsive sizing
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
            // Fallback to English
            const dayName = now.toLocaleDateString('en-US', { weekday: 'long' })
            this.dayElement.textContent = dayName
        }
    }
    
    destroy() {
        // Remove custom font
        const fontLink = document.querySelector('link[data-custom-font]')
        if (fontLink) {
            fontLink.remove()
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dayDisplay = new DayDisplayAddon()
})