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
    setting = Array.new
    level = Level.new(monitoring_params)
    device = level.device
    last = Level.get_current_level(level.device_id)
    if level.save
      device.users.each do |user|
        if user.setting.active?
          if level.percentage <= user.setting.alert_level
            if last.percentage > user.setting.alert_level
              if device.last_cl.nil?
                device.update_attributes(last_cl: level.created_at, time_between_cl: Time.at(level.created_at - device.created_at))
              else
                device.update_attributes(last_cl: level.created_at, time_between_cl: Time.at(level.created_at - device.last_cl))
              end
              SendEmailJob.set(wait: 8.seconds).perform_later(level, user)
            end
          end
          if level.percentage > user.setting.alert_level
            if last.percentage <= user.setting.alert_level
              SendEmailJob.set(wait: 8.seconds).perform_later(level, user)
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
