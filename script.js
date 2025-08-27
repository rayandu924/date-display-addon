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
            textColor: '#FFFFFF',
            language: 'en-US'
        }
        
        this.setupEventListeners()
        this.setupResizeObserver()
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
    
    setupResizeObserver() {
        // Watch for container size changes
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(() => {
                console.log('📏 Container resized, adjusting text size')
                setTimeout(() => this.adjustTextSize(), 10)
            })
            this.resizeObserver.observe(this.container)
        }
        
        // Fallback for older browsers
        window.addEventListener('resize', () => {
            setTimeout(() => this.adjustTextSize(), 10)
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
        
        // Only apply configurable styles
        container.style.fontFamily = this.settings.fontFamily
        container.style.color = this.settings.textColor
        
        // Language attribute
        container.setAttribute('lang', this.settings.language)
        
        // Force text to fill all available space
        this.adjustTextSize()
    }
    
    adjustTextSize() {
        const container = this.container
        const dayElement = this.dayElement
        
        if (!dayElement.textContent) return
        
        // Start with maximum possible size
        let fontSize = Math.min(container.clientWidth, container.clientHeight)
        container.style.fontSize = fontSize + 'px'
        
        // Reduce size until text fits perfectly
        while ((dayElement.scrollWidth > container.clientWidth || 
                dayElement.scrollHeight > container.clientHeight) && 
               fontSize > 10) {
            fontSize -= 2
            container.style.fontSize = fontSize + 'px'
        }
        
        console.log('📏 Adjusted font size to:', fontSize + 'px')
    }
    
    // No visibility toggles needed - always show day
    
    startUpdating() {
        this.updateDisplay()
        // Initial size adjustment
        setTimeout(() => this.adjustTextSize(), 100)
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
                weekday: 'long' 
            })
            this.dayElement.textContent = dayName
            
            // Adjust text size after content update
            setTimeout(() => this.adjustTextSize(), 10)
            
        } catch (error) {
            console.error('Error updating display:', error)
            // Fallback to English
            const dayName = now.toLocaleDateString('en-US', { 
                weekday: 'long' 
            })
            this.dayElement.textContent = dayName
            
            // Adjust text size after content update
            setTimeout(() => this.adjustTextSize(), 10)
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
        
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
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