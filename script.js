// 📅 DAY DISPLAY ADDON - Binary Search Algorithm
class DayDisplayAddon {
    constructor() {
        this.container = document.getElementById('dateContainer')
        this.dayElement = document.getElementById('dayOfWeek')
        
        // Default settings - Keep only font and color
        this.settings = {
            fontUrl: 'https://fonts.cdnfonts.com/css/anurati',
            fontFamily: 'Anurati, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textColor: '#FFFFFF',
            language: 'en-US'
        }
        
        // Load default font
        this.loadCustomFont()
        
        this.setupEventListeners()
        this.startUpdating()
        
        console.log('📅 Day Display Addon initialized')
    }
    
    // Binary search algorithm from the guide
    calculateOptimalFontSize() {
        if (!this.container || !this.dayElement) return
        
        const container = this.container
        const textElement = this.dayElement
        
        // Force single line as in the guide
        textElement.style.whiteSpace = "nowrap"
        textElement.style.overflow = "hidden"
        
        let testFontSize = 1000
        let minFontSize = 0.1
        let maxFontSize = 1000
        
        // Binary search to find optimal font size for single line
        while (maxFontSize - minFontSize > 1) {
            testFontSize = Math.floor((minFontSize + maxFontSize) / 2)
            textElement.style.fontSize = `${testFontSize}px`
            
            // Check if text fits in container (width and height for single line)
            if (textElement.scrollWidth <= container.clientWidth && textElement.scrollHeight <= container.clientHeight) {
                minFontSize = testFontSize
            } else {
                maxFontSize = testFontSize
            }
        }
        
        textElement.style.fontSize = `${minFontSize}px`
        console.log(`📏 Optimal font size: ${minFontSize}px`)
    }
    
    setupEventListeners() {
        // Settings updates from MyWallpaper
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'SETTINGS_UPDATE' && event.data?.settings) {
                this.updateSettings(event.data.settings)
            }
        })
        
        // Resize observer for immediate recalculation
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(() => {
                this.calculateOptimalFontSize()
            })
            this.resizeObserver.observe(this.container)
        }
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
        }
    }
    
    loadCustomFont() {
        if (!this.settings.fontUrl) return
        
        // Remove existing font
        const existingLink = document.querySelector('link[data-custom-font]')
        if (existingLink) existingLink.remove()
        
        // Create font link element
        const fontLink = document.createElement('link')
        fontLink.rel = 'stylesheet'
        fontLink.href = this.settings.fontUrl
        fontLink.setAttribute('data-custom-font', 'true')
        
        fontLink.onload = () => {
            console.log('✅ Custom font loaded')
            this.updateStyles()
            this.calculateOptimalFontSize()
        }
        
        fontLink.onerror = () => {
            console.warn('❌ Font failed to load')
            this.updateStyles()
        }
        
        document.head.appendChild(fontLink)
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
        
        // Recalculate optimal font size after text change
        setTimeout(() => this.calculateOptimalFontSize(), 50)
    }
    
    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect()
        }
        
        const fontLink = document.querySelector('link[data-custom-font]')
        if (fontLink) fontLink.remove()
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dayDisplay = new DayDisplayAddon()
})