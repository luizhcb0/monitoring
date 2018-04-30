class MonitoringController < ApplicationController
  include StrongParamsHolder

  before_action :authenticate_user!

  def weather_monitoring
    @user = current_user
    @devices = Device.get_sigfox_devices(current_user)
  end

  def level_monitoring
    @user = current_user
    @devices = Device.get_water_level_devices(current_user)
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
    @dimensions = Device.get_all_user_dimensions(current_user)
    respond_to do |format|
      format.html { render json: @dimensions }
      # format.html { redirect_to(root_path)}
      format.json { render json: @dimensions }
    end
  end

  def render_current_level
    @level = Level.get_current_level(params[:device_id])
    @device = Device.find(params[:device_id])
    @user_device = UserDevice.where(device: @device, user: current_user).first
    respond_to do |format|
      format.html { render json: [@level, @device, @user_device, current_user.role] }
      format.json { render json: [@level, @device, @user_device, current_user.role] }
    end
  end

  def render_all_current_levels
    @levels = Array.new
    array = Level.get_all_current_levels(current_user.id)
    # Rails.logger.debug("Array: #{array.inspect}")
    array.each do |level|
      @levels << Level.find_by(created_at: level) if level
    end
    respond_to do |format|
      format.html { render json: @levels }
      format.json { render json: @levels }
    end
  end

  def get_all_current_weather_infos
    devices = Device.get_sigfox_devices(current_user)
    infos = Device.get_all_current_weather_info(devices)
    respond_to do |format|
      format.html { render json: infos }
      format.json { render json: infos }
    end

  end

end
