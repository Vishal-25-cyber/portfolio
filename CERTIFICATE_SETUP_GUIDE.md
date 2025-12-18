# Certificate and Event Images Setup Guide

## Step 1: Copy Certificate PDFs
Copy your certificate PDFs to the `public/certificates/` folder:

```
public/
  └── certificates/
      ├── certificate.pdf (Oracle APEX)
      ├── Full Stack Development with MERN.pdf
      └── flutter certificate.pdf
```

## Step 2: Copy Event Participation Images
Convert your certificate images to JPG format and copy them to `public/images/`:

1. **ASTRANOVA 2K25** (CIT Project Expo)
   - Save as: `public/images/astranova-cit.jpg`

2. **CODEUP'25** (Kongu Coding Club)
   - Save as: `public/images/codeup-kongu.jpg`

3. **RENAISSANCE 2K24** (Choose and Code)
   - Save as: `public/images/renaissance-kongu.jpg`

## Step 3: Directory Structure
Your folder structure should look like:

```
public/
  ├── certificates/
  │   ├── certificate.pdf
  │   ├── Full Stack Development with MERN.pdf
  │   └── flutter certificate.pdf
  └── images/
      ├── profile.jpg
      ├── astranova-cit.jpg
      ├── codeup-kongu.jpg
      └── renaissance-kongu.jpg
```

## Step 4: Converting Certificates to Images

### Option 1: Screenshot Method
1. Open each certificate PDF
2. Take a screenshot of the certificate
3. Save as JPG with the specified names

### Option 2: PDF to JPG Converter
1. Use online tools like:
   - https://www.ilovepdf.com/pdf_to_jpg
   - https://smallpdf.com/pdf-to-jpg
2. Upload your certificate PDFs
3. Download as JPG
4. Rename and place in the images folder

## Step 5: Restart the Server
After adding all files:
```bash
# Stop the server (Ctrl+C)
npm start
```

## Certificate Images Added:
- ✅ Oracle APEX Cloud Developer
- ✅ Full Stack Development with MERN
- ✅ Flutter Development
- ✅ MongoDB Certification
- ✅ Java Workshop (Brainery Spot)

## Event Participation Images Added:
- ✅ ASTRANOVA 2K25 - CIT (March 2025)
- ✅ CODEUP'25 - Kongu (April 2025)
- ✅ RENAISSANCE 2K24 - Kongu (October 2024)

## Note:
The Experience section now has three subsections:
1. **Certifications** - Shows your professional certifications
2. **Education** - Shows your B.E. degree details
3. **Technical Events & Participation** - Grid layout showing your college event participations
