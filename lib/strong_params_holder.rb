module StrongParamsHolder
  def monitoring_params
    params.require(:level).permit(:device_id, :level)
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :phone, :time_zone, :password, :password_confirmation)
  end

  def device_params
    params.require(:device).permit(:serial, :model, :description,
      dimension_attributes: [:id, :x, :y, :z, :volume, :device_id, :_destroy], user_ids: [])
  end

  def user_params
    params.require(:user).permit(:name, :email, :phone, :time_zone, :password, :password_confirmation)
  end

  def setting_params
    params.require(:setting).permit(:active, :alert_level, :theme)
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :body)
  end
end
