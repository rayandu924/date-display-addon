# 📅 Day of Week Display Addon

A simple and elegant day of week display addon for MyWallpaper. Shows only the current day name (Monday, Tuesday, etc.) with custom fonts, colors, and styling options.

## ✨ Features

- **Custom Fonts** - Load any Google Fonts or web fonts via URL
- **Multilingual Support** - 9+ languages including English, French, Spanish, German, Japanese, Chinese
- **Full/Short Names** - Toggle between full (Monday) or abbreviated (Mon) day names
- **Rich Styling** - Custom colors, backgrounds, shadows, and alignment
- **Responsive Design** - Adapts beautifully to any container size
- **High Performance** - Efficient updates and memory usage
- **Simple Focus** - Displays only the day of week, nothing else

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
| **Show Full Day Name** | Toggle | Display full (Monday) vs short (Mon) | On |
| **Language** | Select | Display language | English |

## 🌍 Supported Languages

- **English** (en-US) - Sunday / Sun
- **Français** (fr-FR) - Dimanche / Dim  
- **Español** (es-ES) - Domingo / Dom
- **Deutsch** (de-DE) - Sonntag / So
- **Italiano** (it-IT) - Domenica / Dom
- **Português** (pt-PT) - Domingo / Dom
- **Русский** (ru-RU) - Воскресенье / Вс
- **日本語** (ja-JP) - 日曜日 / 日
- **中文** (zh-CN) - 星期日 / 日

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

## 📅 Day Format Examples

| Format | Example Output |
|--------|----------------|
| **Full Name** | Monday, Tuesday, Wednesday |
| **Short Name** | Mon, Tue, Wed |

## 💡 Usage Ideas

### 🖥️ Desktop Day Display
- Large font size (80-100px)
- Show full day name
- Subtle background with low opacity
- Custom font for personality

### 📱 Mobile Widget
- Medium size (36-48px) 
- Show abbreviated day name
- No background for overlay effect
- System font for consistency

### 🎨 Artistic Display
- Elegant serif font (Playfair Display)
- Show only day of week
- Centered alignment
- Text shadow for depth

### 🌍 International Setup
- Set appropriate language
- Use local date format preferences
- Consider font support for special characters

## 🔧 Technical Features

- **Font Loading** - Graceful fallbacks for font failures
- **Memory Efficient** - Smart update intervals (1m for day changes)
- **Error Handling** - Robust fallbacks for locale/format issues
- **Accessibility** - Proper contrast and screen reader support
- **Performance** - Hardware-accelerated animations
- **Cross-platform** - Works on all modern browsers and devices

## 📱 Responsive Behavior

- **Large screens** (>600px): Full size display
- **Medium screens** (400-600px): Slightly smaller fonts
- **Small screens** (<400px): Compact layout with optimized spacing

## 📝 Version History

- **2.0.0** - Simplified to day-of-week only display, fixed toggle bugs
- **1.0.0** - Initial release with full date/time options (deprecated)