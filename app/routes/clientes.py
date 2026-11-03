
from flask import Blueprint, render_template, request, redirect, url_for, flash

from app.services.contacto_service import ContactoService, ContactoError


clientes_bp = Blueprint('clientes', __name__)


# ==========================================
# ASUNTOS DISPONIBLES
# ==========================================

ASUNTOS = [
    'Consultas generales',
    'Productos y precios',
    'Pedidos y envíos',
    'Ventas al por mayor',
    'Convertirme en socio',
    'Otro',
]


# ==========================================
# PÁGINA PRINCIPAL
# ==========================================

@clientes_bp.route('/')
def index():
    return render_template('clientes/index.html')


# ==========================================
# PRODUCTOS
# ==========================================

@clientes_bp.route('/productos')
def productos():
    return render_template('clientes/productos.html')


# ==========================================
# CONTACTO
# ==========================================

@clientes_bp.route('/contacto', methods=['GET', 'POST'])
def contacto():

    if request.method == 'POST':

        form = request.form

        try:

            ContactoService.registrar(
                nombre=form.get('nombre', ''),
                correo=form.get('correo', ''),
                telefono=form.get('telefono', ''),
                asunto=form.get('asunto', ''),
                mensaje=form.get('mensaje', ''),
                asuntos_validos=ASUNTOS
            )

        except ContactoError as e:

            flash(str(e), 'error')

            return render_template(
                'clientes/contacto.html',
                asuntos=ASUNTOS,
                form=form
            )

        # Registro exitoso
        flash(
            '¡Mensaje enviado! Te responderemos lo antes posible.',
            'success'
        )

        return redirect(url_for('clientes.contacto'))

    # Primera carga del formulario
    return render_template(
        'clientes/contacto.html',
        asuntos=ASUNTOS,
        form={}
    )
