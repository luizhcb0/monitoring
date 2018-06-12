module StrongParamsHolder
  def monitoring_params
    params.require(:level).permit(:device_id, :serial, :package, :level, :temp, :umid, :lumin, :pressao, :batt)
    # batt = V
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :phone, :time_zone, :password, :password_confirmation)
  end

  def device_params
    params.require(:device).permit(:serial, :model,
      dimension_attributes: [:id, :x, :y, :z, :volume, :device_id, :_destroy], user_ids: [])
  end

  def user_device_params
    params.require(:user_device).permit(:description)
  end

  def user_params
    params.require(:user).permit(:name, :email, :phone, :time_zone, :password, :password_confirmation)
  end

  def setting_params
    params.require(:setting).permit(:active, :alert_level, :temperature_alert, :humidity_alert, :atm_pressure_alert, :luminosity_alert, :theme)
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :body)
  end
end
