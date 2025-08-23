# 📅 Date Display Addon

A beautiful and highly customizable date display addon for MyWallpaper. Show the day of the week, date, and time with custom fonts, colors, and styling options.

## ✨ Features

- **Custom Fonts** - Load any Google Fonts or web fonts via URL
- **Multilingual Support** - 9+ languages including English, French, Spanish, German, Japanese, Chinese
- **Flexible Display** - Show/hide day of week, date, and time independently  
- **Multiple Formats** - Various date and time format options
- **Rich Styling** - Custom colors, backgrounds, shadows, and alignment
- **Responsive Design** - Adapts beautifully to any container size
- **Smooth Animations** - Optional animated seconds and transitions
- **High Performance** - Efficient updates and memory usage

## ⚙️ Configuration Options

### 🎨 Appearance
| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| **Font URL** | URL | Google Fonts or custom font URL | System font |
| **Font Family** | Text | Font family name | System default |
| **Font Size** | Range | Text size (12-120px) | 48px |
| **Font Weight** | Select | Light/Normal/Bold/etc. | Semi Bold |
| **Text Color** | Color | Color of all text | #FFFFFF |
| **Background Color** | Color | Background color | #000000 |
| **Background Opacity** | Range | Background transparency (0-100%) | 0% |
| **Text Alignment** | Select | Left/Center/Right | Center |
| **Text Shadow** | Checkbox | Add shadow for readability | On |

### 📋 Display Options  
| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| **Show Day of Week** | Checkbox | Display day name (Monday, etc.) | On |
| **Show Date** | Checkbox | Display full date | On |
| **Show Time** | Checkbox | Display current time | Off |
| **Time Format** | Select | 12-hour or 24-hour format | 12-hour |
| **Date Format** | Select | Full/Short/Numeric/ISO formats | Full |
| **Language** | Select | Display language | English |
| **Animate Seconds** | Checkbox | Smooth seconds animation | On |

## 🌍 Supported Languages

- **English** (en-US) - Sunday, January 15, 2024
- **Français** (fr-FR) - Dimanche, 15 janvier 2024  
- **Español** (es-ES) - Domingo, 15 de enero de 2024
- **Deutsch** (de-DE) - Sonntag, 15. Januar 2024
- **Italiano** (it-IT) - Domenica, 15 gennaio 2024
- **Português** (pt-PT) - Domingo, 15 de janeiro de 2024
- **Русский** (ru-RU) - Воскресенье, 15 января 2024 г.
- **日本語** (ja-JP) - 2024年1月15日日曜日
- **中文** (zh-CN) - 2024年1月15日星期日

## 🎨 Font Examples

### Google Fonts URLs
```
Roboto: 
https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap

Poppins:
https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap

Playfair Display:
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap

Fira Code (monospace):
https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap
```

### Setting Font Family Names
- Roboto → `"Roboto", sans-serif`
- Poppins → `"Poppins", sans-serif`  
- Playfair Display → `"Playfair Display", serif`
- Fira Code → `"Fira Code", monospace`

## 📅 Date Format Examples

| Format | Example Output |
|--------|----------------|
| **Full** | January 15, 2024 |
| **Short** | Jan 15, 2024 |
| **Numeric** | 01/15/2024 |
| **ISO** | 2024-01-15 |

## 🕐 Time Format Examples

| Format | Example Output |
|--------|----------------|
| **12-hour** | 3:30:45 PM |
| **24-hour** | 15:30:45 |

## 💡 Usage Ideas

### 🖥️ Desktop Clock
- Large font size (80-100px)
- Show time + date
- Subtle background with low opacity
- Custom font for personality

### 📱 Mobile Widget
- Medium size (36-48px) 
- Show day of week + date
- No background for overlay effect
- System font for consistency

### 🎨 Artistic Display
- Elegant serif font (Playfair Display)
- Show only day of week and date
- Centered alignment
- Text shadow for depth

### 🌍 International Setup
- Set appropriate language
- Use local date format preferences
- Consider font support for special characters

## 🔧 Technical Features

- **Font Loading** - Graceful fallbacks for font failures
- **Memory Efficient** - Smart update intervals (1s for time, 1m for date-only)
- **Error Handling** - Robust fallbacks for locale/format issues
- **Accessibility** - Proper contrast and screen reader support
- **Performance** - Hardware-accelerated animations
- **Cross-platform** - Works on all modern browsers and devices

## 📱 Responsive Behavior

- **Large screens** (>600px): Full size display
- **Medium screens** (400-600px): Slightly smaller fonts
- **Small screens** (<400px): Compact layout with optimized spacing

## 📝 Version History

- **1.0.0** - Initial release with full customization options