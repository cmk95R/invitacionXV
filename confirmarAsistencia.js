// Guardar Confirmaciones

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("rsvpForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // ← Bloquea otros listeners

        const data = new FormData(form);
        const nombre = (data.get("name") || "").trim();
        const telefono = (data.get("phone") || "").trim();
        const mensaje = (data.get("message") || "").trim();
        const submitBtn = form.querySelector("button[type='submit']");

        // Validaciones estrictas
        if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{5,}$/.test(nombre)) {
            alert(
                "Por favor, ingresá tu nombre completo (mínimo 5 letras, sin números)."
            );
            return;
        }

        if (!/^\d{8,15}$/.test(telefono)) {
            alert("Ingresá un teléfono válido (solo números, 8 a 15 dígitos).");
            return;
        }

        if (mensaje.length > 250) {
            alert("El mensaje no debe superar los 250 caracteres.");
            return;
        }

        // ✅ Solo si todo validó, se ejecuta esta función:
        enviarFormulario(data, submitBtn);
    });

    function enviarFormulario(data, submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        fetch(
            "https://script.google.com/macros/s/AKfycbzNSBRYDEd_WaJHb4IsMwX18TjVCQaDIlMdzdTsQqu5wMntTqkcjUUt4LEVuYfspqo-/exec",
            {
                method: "POST",
                body: data,
                mode: "no-cors",
            }
        )
            .then(() => {
                document
                    .getElementById("confirmationMessage")
                    .classList.remove("hidden");
                document.getElementById("rsvpForm").classList.add("hidden");
                lanzarConfeti();
            })
            .catch(() => {
                alert("Error de conexión. Reintentá en unos segundos.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Confirmar";
                form.reset();
            });
    }

    // 🎉 Confeti (asegurate que confetti.min.js esté incluido)
    function lanzarConfeti() {
        if (typeof confetti === "function") {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
            });
        } else {
            console.warn("confetti.js no está cargado.");
        }
    }
});
