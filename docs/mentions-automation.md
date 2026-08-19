# Automatización de menciones de BioHubVenture

## Qué queda automatizado

`collect-public-mentions.yml` se ejecuta cada lunes a las 08:00 (hora Perú) y consulta Google News RSS para cada término de `data/mentions-watchlist.json`. Los resultados se guardan como `pending` en `media_mentions`; nunca se publican por el recolector.

`collect-agent-reach-mentions.yml` usa un runner propio de BHV. Busca en la web mediante la integración Exa que Agent Reach configura y ejecuta `agent-reach doctor --json` antes de cada corrida. Este runner es el lugar apropiado para activar fuentes adicionales, siempre con cuentas institucionales y canales que BHV haya autorizado.

## Despliegue inicial

1. Aplica las migraciones de `supabase/migrations/` en orden. La segunda carga las diez menciones iniciales verificadas ya publicadas.
2. Asigna el claim `app_metadata.role` con valor `admin` o `editor` a cada persona que revisará las menciones. Nunca uses `user_metadata` para este permiso.
3. En GitHub Actions agrega los secretos `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
4. Ejecuta manualmente el flujo **Collect public BioHub mentions** para poblar la primera cola.
5. Inicia sesión con una cuenta revisora y abre `/admin/menciones`. Revisa contexto, atribución y URL antes de aprobar.

Los visitantes solo reciben las columnas públicas y exclusivamente los registros con estado `published`. Las cargas sin Supabase mantienen los testimonios existentes como fallback.

## Activar Agent Reach en el runner de BHV

En el equipo etiquetado `self-hosted` y `bhv-agent-reach`, instala Agent Reach siguiendo sus instrucciones y confirma primero los canales disponibles con `agent-reach doctor`. El flujo extendido necesita que `mcporter` tenga configurada la búsqueda Exa. No agregues cookies ni sesiones personales al runner; usa únicamente cuentas institucionales dedicadas y los canales expresamente aprobados.

Los canales que requieren una sesión de red social no se activan por defecto. Esto evita almacenar credenciales en el repositorio y evita que una plataforma no autorizada sea monitoreada.

## Operación editorial

- **Pendiente:** hallazgo recién detectado; no es visible en la web.
- **Publicado:** aprobado por un editor; aparece en `/menciones` y entre las tres tarjetas de inicio.
- **Rechazado:** se conserva para auditoría, pero no se publica.

Antes de aprobar, valida que la mención se refiere a BHV o a una startup correcta, conserva la cita fiel y confirma que el enlace sigue disponible. Para una cita personal o una imagen, verifica además el permiso de uso.

## Ampliar el monitoreo

Edita `data/mentions-watchlist.json` al añadir una startup al portafolio. El recolector usa esas mismas entidades para clasificación y deduplicación. Si se quiere incorporar un nuevo tipo de fuente, se añade en el worker, no en el navegador.
