# R157 · altura y navegación uniforme

Fuente: main 416d7658c6fb; IMG_5690/5691 y órdenes del propietario del 3 octubre 2026. Añadido: REGISTRO DE JUGADORES inmediatamente después de MANUAL DE USUARIO. Orden final del propietario: cerrar la ampliación del recorrido y actualizar hasta lo revisado.

Alcance: paneles de la app centrados dentro del espacio disponible, reservando área segura/toolbar; paneles largos comienzan debajo de los controles y conservan desplazamiento. MENÚ permanente arriba derecha; X arriba izquierda, mismo glifo ×, fuente 28 px, área táctil 44×44, misma altura. La normalización preserva ID y manejador existente. Registro sin ronda abre Menú al cerrar y conserva el borrador; con ronda vuelve a la tarjeta. Registro desde Menú usa openRegistrationPreservingActiveRound; desde otras páginas conserva navegación/returnTo existente. Administración carga la navegación común y contiene MENÚ dentro del diálogo nativo para respetar su capa superior.

Aceptación: cierre idempotente, acción original conservada, sin reiniciar ronda/scores/reloj por navegación, permiso de API intacto; menú visible también al abrir Organizador; código existente y controles de compartir mantienen el contrato R156.

Riesgos: controles ocultos por capas, margen heredado, texto X heterogéneo, panel largo fuera del viewport, cambio de botón con acción destructiva. No se normaliza la tecla X del teclado numérico, que significa borrar score. CSS común está dentro de shortcuts-ui.js, recurso offline existente; ninguna API o dato del servidor cambia.

Pruebas: banco completo scripts/build-manual-lab.mjs PASS; test-r157-uniform-navigation.mjs PASS; navegador Chromium real local 430×932, 28 casos PASS, cero pageerrors, fixtures QA explícitos. Evidencia: CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER/evidence.json y capturas auténticas. No se afirma iPhone físico, los cuatro anchos, API viva, ni 100% de la matriz de 67 estados. Ampliación detenida por orden del propietario antes de publicación. Intento de Chromium estándar falló por descarga truncada; Chromium npm oficial de paquete @sparticuz permitió completar el navegador local.

Estado: preparación para publicación autorizada por “Ya hasta ahí actualiza”; verificación pública todavía pendiente. Rollback: revertir este cambio sobre R156 416d7658c6fb, sin borrar datos, orígenes ni almacenamiento. Mantener producción, LAB y origen instalado alineados al publicar.
