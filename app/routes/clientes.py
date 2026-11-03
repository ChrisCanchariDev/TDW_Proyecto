from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.services.contacto_service import ContactoService, ContactoError

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/')
def index():
    return render_template('clientes/index.html')

@clientes_bp.route('/productos')
def productos():
    return render_template('clientes/productos.html')

ASUNTOS = [
    'Consultas generales',
    'Productos y precios',
    'Pedidos y envíos',
    'Ventas al por mayor',
    'Convertirme en socio',
    'Otro',
]


@clientes_bp.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        try:
            ContactoService.registrar(
                nombre=request.form.get('nombre'),
                correo=request.form.get('correo'),
                telefono=request.form.get('telefono'),
                asunto=request.form.get('asunto') or '',
                mensaje=request.form.get('mensaje'),
                asuntos_validos=ASUNTOS,
            )
        except ContactoError as e:
            flash(str(e), 'error')
            # Se vuelve a mostrar el formulario con lo que el visitante ya escribio
            return render_template('clientes/contacto.html', asuntos=ASUNTOS, form=request.form)

        flash('¡Mensaje enviado! Te responderemos lo antes posible.', 'success')
        return redirect(url_for('clientes.contacto'))

    return render_template('clientes/contacto.html', asuntos=ASUNTOS, form={})
