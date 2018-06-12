class Api::V1::MonitoringController < Api::V1::BaseController
  include StrongParamsHolder

  before_action :set_contact, only: [:show, :update, :destroy]
  before_action :require_authorization!, only: [:show, :update, :destroy]

  # GET /api/v1/monitoring
  def index
    render json: "oi"
  end

  # GET /api/v1/monitoring/1
  def show

  end

  # POST /api/v1/monitoring
  def create
    device_id = monitoring_params[:device_id]
    if device_id.present?
      device = Device.find(device_id)
    else
      serial = monitoring_params[:serial]
      device = Device.find_by(serial: serial)
    end
    if device.model == "sigfox" && monitoring_params[:batt].nil?

      data_temp = monitoring_params[:temp].to_f
      data_umid = monitoring_params[:umid].to_f
      data_lumin = monitoring_params[:lumin].to_f
      data_pressao = monitoring_params[:pressao].to_f

      # Temperature = C
      data_temp = data_temp/100
      # Humidity = %
      data_umid = data_umid/100
      # Atmospheric Pressure = HPA
      data_pressao = data_pressao/10

      temperature = Temperature.new(data: data_temp, device: device)
      humidity = Humidity.new(data: data_umid, device: device)
      atm_pressure = AtmPressure.new(data: data_pressao, device: device)
      luminosity = Luminosity.new(data: data_lumin, device: device)

      last_temperature = Temperature.get_current_temperature(device.id)
      last_humidity = Humidity.get_current_humidity(device.id)
      last_atm_pressure = AtmPressure.get_current_atm_pressure(device.id)
      last_luminosity = Luminosity.get_current_luminosity(device.id)

      if temperature.save && humidity.save && luminosity.save && atm_pressure.save
        render json: [temperature, humidity, luminosity, atm_pressure], status: :created

        device.users.each do |user|
          user_device = UserDevice.where(device: device, user: user).first
          if user.setting.active?
            # Temperature Alert
            if temperature.data <= user.setting.temperature_alert
              if user_device.last_critical_temperature.nil?
                user_device.update_attributes(last_critical_temperature: temperature.created_at)
              end
              if last_temperature.data > user.setting.temperature_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(temperature, user_device, last_temperature, "temperature")
              end
            else
              if last_temperature.data <= user.setting.temperature_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(temperature, user_device, last_temperature, "temperature")
              end
            end
            # Humidity Alert
            if humidity.data <= user.setting.humidity_alert
              if user_device.last_critical_humidity.nil?
                user_device.update_attributes(last_critical_humidity: humidity.created_at)
              end
              if last_humidity.data > user.setting.humidity_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(humidity, user_device, last_humidity, "humidity")
              end
            else
              if last_humidity.data <= user.setting.humidity_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(humidity, user_device, last_humidity, "humidity")
              end
            end
            # Atm Pressure Alert
            if atm_pressure.data <= user.setting.atm_pressure_alert
              if user_device.last_critical_atm_pressure.nil?
                user_device.update_attributes(last_critical_atm_pressure: atm_pressure.created_at)
              end
              if last_atm_pressure.data > user.setting.atm_pressure_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(atm_pressure, user_device, last_atm_pressure, "atm_pressure")
              end
            else
              if last_atm_pressure.data <= user.setting.atm_pressure_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(atm_pressure, user_device, last_atm_pressure, "atm_pressure")
              end
            end
            # Luminosity Alert
            if luminosity.data <= user.setting.luminosity_alert
              if user_device.last_critical_luminosity.nil?
                user_device.update_attributes(last_critical_luminosity: luminosity.created_at)
              end
              if last_luminosity.data > user.setting.luminosity_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(luminosity, user_device, last_luminosity, "luminosity")
              end
            else
              if last_luminosity.data <= user.setting.luminosity_alert
                SendEmailJob.set(wait: 8.seconds).perform_later(luminosity, user_device, last_luminosity, "luminosity")
              end
            end

          end
        end

      else
        render json: [temperature.errors, humidity.errors, luminosity.errors, atm_pressure.errors], status: :unprocessable_entity
      end

    elsif device.model == "water_level"

      data_level = monitoring_params[:level]
      level = Level.new(level: data_level, device: device)
      last = Level.get_current_level(device.id)
      if level.save
        if ((level.created_at.to_datetime.to_i)-(last.created_at.to_datetime.to_i) > 900) #15 minutes
          if ((level.created_at.to_datetime.to_i)-(last.created_at.to_datetime.to_i) > (60*60*5)) #5 hours
            Level.create(device: device, created_at: (last.created_at + 50.minute).to_datetime)
          end
          Level.create(device: device, created_at: (DateTime.now - 5.minute).to_datetime)
        end
        if level.percentage < 0
          level.set_percentage(0)
        elsif level.percentage > 100
          level.set_percentage(100)
        end
        device.users.each do |user|
          user_device = UserDevice.where(device: device, user: user).first
          if user.setting.active?
            if level.percentage <= user.setting.alert_level
              if user_device.last_critical_level.nil?
                user_device.update_attributes(last_critical_level: level.created_at)
              end
              if last.percentage > user.setting.alert_level
                SendEmailJob.set(wait: 8.seconds).perform_later(level, user_device, last)
              end
            else
              if last.percentage <= user.setting.alert_level
                SendEmailJob.set(wait: 8.seconds).perform_later(level, user_device, last)
              end
            end
          end
        end
        render json: level, status: :created
      else
        render json: level.errors, status: :unprocessable_entity
      end

    end

  end

  # DELETE /api/v1/monitoring/1
  def destroy
    level.destroy
  end

  private
    def require_authorization!
      unless current_user
        render json: {}, status: :forbidden
      end
    end

end
