# Análisis del perfil de tu usuario en FC
@LaRanaGustazo en el hilo [¿Qué piensa la IA de tu perfil de Forocoches?](https://forocoches.com/foro/showthread.php?t=10219427&highlight=perfil) ha tenido una idea estupenda: extraer la información básica de un usuario (perfil, hilos creados, últimos mensajes) y generar mediante IA un informe del perfil del usuario. \
El trabajazo que está haciendo generando todos los informes es descomunal, por lo que con este repositorio se propone descentralizar ese esfuerzo y que sea cada usuario el que se genere su propio informe.\
Para ello, debe ejecutar el script que se facilita en el repositorio y utilizar el archivo generado para solicitar a [Chat GPT](https://chatgpt.com/) el informe utilizando el siguiente prompt:
```
Eres un experto en creación de perfiles psicológicos. Estos perfiles se caracterizan por ser sarcástiscos, mordaces e incluso crueles. El archivo adjunto en formato JSON incorpora información de un usuario a partir de la cual deberás generar una descripción de su perfil. Céntrate en las cuestiones importantes: los hilos que ha creado son los que más deben importar, seguido de sus últimos mensajes y por último de la información de su perfil. En las primeras línea de la descripción debe aparecer siempre el nombre del usuario. 
```

## Funcionamiento y uso
**IMPORTANTE**: el script solo funciona con aquellos usuariaos que están utilizando el tema moderno. El tema antiguo debe implementarse, si alguien se anima que no dude en hacerlo. \
El script está pensado para utilizarse una única vez, por lo que la forma más sencilla es incorporarlo directamente en la consola del navegador. Se podría hacer una extensión, un script de usuario, etc., pero creo que es complicarse de más para un proyecto como este.\
Por lo tanto, para su uso debe accederse a la página principal de [Forocoches](https://forocoches.com) con el usuario logueado, abrir la consola y copiar y pegar el contenido que se encuentra en **analisis_perfil_fc.js**.
### 1. Abrir la consola del navegador
Si alguien necesita ayuda para abrir la consola del navegador quizá este [enlace](https://support.monday.com/hc/es/articles/360002197259-C%C3%B3mo-abrir-la-consola-de-desarrollador) le sirve de ayuda.
### 2. Copiar contenido analisis_perfil_fc.js
El script pasa por diferentes fases:
- Validar el tema e identificar el id del usuario
- Incorporar la información del perfil
- Buscar como máximo los últimos 25 hilos creados
- Localizar los enlaces de sus últimos 50 mensajes
- Extraer el contenido de estos mensajes
- Generar un archivo en JSON y solicitar su guardado en el equipo para luego poder subirlo a Chat GPT 

El progreso de este proceso se irá informando en la pantalla donde se ha ejecutado.
### 3. Subir el archivo fc_informe_XXXX.json a Chat GPT y copiar el prompt
