(function () {
	function isLeadForm(form) {
		return form && form.tagName === "FORM" && /^wpforms-form-(28|390)$/.test(form.id);
	}

	function getClient() {
		if (!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_PUBLISHABLE_KEY) {
			return null;
		}
		if (!window._leadFormClient) {
			window._leadFormClient = window.supabase.createClient(
				window.SUPABASE_URL,
				window.SUPABASE_PUBLISHABLE_KEY
			);
		}
		return window._leadFormClient;
	}

	function showMessage(form, text, isError) {
		var el = form.querySelector(".lead-form-message");
		if (!el) {
			el = document.createElement("div");
			el.className = "lead-form-message";
			el.style.marginTop = "12px";
			el.style.fontWeight = "bold";
			el.style.fontSize = "14px";
			form.appendChild(el);
		}
		el.textContent = text;
		el.style.color = isError ? "#c0392b" : "#2e7d32";
	}

	function fieldValue(form, index) {
		var el = form.querySelector('[name="wpforms[fields][' + index + ']"]');
		return el ? el.value.trim() : "";
	}

	function submitLead(form) {
		if (form._leadFormSubmitting) return;

		var client = getClient();
		if (!client) {
			showMessage(form, "No se pudo enviar el formulario. Intenta de nuevo mas tarde.", true);
			return;
		}

		var name = fieldValue(form, 3);
		var email = fieldValue(form, 1);
		var phone = fieldValue(form, 4);
		var message = fieldValue(form, 2);

		if (!name || !email || !phone) {
			showMessage(form, "Por favor completa los campos requeridos.", true);
			return;
		}

		var submitBtn = form.querySelector('button[type="submit"]');
		var originalText = submitBtn ? submitBtn.textContent : "";
		form._leadFormSubmitting = true;
		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.textContent = "Enviando...";
		}

		client
			.from("leads")
			.insert({
				name: name,
				email: email,
				phone: phone,
				message: message,
				source_page: window.location.pathname,
			})
			.then(function (res) {
				form._leadFormSubmitting = false;
				if (submitBtn) {
					submitBtn.disabled = false;
					submitBtn.textContent = originalText;
				}
				if (res.error) {
					showMessage(form, "Hubo un error al enviar. Intenta de nuevo.", true);
				} else {
					showMessage(form, "Gracias, tu informacion fue enviada. Nos pondremos en contacto pronto.", false);
					form.reset();
				}
			});
	}

	// WPForms binds its own click handler directly to the submit button (not
	// a "submit" listener on the form), so it must be intercepted here, in
	// the capture phase, before that handler ever runs.
	document.addEventListener(
		"click",
		function (event) {
			var btn = event.target.closest && event.target.closest('button[type="submit"], input[type="submit"]');
			if (!btn) return;
			var form = btn.closest("form");
			if (!isLeadForm(form)) return;

			event.preventDefault();
			event.stopImmediatePropagation();
			submitLead(form);
		},
		true
	);

	// Fallback for submission triggered without a button click (e.g. Enter key).
	document.addEventListener(
		"submit",
		function (event) {
			var form = event.target;
			if (!isLeadForm(form)) return;
			event.preventDefault();
			event.stopImmediatePropagation();
			submitLead(form);
		},
		true
	);
})();
