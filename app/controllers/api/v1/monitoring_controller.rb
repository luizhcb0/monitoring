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
    @level = Level.new(monitoring_params)
    # Arrumar pra salvar só se for diferente do último nível ou tiver passado mais de 1h
    if @level.save
      if @level.percentage < 50
        SendEmailJob.set(wait: 8.seconds).perform_later(@level)
      end
      render json: @level, status: :created
    else
      render json: @level.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/monitoring/1
  def destroy
    @level.destroy
  end

  private
    def require_authorization!
      unless current_user
        render json: {}, status: :forbidden
      end
    end
  
end