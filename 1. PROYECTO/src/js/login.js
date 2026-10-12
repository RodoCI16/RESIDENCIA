/**
 * Modal Flotante Global de Inicio de Sesión y Recuperación de Contraseña
 * Hospital Mazahua
 */
(function () {
  const modalHTML = `
    <div 
      id="login-modal" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"
      role="dialog" 
      aria-modal="true"
    >
      <div 
        id="login-card" 
        class="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-7 sm:p-9 transform scale-95 opacity-0 transition-all duration-300 relative text-slate-900 dark:text-slate-100 min-h-[460px] flex flex-col justify-between"
      >
        <!-- Botón de Cerrar Modal -->
        <button 
          id="btn-close-login" 
          type="button" 
          class="absolute top-5 right-5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- ================= VISTA 1: INICIO DE SESIÓN ================= -->
        <div id="view-login" class="w-full transition-opacity duration-200">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-[#164e63] dark:text-cyan-400 mb-3 shadow-inner">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Iniciar sesión</h3>
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">Ingresa con tus credenciales</p>
          </div>

          <div id="login-alert" class="hidden mb-4 p-3 rounded-xl text-xs font-medium border text-center transition-all"></div>

          <form id="login-form" class="space-y-4">
            <div>
              <label for="login-email" class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Usuario</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  id="login-email" 
                  required 
                  placeholder="correo@hospitalmazahua.com" 
                  autocomplete="email"
                  class="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label for="login-password" class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Contraseña</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </span>
                <input 
                  type="password" 
                  id="login-password" 
                  required 
                  placeholder="••••••••" 
                  autocomplete="current-password"
                  class="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all"
                />
                <button 
                  id="btn-toggle-password" 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-600 hover:text-cyan-800 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  tabindex="-1"
                >
                  <svg id="icon-eye-closed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                  </svg>
                  <svg id="icon-eye-open" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="text-right pt-0.5">
              <a 
                href="#" 
                id="link-forgot-password" 
                class="text-xs font-bold text-cyan-800 dark:text-cyan-400 hover:text-cyan-950 dark:hover:text-cyan-300 hover:underline transition-colors"
              >
                Olvidé mi contraseña
              </a>
            </div>

            <div class="pt-2">
              <button 
                id="btn-submit-login" 
                type="submit" 
                class="w-full flex items-center justify-center bg-[#164e63] hover:bg-[#0e3645] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Ingresar</span>
              </button>
            </div>
          </form>
        </div>

        <!-- ================= VISTA 2: INGRESAR USUARIO ================= -->
        <div id="view-forgot-email" class="hidden w-full transition-opacity duration-200">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-3 shadow-inner">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Recuperación de contraseña</h3>
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">Ingresa tu usuario para recuperar tu contraseña</p>
          </div>

          <div id="forgot-alert" class="hidden mb-4 p-3 rounded-xl text-xs font-medium border text-center transition-all"></div>

          <form id="form-forgot-email" class="space-y-4">
            <div>
              <label for="recovery-email" class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Usuario (Correo)</label>
              <input 
                type="email" 
                id="recovery-email" 
                required 
                placeholder="ejemplo@hospitalmazahua.com" 
                class="w-full px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
              />
            </div>

            <div class="pt-2">
              <button 
                id="btn-submit-forgot" 
                type="submit" 
                class="w-full flex items-center justify-center bg-[#164e63] hover:bg-[#0e3645] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Continuar</span>
              </button>
            </div>

            <div class="text-center pt-2">
              <button id="btn-back-to-login-1" type="button" class="text-xs font-bold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white cursor-pointer">
                ← Volver al inicio de sesión
              </button>
            </div>
          </form>
        </div>

        <!-- ================= VISTA 3: VALIDAR CÓDIGO (1 MINUTO) ================= -->
        <div id="view-verify-code" class="hidden w-full transition-opacity duration-200">
          <div class="text-center mb-5">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-[#164e63] dark:text-cyan-400 mb-3 shadow-inner">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-black tracking-tight text-slate-950 dark:text-white">Código de verificación</h3>
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
              Se te mandó un código de 6 dígitos a tu correo proporcionado para poder recuperar tu contraseña.
            </p>
          </div>

          <div id="verify-alert" class="hidden mb-4 p-3 rounded-xl text-xs font-medium border text-center transition-all"></div>

          <form id="form-verify-code" class="space-y-4">
            <div>
              <input 
                type="text" 
                id="recovery-code" 
                required 
                maxlength="6" 
                placeholder="000000" 
                class="w-full text-center tracking-[0.5em] font-mono font-bold text-2xl py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
              />
            </div>

            <!-- Cronómetro de 1 minuto -->
            <div class="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <svg class="w-4 h-4 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>El código vence en: <strong id="timer-display" class="text-red-600 dark:text-red-400 font-bold">01:00</strong></span>
            </div>

            <div class="pt-2">
              <button 
                id="btn-submit-code" 
                type="submit" 
                class="w-full flex items-center justify-center bg-[#164e63] hover:bg-[#0e3645] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Validar código</span>
              </button>
            </div>

            <div class="text-center pt-2">
              <button id="btn-resend-code" type="button" class="text-xs font-bold text-cyan-800 dark:text-cyan-400 hover:underline cursor-pointer">
                Reenviar código
              </button>
            </div>
          </form>
        </div>

        <!-- ================= VISTA 4: NUEVA CONTRASEÑA CON OJITOS ================= -->
        <div id="view-new-password" class="hidden w-full transition-opacity duration-200">
          <div class="text-center mb-5">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-3 shadow-inner">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-black tracking-tight text-slate-950 dark:text-white">Ingresa tu nueva contraseña</h3>
            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">Obligatorio: Mínimo 8 caracteres (letras, números o signos)</p>
          </div>

          <div id="password-alert" class="hidden mb-4 p-3 rounded-xl text-xs font-medium border text-center transition-all"></div>

          <form id="form-new-password" class="space-y-4">
            <!-- Campo 1: Nueva Contraseña con Ojito -->
            <div>
              <label for="new-pass" class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Nueva Contraseña</label>
              <div class="relative">
                <input 
                  type="password" 
                  id="new-pass" 
                  required 
                  minlength="8" 
                  placeholder="Mínimo 8 caracteres" 
                  class="w-full pl-4 pr-11 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <button 
                  id="btn-toggle-new-pass" 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-600 hover:text-cyan-800 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  tabindex="-1"
                  title="Mostrar u ocultar contraseña"
                >
                  <svg id="icon-new-pass-closed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                  </svg>
                  <svg id="icon-new-pass-open" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Campo 2: Confirmar Contraseña con Ojito -->
            <div>
              <label for="confirm-pass" class="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Confirmar Contraseña</label>
              <div class="relative">
                <input 
                  type="password" 
                  id="confirm-pass" 
                  required 
                  minlength="8" 
                  placeholder="Repite tu nueva contraseña" 
                  class="w-full pl-4 pr-11 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <button 
                  id="btn-toggle-confirm-pass" 
                  type="button" 
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-600 hover:text-cyan-800 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                  tabindex="-1"
                  title="Mostrar u ocultar contraseña"
                >
                  <svg id="icon-confirm-pass-closed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                  </svg>
                  <svg id="icon-confirm-pass-open" class="w-4 h-4 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="pt-2">
              <button 
                id="btn-submit-password" 
                type="submit" 
                class="w-full flex items-center justify-center bg-[#164e63] hover:bg-[#0e3645] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Actualizar contraseña</span>
              </button>
            </div>
          </form>
        </div>

        <!-- ================= ANIMACIÓN DE ÉXITO (PALOMITA) ================= -->
        <div id="view-success" class="hidden w-full flex-col items-center justify-center py-8 text-center">
          <div class="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-4 border-emerald-500 flex items-center justify-center mb-4 transform scale-0 transition-transform duration-500" id="success-checkmark">
            <svg class="w-10 h-10 text-emerald-600 dark:text-emerald-400 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-black text-slate-950 dark:text-white">¡Contraseña Actualizada!</h3>
          <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">Redirigiéndote al inicio de sesión...</p>
        </div>

      </div>
    </div>
  `;

  const initLogin = () => {
    if (document.getElementById('login-modal')) return;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('login-modal');
    const card = document.getElementById('login-card');
    const btnClose = document.getElementById('btn-close-login');

    const viewLogin = document.getElementById('view-login');
    const viewForgotEmail = document.getElementById('view-forgot-email');
    const viewVerifyCode = document.getElementById('view-verify-code');
    const viewNewPassword = document.getElementById('view-new-password');
    const viewSuccess = document.getElementById('view-success');

    // Elementos Login
    const formLogin = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const togglePasswordBtn = document.getElementById('btn-toggle-password');
    const iconEyeClosed = document.getElementById('icon-eye-closed');
    const iconEyeOpen = document.getElementById('icon-eye-open');
    const loginAlert = document.getElementById('login-alert');
    const btnSubmitLogin = document.getElementById('btn-submit-login');
    const linkForgot = document.getElementById('link-forgot-password');

    // Elementos Olvidé Contraseña
    const formForgotEmail = document.getElementById('form-forgot-email');
    const recoveryEmail = document.getElementById('recovery-email');
    const forgotAlert = document.getElementById('forgot-alert');
    const btnSubmitForgot = document.getElementById('btn-submit-forgot');
    const btnBackToLogin1 = document.getElementById('btn-back-to-login-1');

    // Elementos Validar Código
    const formVerifyCode = document.getElementById('form-verify-code');
    const recoveryCode = document.getElementById('recovery-code');
    const verifyAlert = document.getElementById('verify-alert');
    const btnSubmitCode = document.getElementById('btn-submit-code');
    const timerDisplay = document.getElementById('timer-display');
    const btnResendCode = document.getElementById('btn-resend-code');

    // Elementos Nueva Contraseña
    const formNewPassword = document.getElementById('form-new-password');
    const newPass = document.getElementById('new-pass');
    const confirmPass = document.getElementById('confirm-pass');
    const btnToggleNewPass = document.getElementById('btn-toggle-new-pass');
    const iconNewPassClosed = document.getElementById('icon-new-pass-closed');
    const iconNewPassOpen = document.getElementById('icon-new-pass-open');
    const btnToggleConfirmPass = document.getElementById('btn-toggle-confirm-pass');
    const iconConfirmPassClosed = document.getElementById('icon-confirm-pass-closed');
    const iconConfirmPassOpen = document.getElementById('icon-confirm-pass-open');
    const passwordAlert = document.getElementById('password-alert');
    const btnSubmitPassword = document.getElementById('btn-submit-password');
    const successCheckmark = document.getElementById('success-checkmark');

    let activeRecoveryEmail = '';
    let validatedRecoveryCode = '';
    let countdownInterval = null;

    const switchView = (targetView) => {
      [viewLogin, viewForgotEmail, viewVerifyCode, viewNewPassword, viewSuccess].forEach(v => {
        if (v) v.classList.add('hidden');
      });
      if (targetView) {
        targetView.classList.remove('hidden');
        if (targetView === viewSuccess) targetView.classList.add('flex');
      }
    };

    const showAlert = (box, msg, type = 'error') => {
      if (!box) return;
      box.textContent = msg;
      box.className = type === 'error'
        ? 'block mb-4 p-3 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-center'
        : 'block mb-4 p-3 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-center';
    };

    const clearAlert = (box) => {
      if (!box) return;
      box.className = 'hidden';
      box.textContent = '';
    };

    // Temporizador exclusivo para el código
    const startTimer = (seconds = 60) => {
      clearInterval(countdownInterval);
      let timeLeft = seconds;
      btnSubmitCode.disabled = false;
      recoveryCode.disabled = false;

      const updateUI = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      };

      updateUI();
      countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          timerDisplay.textContent = '00:00 (Vencido)';
          btnSubmitCode.disabled = true;
          recoveryCode.disabled = true;
          showAlert(verifyAlert, 'El código ha vencido. Solicita uno nuevo para continuar.');
        } else {
          updateUI();
        }
      }, 1000);
    };

    // Reseteo general
    const resetAllForms = () => {
      clearInterval(countdownInterval);
      formLogin?.reset();
      formForgotEmail?.reset();
      formVerifyCode?.reset();
      formNewPassword?.reset();

      // Devolver inputs de tipo password a su estado oculto original
      if (loginPassword) loginPassword.type = 'password';
      iconEyeClosed?.classList.remove('hidden');
      iconEyeOpen?.classList.add('hidden');

      if (newPass) newPass.type = 'password';
      iconNewPassClosed?.classList.remove('hidden');
      iconNewPassOpen?.classList.add('hidden');

      if (confirmPass) confirmPass.type = 'password';
      iconConfirmPassClosed?.classList.remove('hidden');
      iconConfirmPassOpen?.classList.add('hidden');

      [loginAlert, forgotAlert, verifyAlert, passwordAlert].forEach(clearAlert);

      btnSubmitLogin.disabled = false;
      btnSubmitLogin.innerHTML = '<span>Ingresar</span>';
      btnSubmitForgot.disabled = false;
      btnSubmitForgot.innerHTML = '<span>Continuar</span>';
      btnSubmitCode.disabled = false;
      btnSubmitCode.innerHTML = '<span>Validar código</span>';
      btnSubmitPassword.disabled = false;
      btnSubmitPassword.innerHTML = '<span>Actualizar contraseña</span>';
      recoveryCode.disabled = false;

      activeRecoveryEmail = '';
      validatedRecoveryCode = '';
      switchView(viewLogin);
    };

    window.openLoginModal = () => {
      if (!modal || !card) return;
      resetAllForms();
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      card.classList.remove('scale-95', 'opacity-0');
      card.classList.add('scale-100', 'opacity-100');
      setTimeout(() => loginEmail?.focus(), 150);
    };

    window.closeLoginModal = () => {
      if (!modal || !card) return;
      card.classList.remove('scale-100', 'opacity-100');
      card.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        resetAllForms();
      }, 200);
    };

    btnClose?.addEventListener('click', window.closeLoginModal);

    // Ojito 1: Login
    togglePasswordBtn?.addEventListener('click', () => {
      const isPass = loginPassword.type === 'password';
      loginPassword.type = isPass ? 'text' : 'password';
      iconEyeClosed.classList.toggle('hidden', isPass);
      iconEyeOpen.classList.toggle('hidden', !isPass);
    });

    // Ojito 2: Nueva Contraseña
    btnToggleNewPass?.addEventListener('click', () => {
      const isPass = newPass.type === 'password';
      newPass.type = isPass ? 'text' : 'password';
      iconNewPassClosed.classList.toggle('hidden', isPass);
      iconNewPassOpen.classList.toggle('hidden', !isPass);
    });

    // Ojito 3: Confirmar Contraseña
    btnToggleConfirmPass?.addEventListener('click', () => {
      const isPass = confirmPass.type === 'password';
      confirmPass.type = isPass ? 'text' : 'password';
      iconConfirmPassClosed.classList.toggle('hidden', isPass);
      iconConfirmPassOpen.classList.toggle('hidden', !isPass);
    });

    // Conectar botones con atributo o título
    document.querySelectorAll('button[title="Iniciar sesión"], button[title="Perfil"], [data-login-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openLoginModal();
      });
    });

    // 1. Submit Login
    formLogin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert(loginAlert);
      btnSubmitLogin.disabled = true;
      btnSubmitLogin.innerHTML = '<span>Verificando...</span>';

      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: loginEmail.value.trim(), contrasena: loginPassword.value })
        });
        const data = await res.json();

        if (res.ok) {
          sessionStorage.setItem('usuario_hmazahua', JSON.stringify(data.usuario));
          showAlert(loginAlert, 'Acceso concedido. Redirigiendo...', 'success');
          setTimeout(() => { window.location.href = 'medicamentos.html'; }, 600);
        } else {
          showAlert(loginAlert, data.error || 'Credenciales incorrectas.');
          btnSubmitLogin.disabled = false;
          btnSubmitLogin.innerHTML = '<span>Ingresar</span>';
        }
      } catch {
        showAlert(loginAlert, 'No se pudo conectar con el servidor.');
        btnSubmitLogin.disabled = false;
        btnSubmitLogin.innerHTML = '<span>Ingresar</span>';
      }
    });

    linkForgot?.addEventListener('click', (e) => {
      e.preventDefault();
      clearAlert(forgotAlert);
      switchView(viewForgotEmail);
      setTimeout(() => recoveryEmail?.focus(), 150);
    });

    btnBackToLogin1?.addEventListener('click', () => {
      resetAllForms();
      switchView(viewLogin);
    });

    // 2. Submit Email Recuperación
    formForgotEmail?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert(forgotAlert);
      activeRecoveryEmail = recoveryEmail.value.trim();

      btnSubmitForgot.disabled = true;
      btnSubmitForgot.innerHTML = '<span>Buscando...</span>';

      try {
        await new Promise(r => setTimeout(r, 1200));

        const res = await fetch('http://localhost:3000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: activeRecoveryEmail })
        });
        const data = await res.json();

        if (res.ok) {
          clearAlert(verifyAlert);
          switchView(viewVerifyCode);
          if (recoveryCode) {
            recoveryCode.value = '';
            recoveryCode.disabled = false;
          }
          startTimer(60);
          setTimeout(() => recoveryCode?.focus(), 150);
        } else {
          showAlert(forgotAlert, data.error || 'Usuario no encontrado.');
        }
      } catch {
        showAlert(forgotAlert, 'Error de conexión con el servidor.');
      } finally {
        btnSubmitForgot.disabled = false;
        btnSubmitForgot.innerHTML = '<span>Continuar</span>';
      }
    });

    // Reenviar Código (Limpia el código anterior y devuelve el foco)
    btnResendCode?.addEventListener('click', async () => {
      clearAlert(verifyAlert);
      btnResendCode.disabled = true;
      btnResendCode.textContent = 'Enviando...';

      try {
        const res = await fetch('http://localhost:3000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: activeRecoveryEmail })
        });
        if (res.ok) {
          if (recoveryCode) {
            recoveryCode.value = '';
            recoveryCode.disabled = false;
            recoveryCode.focus();
          }
          showAlert(verifyAlert, 'Nuevo código enviado con éxito.', 'success');
          startTimer(60);
        } else {
          showAlert(verifyAlert, 'No se pudo reenviar el código.');
        }
      } catch {
        showAlert(verifyAlert, 'Error de conexión.');
      } finally {
        btnResendCode.disabled = false;
        btnResendCode.textContent = 'Reenviar código';
      }
    });

    // 3. Submit Validar Código
    formVerifyCode?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert(verifyAlert);
      const code = recoveryCode.value.trim();

      if (code.length !== 6) {
        return showAlert(verifyAlert, 'El código debe tener exactamente 6 dígitos.');
      }

      btnSubmitCode.disabled = true;
      btnSubmitCode.innerHTML = '<span>Verificando...</span>';

      try {
        const res = await fetch('http://localhost:3000/api/auth/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: activeRecoveryEmail, code })
        });
        const data = await res.json();

        if (res.ok) {
          clearInterval(countdownInterval);
          validatedRecoveryCode = code;

          clearAlert(passwordAlert);
          switchView(viewNewPassword);
          setTimeout(() => newPass?.focus(), 150);
        } else {
          showAlert(verifyAlert, data.error || 'Código incorrecto o vencido.');
        }
      } catch {
        showAlert(verifyAlert, 'Error de conexión con el servidor.');
      } finally {
        btnSubmitCode.disabled = false;
        btnSubmitCode.innerHTML = '<span>Validar código</span>';
      }
    });

    // 4. Submit Actualizar Contraseña
    formNewPassword?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAlert(passwordAlert);

      const p1 = newPass.value;
      const p2 = confirmPass.value;

      if (p1.length < 8) {
        return showAlert(passwordAlert, 'La contraseña debe tener al menos 8 dígitos/caracteres.');
      }

      if (p1 !== p2) {
        return showAlert(passwordAlert, 'Las contraseñas no coinciden. Verifícalas.');
      }

      btnSubmitPassword.disabled = true;
      btnSubmitPassword.innerHTML = '<span>Actualizando...</span>';

      try {
        const res = await fetch('http://localhost:3000/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            correo: activeRecoveryEmail,
            code: validatedRecoveryCode,
            nuevaContrasena: p1
          })
        });
        const data = await res.json();

        if (res.ok) {
          switchView(viewSuccess);
          setTimeout(() => {
            if (successCheckmark) {
              successCheckmark.classList.remove('scale-0');
              successCheckmark.classList.add('scale-100');
            }
          }, 50);

          setTimeout(() => {
            resetAllForms();
            switchView(viewLogin);
            showAlert(loginAlert, 'Contraseña actualizada. Inicia sesión con tus nuevos datos.', 'success');
          }, 2200);
        } else {
          showAlert(passwordAlert, data.error || 'Error al actualizar contraseña.');
          btnSubmitPassword.disabled = false;
          btnSubmitPassword.innerHTML = '<span>Actualizar contraseña</span>';
        }
      } catch {
        showAlert(passwordAlert, 'Error de conexión con el servidor.');
        btnSubmitPassword.disabled = false;
        btnSubmitPassword.innerHTML = '<span>Actualizar contraseña</span>';
      }
    });

    window.addEventListener('pageshow', () => {
      window.closeLoginModal();
      resetAllForms();
    });
  };

  document.addEventListener('DOMContentLoaded', initLogin);
  window.addEventListener('page:loaded', initLogin);
})();