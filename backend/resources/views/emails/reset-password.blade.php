<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restablecer contraseña</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">

        {{-- Header --}}
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-0.5px;">
                habit<span style="color:#6366f1;">core</span>
              </span>
            </td>
          </tr>
        </table>

        {{-- Card --}}
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">

          {{-- Accent bar --}}
          <tr>
            <td style="background-color:#6366f1;height:4px;"></td>
          </tr>

          {{-- Body --}}
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6366f1;letter-spacing:0.05em;text-transform:uppercase;">
                Seguridad de cuenta
              </p>

              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;">
                Restablecer contraseña
              </h1>

              <p style="margin:0 0 24px;font-size:15px;color:#64748b;line-height:1.6;">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.
                Haz clic en el botón de abajo para continuar.
              </p>

              {{-- CTA Button --}}
              <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background-color:#6366f1;border-radius:10px;">
                    <a href="{{ $url }}"
                       style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.03em;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:13px;color:#94a3b8;line-height:1.6;">
                Este enlace expirará en <strong style="color:#64748b;">{{ $expiry }} minutos</strong>.
                Si no solicitaste este cambio, puedes ignorar este correo.
              </p>

              {{-- Divider --}}
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="border-top:1px solid #e2e8f0;"></td>
                </tr>
              </table>

              {{-- Fallback URL --}}
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:
              </p>
              <p style="margin:6px 0 0;font-size:12px;word-break:break-all;">
                <a href="{{ $url }}" style="color:#6366f1;text-decoration:none;">{{ $url }}</a>
              </p>

            </td>
          </tr>

          {{-- Footer --}}
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                © {{ date('Y') }} Habit Core · Este es un correo automático, no respondas a este mensaje.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
