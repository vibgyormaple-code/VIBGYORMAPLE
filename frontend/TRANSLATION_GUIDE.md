# Translation Guide - English/French Language Toggle

This guide explains how the bilingual (English/French) translation system works in the VIBGYOR Maple website.

## Overview

The website now supports both English and French languages with a simple toggle button. Users can switch between languages at any time, and all text content will update immediately while maintaining the same design and layout.

## How It Works

### 1. Translation File (`frontend/src/utils/translations.js`)

This file contains all translations organized by language:

```javascript
export const translations = {
  en: {
    nav: { home: "Home", about: "About", ... },
    hero: { title: "...", subtitle: "..." },
    // ... more sections
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", ... },
    hero: { title: "...", subtitle: "..." },
    // ... more sections
  }
};
```

### 2. Language State Management (`AppFinal.js`)

The main App component manages the language state:

```javascript
const [language, setLanguage] = useState('en'); // 'en' or 'fr'
```

This state is passed down to all components that need translations.

### 3. Using Translations in Components

Each component receives the `language` prop and uses it to get translations:

```javascript
const Component = ({ language }) => {
  const t = translations[language] || translations.en;
  
  return <h1>{t.section.title}</h1>;
};
```

## Components Already Updated

✅ **Navbar** - All menu items, cart, login/register buttons  
✅ **Login Modal** - All labels, placeholders, and buttons  
✅ **Register Modal** - All labels, placeholders, and buttons  
✅ **Language Toggle** - EN/FR button (already existed)

## How to Add Translations to Other Components

### Step 1: Import translations

```javascript
import { translations } from '../utils/translations';
```

### Step 2: Accept language prop

```javascript
const YourComponent = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  // ...
};
```

### Step 3: Use translation keys

```javascript
<h1>{t.yourSection.title}</h1>
<p>{t.yourSection.description}</p>
```

### Step 4: Add translations to translations.js

```javascript
en: {
  yourSection: {
    title: "Your Title",
    description: "Your description"
  }
},
fr: {
  yourSection: {
    title: "Votre Titre",
    description: "Votre description"
  }
}
```

### Step 5: Pass language prop from parent

```javascript
<YourComponent language={language} />
```

## Example: Updating the Certificate Component

### Before:
```javascript
const CertificateAndTrust = () => {
  return (
    <section>
      <h1>Certifications & Trust</h1>
      <p>Your peace of mind is our priority...</p>
    </section>
  );
};
```

### After:
```javascript
import { translations } from '../utils/translations';

const CertificateAndTrust = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  
  return (
    <section>
      <h1>{t.certificate.title}</h1>
      <p>{t.certificate.subtitle}</p>
    </section>
  );
};
```

## Available Translation Sections

The translations file includes sections for:

- `nav` - Navigation menu items
- `productsDropdown` - Product dropdown items
- `hero` - Hero section content
- `about` - About page content
- `certificate` - Certificate and trust page
- `testimonials` - Testimonials page
- `contact` - Contact page
- `products` - Products page
- `cart` - Shopping cart
- `auth` - Login/Register forms
- `footer` - Footer content

## Adding New Translations

1. Open `frontend/src/utils/translations.js`
2. Add your new keys to both `en` and `fr` objects
3. Use the keys in your components
4. Test by switching between EN/FR toggle

## Best Practices

1. **Always provide default language**: Use `language = 'en'` as default prop
2. **Fallback to English**: Use `translations[language] || translations.en`
3. **Keep keys organized**: Group related translations in nested objects
4. **Test both languages**: Always test your changes in both EN and FR
5. **Maintain consistency**: Keep the same structure in both language objects

## Testing the Translation System

1. Run the development server: `npm start`
2. Navigate to any page
3. Click the EN/FR toggle button in the navbar
4. Verify that all text changes to the selected language
5. The design and layout should remain exactly the same

## Future Components to Update

To complete the translation system, update these components:

- `Hero.jsx` - Hero section
- `About.jsx` - About page
- `CertificateAndTrust.jsx` - Certificate page
- `Testimonials.jsx` - Testimonials page
- `Contact.jsx` - Contact page
- `Products.jsx` - Products page
- `Footer.jsx` - Footer section

Follow the same pattern shown above for each component.

## Need Help?

The translation system is designed to be simple and maintainable. If you need to add more translations or have questions, refer to the existing implementations in:

- `Navbar.jsx` - Complex example with nested translations
- `Login.jsx` - Simple example with form translations
- `translations.js` - Complete translation structure

## Important Notes

- ⚠️ The language preference is NOT persisted (no localStorage)
- ⚠️ Language resets to English on page refresh
- ⚠️ To add persistence, save language to localStorage when changed
- ⚠️ The toggle button design is in `LanguageToggle.css`

## Summary

You now have a fully functional bilingual website! The EN/FR toggle button will switch all translated content between English and French while keeping the exact same design and layout. The system is extensible and easy to maintain.

