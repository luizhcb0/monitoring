class SendEmailJob < ApplicationJob
  queue_as :default

  def perform(level, user_device, last)
    percentage = level.percentage
    user = user_device.user
    if percentage <= user.setting.alert_level
      EmailLog.create(user: user, device: user_device.device, last_level: last, new_level: level, alert_type: 1)
      DefaultMailer.alert_email(user_device, level).deliver_later
    else
      EmailLog.create(user: user, device: user_device.device, last_level: last, new_level: level, alert_type: 0)
      DefaultMailer.normal_email(user_device, level).deliver_later
    end
  end

  def perform(weather, user_device, last_weather, alert_type)
    data = weather.data
    user = user_device.user
    case alert_type
      when "temperature"
        if data <= user.setting.temperature_alert
          EmailLog.create(user: user, device: user_device.device, last_temperature: last_weather, new_temperature: weather, alert_type: 1)
          DefaultMailer.weather_alert_email(user_device, weather, alert_type).deliver_later
        else
          EmailLog.create(user: user, device: user_device.device, last_temperature: last_weather, new_temperature: weather, alert_type: 0)
          DefaultMailer.normal_weather_email(user_device, weather, alert_type).deliver_later
        end
      when "humidity"
        if data <= user.setting.humidity_alert
          EmailLog.create(user: user, device: user_device.device, last_humidity: last_weather, new_humidity: weather, alert_type: 1)
          DefaultMailer.weather_alert_email(user_device, weather, alert_type).deliver_later
        else
          EmailLog.create(user: user, device: user_device.device, last_humidity: last_weather, new_humidity: weather, alert_type: 0)
          DefaultMailer.normal_weather_email(user_device, weather, alert_type).deliver_later
        end
      when "atm_pressure"
        if data <= user.setting.atm_pressure_alert
          EmailLog.create(user: user, device: user_device.device, last_atm_pressure: last_weather, new_atm_pressure: weather, alert_type: 1)
          DefaultMailer.weather_alert_email(user_device, weather, alert_type).deliver_later
        else
          EmailLog.create(user: user, device: user_device.device, last_atm_pressure: last_weather, new_atm_pressure: weather, alert_type: 0)
          DefaultMailer.normal_weather_email(user_device, weather, alert_type).deliver_later
        end
      when "luminosity"
        if data <= user.setting.luminosity_alert
          EmailLog.create(user: user, device: user_device.device, last_luminosity: last_weather, new_luminosity: weather, alert_type: 1)
          DefaultMailer.weather_alert_email(user_device, weather, alert_type).deliver_later
        else
          EmailLog.create(user: user, device: user_device.device, last_luminosity: last_weather, new_luminosity: weather, alert_type: 0)
          DefaultMailer.normal_weather_email(user_device, weather, alert_type).deliver_later
        end
    end

  end
end
