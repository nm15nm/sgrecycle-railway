# Instrukcje umieszczania logo SG Recycle

## 🎯 Gdzie umieścić każde logo:

### 1. Logo główne (pełne z ikoną i tekstem)

```
📁 public/images/logos/
  └── sg-logo-full.svg        ← Tu wrzuć pierwsze logo
  └── sg-logo-full.png        ← Opcjonalnie wersja PNG
```

### 2. Logo tekstowe (tylko "SG Recycle")

```
📁 public/images/logos/
  └── sg-logo-text.svg        ← Tu wrzuć drugie logo
  └── sg-logo-text.png        ← Opcjonalnie wersja PNG
```

### 3. Logo ikonka (tylko symbol)

```
📁 public/images/logos/
  └── sg-logo-icon.svg        ← Tu wrzuć trzecie logo
  └── sg-logo-icon.png        ← Opcjonalnie wersja PNG
```

## 🔧 Dodatkowo do wygenerowania:

### Z logo-ikonki (trzecia wersja) stwórz:

```
📁 public/
  ├── favicon.ico             ← 16x16, 32x32, 48x48 px
  ├── icon-192.png           ← 192x192 px (dla PWA)
  └── icon-512.png           ← 512x512 px (dla PWA)

📁 public/icons/
  ├── icon-16.png            ← 16x16 px
  ├── icon-32.png            ← 32x32 px
  ├── icon-48.png            ← 48x48 px
  └── apple-touch-icon.png   ← 180x180 px
```

### Z logo pełnego stwórz:

```
📁 public/
  ├── og-image.jpg           ← 1200x630 px (Open Graph)
  └── twitter-image.jpg      ← 1200x600 px (Twitter Card)
```

## 📋 Kroki do wykonania:

1. **Skopiuj 3 wersje logo** do folderów zgodnie z powyższą strukturą
2. **Nazwij pliki dokładnie** jak pokazano wyżej
3. **Wygeneruj ikony** z logo-ikonki w różnych rozmiarach
4. **Stwórz obrazy social media** z logo pełnego

## 🎨 Zalecenia techniczne:

- **Format SVG**: Najlepszy dla strony web (skalowalne)
- **Format PNG**: Z przezroczystym tłem, wysokiej jakości
- **Kolory**: Używaj oryginalnych kolorów z brand guidelines
- **Rozdzielczość**: Co najmniej 300 DPI dla wydruków

## 💡 Zastosowanie w kodzie:

```tsx
// Logo główne na stronie
<Logo variant="full" size="large" animated={true} />

// Logo w header
<Logo variant="full" size="medium" />

// Logo mobile
<Logo variant="text" size="small" />

// Tylko ikonka
<Logo variant="icon" size="small" />
```

Po umieszczeniu plików logo będzie automatycznie działać w całej aplikacji!
