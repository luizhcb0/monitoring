class MonitoringController < ApplicationController
  
  def index
    @top_devices = Device.get_top_devices
    @bottom_devices = Device.get_bottom_devices
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
