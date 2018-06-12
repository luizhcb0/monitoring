class DefaultMailer < ApplicationMailer
  default from: '"LCA Systems" <atendimento@lcasystems.com.br>'

  after_action :set_last_critical_level, only: :alert_email
  after_action :set_last_critical_weather, only: :weather_alert_email

  def alert_email(user_device, level)
    @user_device = user_device
    @user = user_device.user
    @device = user_device.device
    @level = level
    @percentage = level.percentage
    @created_at = level.created_at
    @last_cl = user_device.last_critical_level
    mail(to: @user.email, subject: 'Alerta')
  end

  def normal_email(user_device, level)
    @user_device = user_device
    @user = user_device.user
    @device = user_device.device
    @level = level
    @percentage = level.percentage
    @created_at = level.created_at
    @last_cl = user_device.last_critical_level
    @tbcn = level.created_at.to_i - @last_cl.to_i

    if @tbcn < 60
      @text = "O reservatório levou #{@tbcn} segundo(s) para reestabelecer as condições normais."
    elsif @tbcn >= 60 && @tbcn < 3600
      @text = "O reservatório levou #{(@tbcn/60).round} minuto(s) para reestabelecer as condições normais."
    elsif @tbcn >= 3600 && @tbcn < 86400
      @text = "O reservatório levou aproximadamente #{(@tbcn/3600).round} hora(s) para reestabelecer as condições normais."
    elsif @tbcn >= 86400
      @text = "O reservatório levou aproximadamente #{(@tbcn/86400).round} dia(s) para reestabelecer as condições normais."
    end

    mail(to: @user.email, subject: 'Condições normalizadas')
  end

  def contact_email(contact)
    @contact = contact
    mail(to: "atendimento@lcasystems.com.br", from: "#{contact.name} <#{contact.email}>", subject: contact.subject)
  end

  def weather_alert_email(user_device, weather, alert_type)
    @alert_type = alert_type
    @user_device = user_device
    @user = user_device.user
    @device = user_device.device
    @weather = weather
    @created_at = weather.created_at
    case @alert_type
      when "temperature"
        @metric = "ºC"
        @alert = "temperatura"
        @last_critical = user_device.last_critical_temperature
      when "humidity"
        @metric = "%"
        @alert = "umidade"
        @last_critical = user_device.last_critical_humidity
      when "atm_pressure"
        @metric = "hPa"
        @alert = "pressão atmosférica"
        @last_critical = user_device.last_critical_atm_pressure
      when "luminosity"
        @metric = ""
        @alert = "luminosidade"
        @last_critical = user_device.last_critical_luminosity
    end
    mail(to: @user.email, subject: 'Alerta Meteorológico')
  end

  def normal_weather_email(user_device, weather, alert_type)
    @alert_type = alert_type
    @user_device = user_device
    @user = user_device.user
    @device = user_device.device
    @weather = weather
    @created_at = weather.created_at
    case @alert_type
      when "temperature"
        @metric = "ºC"
        @alert = "temperatura"
        @last_critical = user_device.last_critical_temperature
      when "humidity"
        @metric = "%"
        @alert = "umidade"
        @last_critical = user_device.last_critical_humidity
      when "atm_pressure"
        @metric = "hPa"
        @alert = "pressão atmosférica"
        @last_critical = user_device.last_critical_atm_pressure
      when "luminosity"
        @metric = ""
        @alert = "luminosidade"
        @last_critical = user_device.last_critical_luminosity
    end
    mail(to: @user.email, subject: 'Condições Meteorológicas Normalizadas')
  end

  private
    def set_last_critical_level
      @user_device.update_attributes(last_critical_level: @level.created_at)
    end

    def set_last_critical_weather
      case @alert_type
        when "temperature"
          @user_device.update_attributes(last_critical_temperature: @weather.created_at)
        when "humidity"
          @user_device.update_attributes(last_critical_humidity: @weather.created_at)
        when "atm_pressure"
          @user_device.update_attributes(last_critical_atm_pressure: @weather.created_at)
        when "luminosity"
          @user_device.update_attributes(last_critical_luminosity: @weather.created_at)
      end
    end
end
