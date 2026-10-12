// server/server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Almacén en memoria de códigos temporales { correo: { code, expiresAt, verificado } }
const recoveryCodes = new Map();

// Transporte SMTP con Gmail (IPv4 forzado para evitar ENETUNREACH)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

// ==========================================
// 1. ENDPOINT: LOGIN
// ==========================================
app.post('/api/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Por favor, proporciona correo y contraseña.' });
  }

  try {
    const result = await pool.query(
      'SELECT id, nombre, correo, contrasena, rol, activo FROM usuarios WHERE correo = $1',
      [correo.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas (usuario no encontrado).' });
    }

    const usuario = result.rows[0];

    if (!usuario.activo) {
      return res.status(403).json({ error: 'Usuario inactivo. Contacte al administrador.' });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales inválidas (contraseña incorrecta).' });
    }

    res.json({
      mensaje: 'Acceso exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error('Error en /api/login:', err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==========================================
// 2. ENDPOINT: SOLICITAR CÓDIGO POR CORREO
// ==========================================
app.post('/api/auth/forgot-password', async (req, res) => {
  const { correo } = req.body;
  if (!correo) return res.status(400).json({ error: 'Proporciona un correo.' });

  const cleanEmail = correo.trim().toLowerCase();

  try {
    const userRes = await pool.query(
      'SELECT id, nombre, correo FROM usuarios WHERE LOWER(correo) = $1',
      [cleanEmail]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'No existe ningún usuario registrado con ese correo.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 60 * 1000; // 1 minuto de vigencia para ingresarlo

    // Guardar en Map con flag de verificado en false
    recoveryCodes.set(cleanEmail, { code, expiresAt, verificado: false });

    console.log(`\n========================================`);
    console.log(`[CÓDIGO GENERADO PARA ${cleanEmail}]: ${code}`);
    console.log(`========================================\n`);

    await transporter.sendMail({
      from: `"Hospital Mazahua" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: 'Código de Recuperación de Contraseña - Hospital Mazahua',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #164e63; text-align: center;">Hospital Mazahua</h2>
          <p>Hola, <b>${userRes.rows[0].nombre}</b>.</p>
          <p>Has solicitado restablecer tu contraseña. Tu código de verificación es:</p>
          <div style="text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; letter-spacing: 6px; font-weight: bold; background: #e0f2fe; color: #0369a1; padding: 10px 20px; border-radius: 8px;">${code}</span>
          </div>
          <p style="color: #e11d48; font-size: 13px; text-align: center;">
            Este código vence en <b>1 minuto</b>. Si no lo solicitaste, ignora este mensaje.
          </p>
        </div>
      `,
    });

    res.json({ mensaje: 'Código enviado correctamente.' });
  } catch (err) {
    console.error('Error enviando código:', err);
    res.status(500).json({ error: 'No se pudo enviar el correo de recuperación.' });
  }
});

// ==========================================
// 3. ENDPOINT: VERIFICAR CÓDIGO (1 MINUTO)
// ==========================================
app.post('/api/auth/verify-code', (req, res) => {
  const { correo, code } = req.body;
  if (!correo || !code) return res.status(400).json({ error: 'Faltan datos de verificación.' });

  const cleanEmail = correo.trim().toLowerCase();
  const registro = recoveryCodes.get(cleanEmail);

  if (!registro) {
    return res.status(400).json({ error: 'No hay ninguna solicitud activa o el código no existe.' });
  }

  // Comprobar si ya pasó el minuto
  if (Date.now() > registro.expiresAt) {
    recoveryCodes.delete(cleanEmail);
    return res.status(400).json({ error: 'El código ha vencido. Solicita uno nuevo.' });
  }

  if (registro.code !== code.toString().trim()) {
    return res.status(400).json({ error: 'El código ingresado es incorrecto.' });
  }

  // Marcar como verificado: a partir de aquí el usuario tiene tiempo libre para teclear la nueva contraseña
  registro.verificado = true;
  recoveryCodes.set(cleanEmail, registro);

  console.log(`-> Código verificado con éxito para: ${cleanEmail}`);
  res.json({ mensaje: 'Código verificado con éxito.' });
});

// ==========================================
// 4. ENDPOINT: ACTUALIZAR CONTRASEÑA
// ==========================================
app.post('/api/auth/reset-password', async (req, res) => {
  const { correo, code, nuevaContrasena } = req.body;

  if (!nuevaContrasena || nuevaContrasena.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
  }

  const cleanEmail = (correo || '').trim().toLowerCase();
  const registro = recoveryCodes.get(cleanEmail);

  // Validar autorización previa
  if (!registro || !registro.verificado || registro.code !== (code || '').toString().trim()) {
    return res.status(403).json({ error: 'No autorizado. Valida el código de verificación nuevamente.' });
  }

  try {
    const updateResult = await pool.query(
      'UPDATE usuarios SET contrasena = $1 WHERE LOWER(correo) = $2 RETURNING id',
      [nuevaContrasena, cleanEmail]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario en el sistema.' });
    }

    // Código consumido, eliminar del mapa
    recoveryCodes.delete(cleanEmail);

    console.log(`-> Contraseña actualizada exitosamente para: ${cleanEmail}`);
    res.json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({ error: 'Error en la base de datos al guardar la contraseña.' });
  }
});

// app.listen siempre al final del archivo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});