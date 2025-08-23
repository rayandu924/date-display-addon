// 📅 DAY OF WEEK DISPLAY ADDON - Simple day name display
class DayOfWeekDisplayAddon {
    constructor() {
        this.container = document.getElementById('dateContainer')
        this.dayElement = document.getElementById('dayOfWeek')
        
        // Update interval
        this.updateInterval = null
        this.fontLoadTimeout = null
        
        // Default settings
        this.settings = {
            fontUrl: '',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 48,
            fontWeight: '600',
            textColor: '#FFFFFF',
            backgroundColor: '#000000',
            backgroundOpacity: 0,
            textAlign: 'center',
            language: 'en-US',
            textShadow: true,
            showFullName: true
        }
        
        this.setupEventListeners()
        this.startUpdating()
        
        console.log('📅 Day of Week Display Addon initialized')
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
        // Merge settings more carefully to avoid conflicts
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
        
        // Show loading state
        this.container.classList.add('font-loading')
        
        // Clear previous font load timeout
        if (this.fontLoadTimeout) {
            clearTimeout(this.fontLoadTimeout)
        }
        
        // Create font link element
        const existingLink = document.querySelector('link[data-custom-font]')
        if (existingLink) {
            existingLink.remove()
        }
        
        const fontLink = document.createElement('link')
        fontLink.rel = 'stylesheet'
        fontLink.href = this.settings.fontUrl
        fontLink.setAttribute('data-custom-font', 'true')
        
        fontLink.onload = () => {
            console.log('✅ Custom font loaded successfully')
            this.container.classList.remove('font-loading')
            this.container.classList.add('font-loaded')
            this.updateStyles()
        }
        
        fontLink.onerror = () => {
            console.warn('❌ Failed to load custom font, using fallback')
            this.container.classList.remove('font-loading') 
            this.container.classList.add('font-loaded')
            this.updateStyles()
        }
        
        document.head.appendChild(fontLink)
        
        // Fallback timeout
        this.fontLoadTimeout = setTimeout(() => {
            console.warn('⏰ Font load timeout, using fallback')
            this.container.classList.remove('font-loading')
            this.container.classList.add('font-loaded')
            this.updateStyles()
        }, 5000)
        
        console.log('🔤 Loading custom font:', this.settings.fontUrl)
    }
    
    updateStyles() {
        const container = this.container
        
        // Font properties
        container.style.fontFamily = this.settings.fontFamily
        container.style.fontSize = `${this.settings.fontSize}px`
        container.style.fontWeight = this.settings.fontWeight
        container.style.color = this.settings.textColor
        
        // Background
        const bgColor = this.hexToRgba(this.settings.backgroundColor, this.settings.backgroundOpacity / 100)
        container.style.backgroundColor = bgColor
        
        // Background class for styling
        if (this.settings.backgroundOpacity > 0) {
            container.classList.add('with-background')
        } else {
            container.classList.remove('with-background')
        }
        
        // Text alignment
        container.className = container.className.replace(/text-(left|center|right)/g, '')
        container.classList.add(`text-${this.settings.textAlign}`)
        
        // Text shadow
        if (this.settings.textShadow) {
            container.classList.add('with-shadow')
        } else {
            container.classList.remove('with-shadow')
        }
        
        // Language attribute
        container.setAttribute('lang', this.settings.language)
    }
    
    // No visibility toggles needed - always show day
    
    startUpdating() {
        this.updateDisplay()
        this.adjustUpdateInterval()
    }
    
    adjustUpdateInterval() {
        // Clear existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
        
        // Update every minute for day changes
        this.updateInterval = setInterval(() => {
            this.updateDisplay()
        }, 60000)
    }
    
    updateDisplay() {
        const now = new Date()
        const locale = this.settings.language
        
        try {
            // Update day of week only
            const dayName = now.toLocaleDateString(locale, { 
                weekday: this.settings.showFullName ? 'long' : 'short' 
            })
            this.dayElement.textContent = dayName
            
        } catch (error) {
            console.error('Error updating display:', error)
            // Fallback to English
            const dayName = now.toLocaleDateString('en-US', { 
                weekday: this.settings.showFullName ? 'long' : 'short' 
            })
            this.dayElement.textContent = dayName
        }
    }
    
    
    
    
    hexToRgba(hex, alpha) {
        // Remove # if present
        hex = hex.replace('#', '')
        
        // Handle both 3 and 6 character hex codes
        let r, g, b
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16)
            g = parseInt(hex[1] + hex[1], 16)
            b = parseInt(hex[2] + hex[2], 16)
        } else {
            r = parseInt(hex.slice(0, 2), 16)
            g = parseInt(hex.slice(2, 4), 16)
            b = parseInt(hex.slice(4, 6), 16)
        }
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
        
        if (this.fontLoadTimeout) {
            clearTimeout(this.fontLoadTimeout)
        }
        
        // Remove custom font
        const fontLink = document.querySelector('link[data-custom-font]')
        if (fontLink) {
            fontLink.remove()
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dayDisplay = new DayOfWeekDisplayAddon()
})