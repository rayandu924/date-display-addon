// 📅 DATE DISPLAY ADDON - Customizable date and time display
class DateDisplayAddon {
    constructor() {
        this.container = document.getElementById('dateContainer')
        this.dayElement = document.getElementById('dayOfWeek')
        this.dateElement = document.getElementById('dateDisplay')
        this.timeElement = document.getElementById('timeDisplay')
        
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
            showDayOfWeek: true,
            showDate: true,
            showTime: false,
            timeFormat: '12',
            dateFormat: 'full',
            language: 'en-US',
            textShadow: true,
            animateSeconds: true
        }
        
        this.setupEventListeners()
        this.startUpdating()
        
        console.log('📅 Date Display Addon initialized')
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
        console.log('🔧 Updating date settings:', newSettings)
        
        const oldFontUrl = this.settings.fontUrl
        Object.assign(this.settings, newSettings)
        
        // Load new font if URL changed
        if (oldFontUrl !== this.settings.fontUrl && this.settings.fontUrl) {
            this.loadCustomFont()
        }
        
        // Update visual styles
        this.updateStyles()
        
        // Update display elements visibility
        this.updateVisibility()
        
        // Update content immediately
        this.updateDisplay()
        
        // Adjust update interval based on time display
        this.adjustUpdateInterval()
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
    
    updateVisibility() {
        // Day of week
        if (this.settings.showDayOfWeek) {
            this.dayElement.classList.remove('hidden')
        } else {
            this.dayElement.classList.add('hidden')
        }
        
        // Date
        if (this.settings.showDate) {
            this.dateElement.classList.remove('hidden')
        } else {
            this.dateElement.classList.add('hidden')
        }
        
        // Time
        if (this.settings.showTime) {
            this.timeElement.classList.remove('hidden')
            if (this.settings.animateSeconds) {
                this.timeElement.classList.add('animate-seconds')
            }
        } else {
            this.timeElement.classList.add('hidden')
            this.timeElement.classList.remove('animate-seconds')
        }
    }
    
    startUpdating() {
        this.updateDisplay()
        this.adjustUpdateInterval()
    }
    
    adjustUpdateInterval() {
        // Clear existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
        
        // Set update frequency based on what's displayed
        let intervalMs = 60000 // Default: update every minute
        
        if (this.settings.showTime) {
            intervalMs = 1000 // Update every second for time
        }
        
        this.updateInterval = setInterval(() => {
            this.updateDisplay()
        }, intervalMs)
    }
    
    updateDisplay() {
        const now = new Date()
        const locale = this.settings.language
        
        try {
            // Update day of week
            if (this.settings.showDayOfWeek) {
                const dayName = now.toLocaleDateString(locale, { weekday: 'long' })
                this.dayElement.textContent = dayName
            }
            
            // Update date
            if (this.settings.showDate) {
                this.dateElement.textContent = this.formatDate(now)
            }
            
            // Update time
            if (this.settings.showTime) {
                this.timeElement.textContent = this.formatTime(now)
            }
            
        } catch (error) {
            console.error('Error updating display:', error)
            // Fallback to English
            this.updateDisplayFallback(now)
        }
    }
    
    formatDate(date) {
        const locale = this.settings.language
        
        switch (this.settings.dateFormat) {
            case 'full':
                return date.toLocaleDateString(locale, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
                
            case 'short':
                return date.toLocaleDateString(locale, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })
                
            case 'numeric':
                return date.toLocaleDateString(locale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
                
            case 'iso':
                return date.toISOString().split('T')[0]
                
            default:
                return date.toLocaleDateString(locale)
        }
    }
    
    formatTime(date) {
        const locale = this.settings.language
        const is24Hour = this.settings.timeFormat === '24'
        
        return date.toLocaleTimeString(locale, {
            hour12: !is24Hour,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }
    
    updateDisplayFallback(date) {
        // English fallback
        if (this.settings.showDayOfWeek) {
            this.dayElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long' })
        }
        
        if (this.settings.showDate) {
            this.dateElement.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        }
        
        if (this.settings.showTime) {
            const is24Hour = this.settings.timeFormat === '24'
            this.timeElement.textContent = date.toLocaleTimeString('en-US', {
                hour12: !is24Hour,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
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
    window.dateDisplay = new DateDisplayAddon()
})