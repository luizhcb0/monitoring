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
    level = Level.new(monitoring_params)
    device = level.device
    last = Level.get_current_level(level.device_id)
    if level.save
      if ((level.created_at.to_datetime.to_i)-(last.created_at.to_datetime.to_i) > 900) #15 minutes
        if ((level.created_at.to_datetime.to_i)-(last.created_at.to_datetime.to_i) > (60*60*5)) #5 hours
          Level.create(device_id: level.device_id, created_at: (last.created_at + 50.minute).to_datetime)
        end
        Level.create(device_id: level.device_id, created_at: (DateTime.now - 5.minute).to_datetime)
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
