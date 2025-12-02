# 🎬 Cómo Reemplazar Videos de Prueba por Videos Reales

## 📋 Estado Actual

Actualmente los videos en la sección **Reels** usan videos de prueba públicos de Google.

## ✅ Videos de Prueba (Actuales):

1. **Video 0**: ForBiggerBlazes.mp4
2. **Video 1**: ForBiggerEscapes.mp4
3. **Video 2**: ForBiggerFun.mp4
4. **Video 3**: ForBiggerJoyrides.mp4
5. **Video 4**: ForBiggerMeltdowns.mp4
6. **Video 5**: Sintel.mp4

## 🔄 Cómo Reemplazar con Videos Reales

### Paso 1: Obtén las URLs correctas

Pídele a tu compañero las URLs correctas de CloudFront. Deberían verse así:
```
https://tu-cloudfront-id.cloudfront.net/videos/nombre-video.mp4
```

### Paso 2: Abre `index.html`

Busca la sección de Reels (línea ~403-520)

### Paso 3: Reemplaza las URLs

**BUSCAR:**
```html
<source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
```

**REEMPLAZAR POR:**
```html
<source src="TU_URL_DE_CLOUDFRONT_AQUI.mp4" type="video/mp4">
```

### Paso 4: Repite para los 6 videos

Reemplaza cada URL de Google por la URL correcta de tus videos:

1. Video 0 (alemizzle): Línea ~413
2. Video 1 (evelin): Línea ~433
3. Video 2 (elita): Línea ~452
4. Video 3 (cumbi): Línea ~471
5. Video 4 (andylive): Línea ~490
6. Video 5 (alemizzle 2): Línea ~509

## 🎯 URLs Originales que Intentabas Usar

```
https://dvvbbrat3tqct.cloudfront.net/videos/alemizzle.mp4
https://dvvbbrat3tqct.cloudfront.net/videos/evelin.mp4
https://dvvbbrat3tqct.cloudfront.net/videos/elita.mp4
https://dvvbbrat3tqct.cloudfront.net/videos/cumbi.mp4
https://dvvbbrat3tqct.cloudfront.net/videos/andylive.mp4
```

**⚠️ IMPORTANTE:** Estas URLs NO funcionan actualmente. Verifica con tu compañero:
- ✅ La URL base correcta de CloudFront
- ✅ Los nombres exactos de los archivos
- ✅ Que los videos estén públicos o con CORS habilitado

## 🛠️ Verificar que Funcionen

Antes de cambiar todas las URLs:

1. Toma UNA URL de tu compañero
2. Pégala en el navegador
3. Si el video se descarga/reproduce → ✅ Funciona
4. Si da error → ❌ Hay que configurar CloudFront

## 💡 Ejemplo de Reemplazo

**ANTES:**
```html
<source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4">
```

**DESPUÉS:**
```html
<source src="https://d1234abc.cloudfront.net/reels/alemizzle.mp4" type="video/mp4">
```

## 📞 Preguntas para tu Compañero

1. ¿Cuál es la URL completa de CloudFront para un video?
2. ¿Los videos están en una carpeta `/videos/` o en la raíz?
3. ¿Están configurados los permisos públicos y CORS?
4. ¿Puedes compartir una URL de prueba que funcione?

---

**Nota:** Los videos de prueba funcionan perfectamente. Una vez tengas las URLs correctas, el sitio funcionará exactamente igual pero con tus videos reales! 🚀
