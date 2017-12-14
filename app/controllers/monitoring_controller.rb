class MonitoringController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def index
    @user = current_user
    @devices = Device.get_user_devices(current_user)
  end

  def create
    @level = Level.new(monitoring_params)
    if @level.save
      render json: @level, status: :created
    else
      render json: "error"
    end
  end

  def devices_history
    @user = current_user
    render :devices_history
  end

  def get_all_dimensions
    @dimensions = Array.new
    Device.all.each do |device|
      @dimensions << device.dimension
    end
    render json: @dimensions
  end

  def render_current_level
    id = Level.get_current_level(params[:device_id])
    @level = Level.find(id)
    render json: @level
  end

  def render_all_current_levels
    @levels = Array.new
    array = Level.get_all_current_levels
    # Rails.logger.debug("Array: #{array.inspect}")
    array.each do |level|
      @levels << Level.find_by(id: level) if level
    end
    render json: @levels
  end

end
