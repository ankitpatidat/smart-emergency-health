from flask import Blueprint
from controllers.medical_controller import (
    get_user_profile, save_user_profile, 
    get_user_medicines, add_user_medicine, update_medicine_status
)

medical_bp = Blueprint('medical', __name__)

# Profile Routes
medical_bp.route('/profile/<userId>', methods=['GET'])(get_user_profile)
medical_bp.route('/profile', methods=['POST'])(save_user_profile)

# Medicine Routes
medical_bp.route('/medicines/<userId>', methods=['GET'])(get_user_medicines)
medical_bp.route('/medicines', methods=['POST'])(add_user_medicine)
medical_bp.route('/medicines/<med_id>', methods=['PUT'])(update_medicine_status)