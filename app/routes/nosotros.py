from flask import Blueprint, render_template, redirect, url_for

# Cada subsección de "Nosotros" tiene su propia URL:
#   /nosotros/quienes-somos, /nosotros/vision-y-mision, /nosotros/valores,
#   /nosotros/equipo, /nosotros/noticias
nosotros_bp = Blueprint('nosotros', __name__, url_prefix='/nosotros')


@nosotros_bp.route('/')
def inicio():
    return redirect(url_for('nosotros.quienes_somos'))


@nosotros_bp.route('/quienes-somos')
def quienes_somos():
    return render_template('clientes/quienes_somos.html')


@nosotros_bp.route('/vision-y-mision')
def vision_mision():
    return render_template('clientes/vision_mision.html')


@nosotros_bp.route('/valores')
def valores():
    return render_template('clientes/valores.html')


@nosotros_bp.route('/equipo')
def equipo():
    return render_template('clientes/equipo.html')


@nosotros_bp.route('/noticias')
def noticias():
    return render_template('clientes/noticias.html')
